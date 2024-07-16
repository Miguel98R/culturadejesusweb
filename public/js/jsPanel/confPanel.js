const apiUrl = "/api/conf"

const getConfigurations = async () => {
    HoldOn.open(HoldOptions)
    api_conection("GET", `${apiUrl}/getMany/`, {}, function (data) {
        HoldOn.close()
        let confData = data.data

        confData.forEach((item) => {
            $(`#${item.description}`).val(item.value);
        });

    })
}

const createOrupdateConf = async (body) => {
    HoldOn.open(HoldOptions)
    api_conection("PUT", `${apiUrl}/createOrUpdateConf/`, body, function (data) {
        HoldOn.close()
        notyf.success("Configuración actualizada")

    })
}

$(async function () {
    await getConfigurations()

    $('.update_conf').change(async function () {
        let value_conf = $(this).attr('value_conf')
        let value = $(this).val()

        let body = {
            description: value_conf,
            value,
        }

        await createOrupdateConf(body)
    })
})