let apiUrl = '/api/conf'


let getKeysPasarelas = async () => {

    await api_conection("POST", `${apiUrl}/getKeysPasarelas/`, {}, function (data) {

        let dataConf = data.searchConf

        if (data.production_ready_mp) {
            $('#production_ready_mp').prop('checked', true).css('color', 'green');
        }

        if (data.production_ready_stripe) {
            $('#production_ready_stripe').prop('checked', true).css('color', 'green');
        }


        for (let item of dataConf) {


            // -------------------------- CONF MERCADO PAGO VALUES-----------------------//


            if (item.description == 'webhook_secret_mp') {
                $('#webhook_secret_mp').val(item.value)
            }
            if (item.description == 'private_Key_mp') {
                $('#private_Key_mp').val(item.value)
            }
            if (item.description == 'public_Key_mp') {
                $('#public_Key_mp').val(item.value)
            }
            if (item.description == 'webhook_secret_mp_sandbox') {
                $('#webhook_secret_mp_sandbox').val(item.value)
            }

            if (item.description == 'private_Key_mp_sandbox') {
                $('#private_Key_mp_sandbox').val(item.value)
            }
            if (item.description == 'public_Key_mp_sandbox') {
                $('#public_Key_mp_sandbox').val(item.value)
            }


            // -------------------------- CONF STRIPE VALUES-----------------------//
            if (item.description == 'private_Key_stripe_sandbox') {
                $('#private_Key_stripe_sandbox').val(item.value)
            }
            if (item.description == 'public_key_stripe_sandbox') {
                $('#public_key_stripe_sandbox').val(item.value)
            }
            if (item.description == 'private_Key_stripe') {
                $('#private_Key_stripe').val(item.value)
            }
            if (item.description == 'public_key_stripe') {
                $('#public_key_stripe').val(item.value)
            }
            if (item.description == 'webhook_secret_stripe_sandbox') {
                $('#webhook_secret_stripe_sandbox').val(item.value)
            }
            if (item.description == 'webhook_secret_stripe') {
                $('#webhook_secret_stripe').val(item.value)
            }


        }
    })

}

let updateOrCreateKey = async (body) => {
    HoldOn.open();
    await api_conection("POST", `${apiUrl}/updateOrCreateKey/`, body, async function (data) {

        HoldOn.close();
        await Swal.close();

        if (data.success) {
            await Swal.fire({
                title: data.message,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: "#3ba805",
            });
        } else {
            // Mostrar notificación de error si la respuesta es un error
            await Swal.fire({
                title: data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: "#d33",
            });
        }


    }).fail(async (error) => {

        await Swal.fire({
            title: 'Error!',
            text: 'There was an error processing your request. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: "#d33",
        });

        HoldOn.close();
    });
}


$(async () => {

    await getKeysPasarelas();


    $('.updateConf').change(async function () {

        let body = {
            value: $(this).val(),
            description: $(this).attr('key')
        };

        await updateOrCreateKey(body);
    });
});
