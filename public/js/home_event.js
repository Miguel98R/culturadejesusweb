$(document).ready(function () {

    let api_base = 'api/usersEvent'

    $('#registrer').click(function () {
        let body = {}

        body.nombre = $('#name').val()
        body.apellido = $('#apellido').val()
        body.edad = $('#edad').val()
        body.phone = $('#phone').val()
        body.congregacion = $('input:radio[name=question1]:checked').val()


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

        api_conection('POST', api_base + '/newUser', body, function () {

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
})