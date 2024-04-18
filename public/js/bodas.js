
const clear = async () => {
    // Limpiar campos de texto
    $('#nombreNovioEsposo').val('');
    $('#apellidosNovioEsposo').val('');
    $('#edadNovioEsposo').val('');
    $('#nombreNoviaEsposa').val('');
    $('#apellidosNoviaEsposa').val('');
    $('#edadNoviaEsposa').val('');
    $('#cantidadHijos').val('');
    $('#celularNoviaEsposa').val('');
    $('#celularNovioEsposo').val('');

    // Limpiar campo select
    $('#tieneHijos').prop('selectedIndex', 0); // Pone el select en la primera opción
};

const validarCelular = (celular) => {
    const regex = /^[0-9]{10}$/; // Expresión regular para validar 10 dígitos numéricos
    return regex.test(celular);
};

$(async function () {
    // Limpiar campos al iniciar
    clear();

    $('#bodasBtn').click(function () {
        clear();
        $('#saveRegistro').attr('data-tipo', 'boda'); // Asignar tipo 'boda' al botón de guardar
        $('#registroBodasModal').modal('show');
    });

    $('#renovacionBtn').click(function () {
        clear();
        $('#saveRegistro').attr('data-tipo', 'renovación'); // Asignar tipo 'renovación' al botón de guardar
        $('#registroBodasModal').modal('show');
    });

    $('#invitadosBtn').click(function () {
        $('#invitadosModal').modal('show');
    });

    $('#saveRegistro').click(async function () {
        const novioEsposo = {
            nombre: $('#nombreNovioEsposo').val(),
            apellidos: $('#apellidosNovioEsposo').val(),
            edad: $('#edadNovioEsposo').val(),
            celular: $('#celularNovioEsposo').val()
        };

        const noviaEsposa = {
            nombre: $('#nombreNoviaEsposa').val(),
            apellidos: $('#apellidosNoviaEsposa').val(),
            edad: $('#edadNoviaEsposa').val(),
            celular: $('#celularNoviaEsposa').val()
        };

        // Validar números de celular
        if (!validarCelular(novioEsposo.celular) || !validarCelular(noviaEsposa.celular)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingresa un número de celular válido con 10 dígitos.'
            });
            return; // Detener la función si el número no es válido
        }

        const tienenHijos = $('#tieneHijos').val();
        const cantidadHijos = $('#cantidadHijos').val();

        const tipo = $(this).attr('data-tipo'); // Obtener tipo de evento desde el botón clickeado

        const data = {
            tipo, // Agregar el tipo de evento al objeto de datos
            novioEsposo,
            noviaEsposa,
            tienenHijos,
            cantidadHijos
        };

        try {
            const response = await $.ajax({
                url: '/api/matrimonios/createMatrimonio',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: response.message
            });
            clear(); // Limpia los campos después de enviar los datos
            $('#registroBodasModal').modal('hide'); // Cierra la modal
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.responseJSON.error
            });
        }
    });

    $('#saveInvitados').click(async function () {
        const tipo = $(this).attr('data-tipo'); // Obtener tipo de evento desde el botón clickeado

        const invitados = [
            $('#nombre1').val(),
            $('#nombre2').val(),
            $('#nombre3').val(),
            $('#nombre4').val(),
            $('#nombre5').val()
        ].filter(nombre => nombre.trim() !== ''); // Filtrar nombres vacíos

        // Validar que al menos se haya registrado un invitado
        if (invitados.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, registra al menos un invitado.'
            });
            return; // Detener la función si no hay invitados registrados
        }

        const data = {
            tipo, // Agregar el tipo de evento al objeto de datos
            invitados
        };

        try {
            const response = await $.ajax({
                url: '/api/invitados/createInvitado',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: response.message
            });
            clear(); // Limpia los campos después de enviar los datos
            $('#invitadosModal').modal('hide'); // Cierra la modal
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.responseJSON.error
            });
        }
    });


    // Configurar los inputs de celular para aceptar solo números y tener una longitud máxima de 10
    $('#celularNovioEsposo, #celularNoviaEsposa').on('input', function () {
        const maxLength = 10;
        const value = $(this).val();

        // Eliminar caracteres no numéricos
        const newValue = value.replace(/\D/g, '').substring(0, maxLength);

        // Actualizar el valor del input
        $(this).val(newValue);
    });

});
