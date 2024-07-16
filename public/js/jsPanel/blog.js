const apiUrl = "/api/blogs"
const columns = [

    {
        data: 'title',

    },
    {
        data: 'subtitle',

    },
    {
        data: 'isPublicate',
        render: function (data, type, row) {
            let status = ''
            if (type === 'display') {

                if (data) {
                    status = `<p class="fw-bold text-success">Publicado</p>`
                } else {
                    status = `<p class="fw-bold text-danger">No esta publciado</p>`
                }

            }
            return status;
        }

    },
    {
        data: 'publicationDate',
        render: function (data, type, row) {
            let date = '';

            if (type === 'display') {
                if (data) {

                    let formattedDate = moment(data).format('D [de] MMMM YYYY');

                    date = `<p class="fw-bold text-success">${formattedDate}</p>`;
                } else {
                    date = `<p class="fw-bold text-danger">Sin publicar</p>`;
                }
            }

            return date;
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
const dt = $("#tblBlogs").DataTable({
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
const createNewBlogs = (body) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", `${apiUrl}/createOne`, body, function () {
        HoldOn.close()
        drawDataTable(dt)
        $("#newBlogModal").modal("hide")
    }, function (response) {
        notyf.error(response.message)
        HoldOn.close()
    })
}
const deleteblog = (id_blog) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiUrl}/findIdAndDelete/${id_blog}`, {}, function () {
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

const editblog = (id) => {

    let body = {
        title: $('#title_edit').val(),
        subtitle: $('#subtitle_edit').val(),
        content: $('#content_edit').summernote('code'),
        image: $('#image_save_edit').val(),
        publicationDate: moment($('#date_edit').val()).format(),
        isPublicate: $('#isPublicate_edit').prop('checked')


    }

    $("#editBlogModal").modal("hide")
    HoldOn.open(HoldOptions)
    api_conection("PUT", `${apiUrl}/updateById/${id}`, body, function () {
        HoldOn.close()
        notyf.success("Blog actualizado")
        drawDataTable(dt)
    })
}

const getDatablog = (id_blog) => {
    HoldOn.open(HoldOptions)
    api_conection("GET", `${apiUrl}/getOneById/${id_blog}`, {}, function (data) {
        HoldOn.close()
        let blogData = data.data
        console.log("blogData", blogData)

        $('#title_edit').val(blogData.title);
        $('#subtitle_edit').val(blogData.subtitle);
        $('#date_edit').val(moment(blogData.publicationDate).format('YYYY-MM-DD'));
        $('#image_save_edit').val(blogData.image);
        $('#content_edit').summernote('code', blogData.content);
        $('#isPublicate_edit').prop('checked', blogData.isPublicate);
        $('#img_preview').attr("src", blogData.image);


    })
}


$(async function () {

    $('#content_edit').summernote({
        height: 600, // Altura del editor
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });

    $('#content').summernote({
        height: 600, // Altura del editor
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });


    $(".new_blog").click(async function () {
        $("#newBlogModal").modal("show")
    })

    $("#saveBlog").click(async function () {
        const fields = ["#title", "#subtitle", "#date", "#image_save"];

        if (fields.some(field => !$(field).val())) {
            notyf.open({ type: "warning", message: "Llena todos los campos para continuar" });
            return;
        }

        // Verifica si el contenido del editor Summernote está vacío
        const summernoteContent = $('#content').summernote('code');
        if (!summernoteContent.trim()) {
            notyf.open({ type: "warning", message: "El contenido del blog no puede estar vacío" });
            return;
        }

        let body = {
            title: $("#title").val(),
            subtitle: $("#subtitle").val(),
            content: summernoteContent,
            image: $("#image_save").val(),
            publicationDate: moment($("#date").val()).format(),
            isPublicate: $('#isPublicate').prop('checked')
        };

        await createNewBlogs(body);
    });



    $("#editBlog").click(async function () {
        let id_blog = $(this).attr("id_blog");
        console.log("id_blog,,", id_blog)
        editblog(id_blog)

    })

    $(document.body).on("click", ".delete-button", function () {
        let id_blog = $(this).attr("data-id");

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
                    // Usuario confirmó la eliminación, ejecutar deleteblog
                    deleteblog(id_blog);

                }
            });
    });


    $(document.body).on("click", ".edit-button", function () {
        let id_blog = $(this).attr("data-id");
        $("#editBlogModal").modal("show")
        $("#editBlog").attr("id_blog", id_blog)
        getDatablog(id_blog)
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