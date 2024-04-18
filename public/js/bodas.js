
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
$(async function () {
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

            alert(response.message); // Muestra mensaje de éxito
            clear(); // Limpia los campos después de enviar los datos
            $('#registroBodasModal').modal('hide'); // Cierra la modal
        } catch (error) {
            alert(error.responseJSON.error); // Muestra mensaje de error
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

            alert(response.message); // Muestra mensaje de éxito
            clear(); // Limpia los campos después de enviar los datos
            $('#invitadosModal').modal('hide'); // Cierra la modal
        } catch (error) {
            alert(error.responseJSON.error); // Muestra mensaje de error
        }
    });

})