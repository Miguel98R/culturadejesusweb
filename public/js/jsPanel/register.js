const apiUrl = "/api/users"

const createAdmin = (body) => {
    api_conection("POST", `${apiUrl}/createAdmin`, body, function () {
        location.href = "/cjPanel"
    })
}
$(async function () {
    $("#createAdmin").click(async function () {
        const fields = ["#name", "#user_name", "#email", "#password"];

        if (fields.some(field => !$(field).val())) {
            notyf.open({type: "warning", message: "Llena todos los campos para continuar"});

        }

        const body = {
            name: $("#name").val(),
            user_name: $("#user_name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
        };

        await createAdmin(body);
    });
});
