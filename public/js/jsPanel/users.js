const apiUrl = "/api/users"
const columns = [

    {
        data: 'name',

    },
    {
        data: 'user_name',

    }, {
        data: 'email',

    },
    {
        data: 'active',
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
        data: 'usersTypes',


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
const dt = $("#tblUsers").DataTable({
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
const createNewUsers = (body) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", `${apiUrl}/createUsers`, body, function () {
        HoldOn.close()
        drawDataTable(dt)
        $("#newUserModal").modal("hide")
    }, function (response) {
        notyf.error(response.message)
        HoldOn.close()
    })
}
const deleteUser = (id_user) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiUrl}/findIdAndDelete/${id_user}`, {}, function () {
        HoldOn.close()
        notyf.success("Usuario eliminado")
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

const editUser = (id) => {

    let body = {
        name: $('#name_edit').val(),
        user_name: $('#user_name_edit').val(),
        email: $('#email_edit').val(),
        password: $('#password_edit').val(),
        usersTypes: $('#type_users_edit').val(),
        active: $('#active_edit').prop('checked'),

    }

    $("#editUserModal").modal("hide")
    HoldOn.open(HoldOptions)
    api_conection("PUT", `${apiUrl}/updateById/${id}`, {body}, function () {
        HoldOn.close()
        notyf.success("Usuario actualizado")
        drawDataTable(dt)
    })
}

const getDataUser = (id_user) => {
    HoldOn.open(HoldOptions)
    api_conection("GET", `${apiUrl}/getOneById/${id_user}`, {}, function (data) {
        HoldOn.close()
        let userData = data.data
        console.log("userData", userData)

        $('#name_edit').val(userData.name);
        $('#user_name_edit').val(userData.user_name);
        $('#email_edit').val(userData.email);
        $('#password_edit').val('');

        $('#type_users_edit').val(userData.usersTypes);
        $('#active_edit').prop('checked', userData.active);


    })
}


$(async function () {


    $(".new_user").click(async function () {
        $("#newUserModal").modal("show")
    })

    $("#saveUser").click(async function () {
        const fields = ["#name", "#user_name", "#email", "#password"];

        if (fields.some(field => !$(field).val())) {
            notyf.open({type: "warning", message: "Llena todos los campos para continuar"});
            return;
        }

        const userType = $("#type_users").val();

        const body = {
            name: $("#name").val(),
            user_name: $("#user_name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            type: userType,
            active: $('#active').prop('checked'),
        };

        await createNewUsers(body);
    });


    $("#editUser").click(async function () {
        let id_user = $(this).attr("id_user");
        editUser(id_user)

    })

    $(document.body).on("click", ".delete-button", function () {
        let id_user = $(this).attr("data-id");

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este usuario.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // Usuario confirmó la eliminación, ejecutar deleteUser
                    deleteUser(id_user);

                }
            });
    });


    $(document.body).on("click", ".edit-button", function () {
        let id_user = $(this).attr("data-id");
        $("#editUserModal").modal("show")
        $("#editUser").attr("id_user", id_user)
        getDataUser(id_user)
    });

    drawDataTable(dt)

})