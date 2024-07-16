const apiUrl = "/api/invitations"

const columns = [

    {
        data: 'nombre',
        render: function (data, type, row) {
            let html = `<div class="text-center"><h6>${data}</h6>
                    <div>
                         <p class="m-0 p-0">Ministerio:</p>
                        <p class="m-0 p-0">${row.ministerio}</p>
                        
                        <p class="m-0 p-0">Responsabilidad:</p>
                        <p class="m-0 p-0">${row.responsabilidad}</p>
                       
                    </div>
                </div>`

            return html
        }

    },
    {
        data: 'email',
        render: function (data, type, row) {
            let html = `<div class=""><h6>${data}</h6><h6>${row.celular}</h6>
                  
                </div>`

            return html
        }

    },
    {
        data: 'lugar_evento',

    },
    {
        data: 'fechaEvento',
        render: function (data, type, row) {

            let fechaFormateada = moment(data).format('dddd D [de] MMMM YYYY');

            let html = `<div class=""><h6>${fechaFormateada}</h6></div>`;

            return html;
        }

    },
    {
        data: 'numeroPersonas',

    },

    {
        data: 'descripcionEvento',


    },
    {
        data: '_id',
        render: function (data, type, row) {
            if (type === 'display') {
                // Botones de editar y eliminar con atributo data-id
                return `<button class="delete-button btn btn-danger" data-id="${data}">Eliminar invitación</button>`;
            }
            return data;
        }
    }


]

const dt = $("#tbl_invitations").DataTable({
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

const deleteInvitacion = (id) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiUrl}/findIdAndDelete/${id}`, {}, function () {
        HoldOn.close()
        notyf.success("Invitación eliminada")
        drawDataTable(dt)
    })
}
const drawDataTable = (data_table) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", apiUrl + "/datatable_aggregate", {}, function (data) {
        HoldOn.close()
        let data_query = data.data;

        data_table.clear();
        data_table.rows.add(data_query).draw();
    });
}


$(async function () {


    $(document.body).on("click", ".delete-button", function () {
        let id = $(this).attr("data-id");

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar esta invitación.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // Usuario confirmó la eliminación, ejecutar deleteProduct
                    deleteInvitacion(id);

                }
            });
    });


    drawDataTable(dt)

})