let apiUrl = "/api/agendas"
let apiDatesAgenda = "/api/datesAgenda"

const drawMonths = async (id_month) => {

    let template = $("#template_month_").clone();

    template.attr('id', 'template_month_' + id_month).css('display', 'block');
    template.find('#name_month_').attr('id', 'name_month_' + id_month)
    template.find('#active_month_').attr('id', 'active_month_' + id_month)
    template.find('#events_').attr('id', 'events_' + id_month)
    template.find('#add_events_').attr('id', 'add_events_' + id_month).addClass('add_event_')

    return template
}

const drawEvents = async (id_event) => {

    let template = $("#template_event_").clone();

    template.attr('id', 'template_event_' + id_event).css('display', 'block');
    template.find('#date_event_').attr('id', 'date_event_' + id_event)
    template.find('#location_event_').attr('id', 'location_event_' + id_event)
    template.find('#delete_event_').attr('id', 'delete_event_' + id_event)


    return template
}

const deleteDate = (id_event) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiDatesAgenda}/findIdAndDelete/${id_event}`, {}, async function () {
        HoldOn.close()
        notyf.success("Fecha eliminada")
        await getMonths()
    })
}

const getMonths = async () => {
    HoldOn.open(HoldOptions)
    $("#months").html('')
    await api_conection("GET", `${apiUrl}/getMany`, {}, async function (data) {

        let months = data.data

        for (let item of months) {
            let div_month = await drawMonths(item._id)
            div_month.find('#name_month_' + item._id).text(item.mes)
            div_month.find('#active_month_' + item._id).prop("checked", item.active).attr("id_month", item._id).attr("name_month", item.mes)
            div_month.find('#add_events_' + item._id).attr("id_month", item._id).attr("name_month", item.mes)


            let events = item.events;

            events.sort((a, b) => new Date(a.date) - new Date(b.date));

            $("#months").append(div_month)

            if (events.length > 0) {
                for (let jtem of events) {
                    let div_event = await drawEvents(jtem._id);
                    div_event.find('#date_event_' + jtem._id).text(moment(jtem.date).format("DD/MM/YYYY"));
                    div_event.find('#location_event_' + jtem._id).text(jtem.location)
                    div_event.find('#delete_event_' + jtem._id).attr("id_event", jtem._id)

                    div_month.find('#events_' + item._id).append(div_event)
                }

            } else {
                div_month.find('#events_' + item._id).append(`<h6 class="text-center my-2 text-danger fw-lighter">No hay fechas establecidas para este mes</h6>`)
            }
        }
        HoldOn.close()
    })
}

const saveDate = async (body) => {
    HoldOn.open(HoldOptions)
    await api_conection("POST", `${apiDatesAgenda}/createOne`, {body}, async function () {
        HoldOn.close()
        notyf.success("Fecha agregada")
        await getMonths()
    })
}

const valueMonth = (name_month) => {

    let fechaActual = new Date();
    let anoActual = fechaActual.getFullYear();
    let fechaInput = $("#date")

    console.log("fechaActual", fechaActual)
    console.log("anoActual", anoActual)

    switch (name_month.toLowerCase()) {
        case 'enero':
            fechaInput.val(`${anoActual}-01-01`);
            break;
        case 'febrero':
            fechaInput.val(`${anoActual}-02-01`);
            break;
        case 'marzo':
            fechaInput.val(`${anoActual}-03-01`);
            break;
        case 'abril':
            fechaInput.val(`${anoActual}-04-01`);
            break;
        case 'mayo':
            fechaInput.val(`${anoActual}-05-01`);
            break;
        case 'junio':
            fechaInput.val(`${anoActual}-06-01`);
            break;
        case 'julio':
            fechaInput.val(`${anoActual}-07-01`);
            break;
        case 'agosto':
            fechaInput.val(`${anoActual}-08-01`);
            break;
        case 'septiembre':
            fechaInput.val(`${anoActual}-09-01`);
            break;
        case 'octubre':
            fechaInput.val(`${anoActual}-10-01`);
            break;
        case 'noviembre':
            fechaInput.val(`${anoActual}-11-01`);
            break;
        case 'diciembre':
            fechaInput.val(`${anoActual}-12-01`);
            break;
        default:
            console.error('Mes no reconocido');
            break;
    }


}

const activeMonths = (body, id) => {
    api_conection("PUT", `${apiUrl}/updateById/${id}`, body, function () {
        HoldOn.close()
        notyf.success("Mes actualizado")
    })
}

$(async function () {
    await getMonths()


    $("#saveDate").click(async function () {
        let id_month = $(this).attr("id_month")
        let body = {
            location: $("#location").val(),
            date: moment($("#date").val()).format(),
            id_month,
        }
        await saveDate(body)
    })

    $(document.body).on("click", ".add_event_", async function () {

        let id_month = $(this).attr("id_month")
        let name_month = $(this).attr("name_month")
        await valueMonth(name_month)

        $("#addEventModal").modal("show")
        $("#month_modal_name").text(name_month)
        $("#saveDate").attr("id_month", id_month)


    })
    $(document.body).on("click", ".delete_event", async function () {

        let id_event = $(this).attr("id_event")
        await deleteDate(id_event)
    })

    $(document.body).on("change", ".active_month", async function () {

        let id = $(this).attr("id_month")

        let body = {
            mes: $(this).attr("name_month"),
            active: $(this).prop("checked")
        }

        await activeMonths(body, id)
    })

})