$(function () {


    if (message_error != '') {
        notyf.error(message_error)
    }

    $('#loginBtn').click(function (e) {
        e.preventDefault()

        let body = {}
        body.user_name = $('#user_name').val()
        body.password = $('#password').val()

        for (let key in body) {
            if (!body[key]) {
                console.log(key)
                notyf.error('Complete los campos para continuar',)
                return;
            }
        }

        $('#loginForm').submit()
    })
})