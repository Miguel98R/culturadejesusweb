//verificadorAdmin()
$(document).ready(function () {

    let base_api = '/api/usersEvent'

    let columns = [
        {
            data: 'nombre'
        },
        {
            data: 'apellido',
            render: function (data, v, row) {
                return '<p class="">' + data + '</p>'
            }
        },
        {
            data: 'edad',
            render: function (data, v, row) {
                return '<p class="text-black fw-bold">' + data + '</p>'
            }
        },
        {
            data: 'phone',
            render: function (data, v, row) {
                return '<p>' + data + '</p>'
            }
        },
        {
            data: 'email',
            render: function (data, v, row) {
                return '<p>' + data + '</p>'
            }
        },

        {
            data: 'congregacion',
            render: function (data, v, row) {
                let message = 'NO'
                if(data){
                    message = 'SI'
                }
                return '<p>' + message + '</p>'
            }
        },



        {
            data: '_id',
            render: function (data, v, row) {
                let buttonStatus = ""
                if (row.status) {
                    buttonStatus = '<button typeChange=false title="Deshabilitar" id_user="' + row._id + '" emailAlumno="' + data + '"  class="btn btn-block btn-danger changeStatus"><i class="fas fa-trash-alt"></i></button>'

                } else {
                    buttonStatus = '<button typeChange=true  title="Activar"  id_user="' + row._id + '" emailAlumno="' + data + '"  class="btn btn-block btn-success changeStatus"><i class="fa-solid fa-user-check"></i></button>'

                }
                return '<button title="Editar" emailAlumno="' + data + '" id="editAlumno" class="btn btn-block btn-warning"><i class="fas fa-edit"></i></button>' +
                    buttonStatus
            }
        },


    ]

    let dt = $("#tblUsersEvent").DataTable({
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            sSearch: "Buscar:",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            sProcessing: "Procesando...",
        },
        initComplete: function () {
            $(this.api().table().container())
                .find("input")
                .parent()
                .wrap("<form>")
                .parent()
                .attr("autocomplete", "off");
        },
        data: [],
        lengthMenu: [
            [5, 10, 25, 50, 100, 1000],
            ["5", "10", "25", "50", "100", "1000"],
        ],
        order: [[0, "desc"]],
        pageLength: 5,
        columns: columns,

        paging: true,
        fixedHeader: true,
    });

    let dt_draw = function () {
        api_conection("POST", base_api + "/getUsersEvent", {}, function (data) {
            let dataUsers = data.data;

            dt.clear();
            dt.rows.add(dataUsers).draw();
        });
    };

    dt_draw();




})