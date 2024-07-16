const apiUrl = "/api/congresos"

const columns = [

    {
        data: 'name',
        render: function (data, type, row) {
            let html = `<div class="text-center"><h6>${data}</h6></div>`

            return html
        }

    },
    {
        data: 'date_initial',
        render: function (data, type, row) {

            console.log("row",row)

            let date_initial = moment(data).format('dddd, MMMM Do YYYY');
            let date_finish = moment(row.date_finish).format('dddd, MMMM Do YYYY');

            let html = `
                    <div>
                        <h6 class="fw-bolder">Fecha inicial: <span class="fw-normal">${date_initial}</span></h6>
                        <h6 class="fw-bolder">Fecha Final: <span class="fw-normal">${date_finish}</span></h6>
                        <h6 class="fw-bolder">Hora inicial: <span class="fw-normal">${row.hour_initial}</span></h6>
                    </div>`


            return html

        }
    },
    {
        data: 'location',

    },
    {
        data: 'link_boletos',

    },
    {
        data: 'image',
        render: function (data, type, row) {
            let html = `
                    <div>
                        <img class="img-fluid" style="max-height: 350px;border-radius: 9px;"  src="${row.image}">
                    </div>`


            return html
        }

    },

    {
        data: 'activo',
        render: function (data, type, row) {
            let status = ''
            if (type === 'display') {

                if (data) {
                    status = `<p class="fw-bold text-success">Activo</p>`
                } else {
                    status = `<p class="fw-bold text-danger">Desactivado</p>`
                }

            }
            return status;
        }

    },
    {
        data: '_id',
        render: function (data, type, row) {
            if (type === 'display') {
                // Botones de editar y eliminar con atributo data-id
                return `<button class="edit-button btn btn-warning" data-id="${data}">Editar</button>
                    <button class="delete-button btn btn-danger" data-id="${data}">Eliminar</button>`;
            }
            return data;
        }
    }


]

const dt = $("#tbl_congresos").DataTable({
    responsive: true,
    language: language,
    data: [],
    lengthMenu: [
        [5, 10, 15, 25, 50, 100, 1000],
        ["5 rows", "10 rows", "15 rows", "25 rows", "50 rows", "100 rows", "1000 rows"],
    ],
    order: [
        [0, "asc"],
    ],
    pageLength: 10,
    columns: columns,
    paging: true,

    searching: true,
    fixedHeader: true,
    bAutoWidth: false,

    initComplete: function () {
        $(this.api().table().container())
            .find("input")
            .parent()
            .wrap("<form>")
            .parent()
            .attr("autocomplete", "off");
    },

});

const createNewCongresos = (body) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", `${apiUrl}/createOne`, body, function () {
        HoldOn.close()
        drawDataTable(dt)
        $("#newCongresoModal").modal("hide")
    }, function (response) {
        notyf.error(response.message)
        HoldOn.close()
    })
}

const deleteCongreso = (id_congreso) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiUrl}/findIdAndDelete/${id_congreso}`, {}, function () {
        HoldOn.close()
        notyf.success("Congreso eliminado")
        drawDataTable(dt)
    })
}

const drawDataTable = (data_table) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", `${apiUrl}/datatable_aggregate`, {}, function (data) {
        HoldOn.close()
        let data_query = data.data;

        data_table.clear();
        data_table.rows.add(data_query).draw();
    });
}

const editCongreso = (id) => {

    const body = {
        name: $("#name_Congreso_edit").val(),
        location: $("#location_edit").val(),
        image: $("#image_save_edit").val(),
        date_initial: moment($("#date_initial_edit").val()).format(),
        date_finish: moment($("#date_finish_edit").val()).format(),
        hour_initial: $("#hour_initial_edit").val(),
        link_boletos: $("#link_boletos_edit").val(),
        active: $('#active_edit').prop('checked'),
    };


    api_conection("PUT", `${apiUrl}/updateById/${id}`, body, function () {
        HoldOn.close()
        $("#editCongresoModal").modal("hide")
        notyf.success("Congreso actualizado")
        drawDataTable(dt)
    })
}

const getDataCongreso = (id_congreso) => {
    HoldOn.open(HoldOptions)
    api_conection("GET", `${apiUrl}/getOneById/${id_congreso}`, {}, function (data) {
        HoldOn.close()
        let CongresoData = data.data

        console.log("CongresoData", CongresoData)

        $('#name_Congreso_edit').val(CongresoData.name);
        $('#location_edit').val(CongresoData.location);

        let formattedDateInitial = moment(CongresoData.date_initial).format('YYYY-MM-DD');
        let formattedDateFinish = moment(CongresoData.date_finish).format('YYYY-MM-DD');

        $('#date_initial_edit').val(formattedDateInitial);
        $('#date_finish_edit').val(formattedDateFinish);

        $("#hour_initial_edit").val(CongresoData.hour_initial);

        $('#link_boletos_edit').val(CongresoData.link_boletos);
        $('#image_save_edit').val(CongresoData.image);
        $('#active_edit').prop('checked', CongresoData.activo);


    })
}


$(async function () {


    $(".new_congreso").click(async function () {
        $("#newCongresoModal").modal("show")
    })

    $("#saveCongreso").click(async function () {
        const fields = ["#name_Congreso", "#location", "#image_save", "#date_initial", "#date_finish", "#link_boletos", "#active"];

        if (fields.some(field => !$(field).val())) {
            notyf.open({ type: "warning", message: "Llena todos los campos para continuar" });
            return;
        }


        const body = {
            name: $("#name_Congreso").val(),
            date_initial: moment($("#date_initial").val()).format(),
            date_finish: moment($("#date_finish").val()).format(),
            hour_initial: $("#hour_initial").val(),
            location: $("#location").val(),
            link_boletos: $("#link_boletos").val(),
            image: $("#image_save").val(),
            activo: $('#active').prop('checked'),
        };

        await createNewCongresos(body);
    });


    $("#editCongreso").click(async function () {
        let id_congreso = $(this).attr("id_congreso");
        editCongreso(id_congreso)

    })
    $(document.body).on("click", ".delete-button", function () {
        let id_congreso = $(this).attr("data-id");

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este congreso.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                // Usuario confirmó la eliminación, ejecutar deleteCongreso
                deleteCongreso(id_congreso);

            }
        });
    });


    $(document.body).on("click", ".edit-button", function () {
        let id_congreso = $(this).attr("data-id");
        $("#editCongresoModal").modal("show")
        $("#editCongreso").attr("id_congreso", id_congreso)
        getDataCongreso(id_congreso)
    });


    $('.image').change(function () {
        const fileInput = $(this)[0];
        const formData = new FormData();
        const isEdit = $(this).attr("isEdit")

        formData.append('image', fileInput.files[0]);

        $.ajax({
            type: 'POST',
            url: '/api/upload/single_image',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                if (data.success) {

                    const imagePath = data.imagePath;

                    if (isEdit == "false") {
                        $('#image_save').val(`/${imagePath}`);
                    } else {
                        $('#image_save_edit').val(`/${imagePath}`);
                    }

                } else {
                    console.error('Error al subir la imagen:', data.message);
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    });


    drawDataTable(dt)

})