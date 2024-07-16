const apiUrl = "/api/products"

const columns = [

    {
        data: 'name',
        render: function (data, type, row) {
            let html = `<div class="text-center"><h6>${data}</h6>
                    <div>
                        <img class="img-fluid" style="max-height: 130px;border-radius: 9px;"  src="${row.image}">
                    </div>
                </div>`

            return html
        }

    },
    {
        data: 'description',

    }, {
        data: 'price',

    },
    {
        data: 'stock',

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

const dt = $("#tblProducts").DataTable({
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
const createNewProducts = (body) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", `${apiUrl}/createOne`, body, function () {
        HoldOn.close()
        drawDataTable(dt)
        $("#newProductModal").modal("hide")
    }, function (response) {
        notyf.error(response.message)
        HoldOn.close()
    })
}
const deleteProduct = (id_Product) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiUrl}/findIdAndDelete/${id_Product}`, {}, function () {
        HoldOn.close()
        notyf.success("Producto eliminado")
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

const editProduct = (id) => {

    const body = {
        name: $("#name_product_edit").val(),
        description: $("#description_edit").val(),
        price: $("#price_edit").val(),
        stock: $("#stock_edit").val(),
        image: $("#image_save_edit").val(),
        active: $('#active_edit').prop('checked'),
    };

    console.log("body----------", body)


    api_conection("PUT", `${apiUrl}/updateById/${id}`, body, function () {
        HoldOn.close()
        $("#editProductModal").modal("hide")
        notyf.success("Producto actualizado")
        drawDataTable(dt)
    })
}

const getDataProduct = (id_Product) => {
    HoldOn.open(HoldOptions)
    api_conection("GET", `${apiUrl}/getOneById/${id_Product}`, {}, function (data) {
        HoldOn.close()
        let ProductData = data.data

        $('#name_product_edit').val(ProductData.name);
        $('#description_edit').val(ProductData.description);
        $('#price_edit').val(ProductData.price);
        $('#stock_edit').val(ProductData.stock);
        $('#image_save_edit').val(ProductData.image);
        $('#active_edit').prop('checked', ProductData.active);


    })
}


$(async function () {


    $(".new_product").click(async function () {
        $("#newProductModal").modal("show")
    })

    $("#saveProduct").click(async function () {
        const fields = ["#name_product", "#description", "#image_save", "#active"];

        if (fields.some(field => !$(field).val())) {
            notyf.open({type: "warning", message: "Llena todos los campos para continuar"});
            return;
        }


        const body = {
            name: $("#name_product").val(),
            description: $("#description").val(),
            price: $("#price").val(),
            stock: $("#stock").val(),
            image: $("#image_save").val(),
            active: $('#active').prop('checked'),
        };

        await createNewProducts(body);
    });


    $("#editProduct").click(async function () {
        let id_product = $(this).attr("id_product");
        editProduct(id_product)

    })
    $(document.body).on("click", ".delete-button", function () {
        let id_Product = $(this).attr("data-id");

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
                    // Usuario confirmó la eliminación, ejecutar deleteProduct
                    deleteProduct(id_Product);

                }
            });
    });


    $(document.body).on("click", ".edit-button", function () {
        let id_Product = $(this).attr("data-id");
        $("#editProductModal").modal("show")
        $("#editProduct").attr("id_product", id_Product)
        getDataProduct(id_Product)
    });


    $('.image').change(function () {
        const fileInput = $(this)[0];
        const formData = new FormData();
        const isEdit = $(this).attr("isEdit")

        formData.append('image', fileInput.files[0]);

        $.ajax({
            type: 'POST',
            url: 'api/upload/single_image',
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