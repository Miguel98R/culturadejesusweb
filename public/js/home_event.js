$(document).ready(function () {

    let api_base = 'api/usersEvent'

    $('#registrer').click(function () {
        let body = {}

        body.nombre = $('#name').val()
        body.apellido = $('#apellido').val()
        body.edad = $('#edad').val()
        body.phone = $('#phone').val()
        body.congregacion = $('input:radio[name=question1]:checked').val()
        body.email = $('#email').val()


        for (let key in body) {
            if (!body[key]) {
                console.log(key)
                notyf.error('Complete los campos para continuar',)
                return;
            }
        }

        let isCel = validarTelefono(body.phone)
        if (!isCel) {
            notyf.error('Ingresa un numero de celular correcto')
            return;
        }

        let isEmail = validarCorreoElectronico(body.email)
        if (!isEmail) {
            notyf.error('Ingresa un email correcto')
            return;
        }

        api_conection('POST', api_base + '/newUser', body, function () {

            location.href = "/completeRegister"
        }, function (response) {
            notyf.error(response.message)

        })


    })

    function validarTelefono(numero) {
        // Expresión regular para validar un número telefónico de 10 dígitos
        const patron = /^\d{10}$/;

        // Comprobamos si el número coincide con el patrón
        if (patron.test(numero)) {
            return true; // El número es válido
        } else {
            return false; // El número no es válido
        }
    }

    function validarCorreoElectronico(correo) {
        // Expresión regular para validar el formato del correo electrónico
        var patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Comprobar si el correo coincide con el patrón
        if (patronCorreo.test(correo)) {
            return true; // El correo es válido
        } else {
            return false; // El correo no es válido
        }
    }


})