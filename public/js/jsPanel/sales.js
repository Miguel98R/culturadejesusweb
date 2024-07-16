const apiUrl = "/api/sales"

const drawProductosDetails = async (id_Product) => {

    let template = $("#templateProducts_").clone();

    template.attr('id', 'templateProducts_' + id_Product).css('display', 'block');
    template.find('#img_product_').attr('id', 'img_product_' + id_Product)
    template.find('#name_product_').attr('id', 'name_product_' + id_Product)
    template.find('#price_product_').attr('id', 'price_product_' + id_Product)
    template.find('#cant_product_detail_').attr('id', 'cant_product_detail_' + id_Product)
    template.find('#total_product_').attr('id', 'total_product_' + id_Product)

    return template
}
const drawDataTable = async (data_table) => {
    HoldOn.open(HoldOptions)
    api_conection("POST", apiUrl + "/datatable_aggregate", {status_sale: STATUS}, function (data) {
        HoldOn.close()
        let data_query = data.data;

        console.log("data_query", data_query)

        data_table.clear();
        data_table.rows.add(data_query).draw();
    });
}
const deleteProduct = async (id_Product) => {
    HoldOn.open(HoldOptions)
    api_conection("DELETE", `${apiUrl}/findIdAndDelete/${id_Product}`, {}, function () {
        HoldOn.close()
        notyf.success("Producto eliminado")
        drawDataTable(dt)
    })
}

const getDataSale = async (id_Product) => {
    HoldOn.open(HoldOptions)
    api_conection("GET", `${apiUrl}/getDetailsSale/${id_Product}`, {}, async function (data) {
        HoldOn.close()

        let sale_data = data.sale


        let details_sale = sale_data.details_sale

        let email = sale_data.email
        let cellphone = sale_data.cellphone
        let name_user = sale_data.name_user
        let userAddress = sale_data.userAddress

        let payment_img = sale_data.payment_img

        let type_payout = sale_data.type_payout
        let date_sale = sale_data.date_sale
        let cant_products = sale_data.cant_products

        let subtotal_sale = sale_data.subtotal_sale
        let total_envio = sale_data.total_envio
        let total_sale = sale_data.total_sale
        let mercado_pago_status = sale_data.mercado_pago_status

        $('#name_user').text(name_user);
        $('#email').text(email);
        $('#cellphone').text(cellphone);

        $('#address').text(userAddress.address);
        $('#noInt').text(userAddress.noInt);
        $('#noExt').text(userAddress.noExt);
        $('#neighborhood').text(userAddress.neighborhood);
        $('#zip').text(userAddress.zip);
        $('#city').text(userAddress.city);
        $('#state').text(userAddress.state);

        $('#type_payout').text(type_payout);

        if (payment_img == '') {
            if (type_payout == "mercadoPago") {
                $('#sinComprobante').hide();
                $('#ConComprobante').hide();
                let color_text = ''
                if (mercado_pago_status == 'ACREDITADO') {
                    color_text = 'text-success'
                } else {
                    color_text = 'text-warning'
                }
                $('#mercadoPagoStatus').show()
                $('#status_mp').text(mercado_pago_status).addClass(color_text);
            } else {
                $('#sinComprobante').show();
                $('#ConComprobante').hide();
                $('#mercadoPagoStatus').hide();
            }

        } else {
            $('#sinComprobante').hide();
            $('#mercadoPagoStatus').hide();
            $('#ConComprobante').show();

            $('#img_pago').attr("src", payment_img);
        }


        $('#date_sale').text(moment(date_sale).format('MMMM Do YYYY, h:mm:ss a'));

        $('#cant_products').text(cant_products);
        $('#total_envio').text("$ " + total_envio);
        $('#subtotal_sale').text("$ " + subtotal_sale);
        $('#total_sale').text("$ " + total_sale);

        for (let details of details_sale) {

            let cant_product = details.cant
            let product = details.product
            let total_detalle = details.total_detalle


            for (let products of product) {
                let element = await drawProductosDetails(products._id)


                element.find('#img_product_' + products._id).attr('src', products.image)
                element.find('#name_product_' + products._id).text(products.name)
                element.find('#price_product_' + products._id).text("$ " + products.price + " c/u")
                element.find('#cant_product_detail_' + products._id).text(cant_product + " pzs")
                element.find('#total_product_' + products._id).text("$ " + total_detalle)

                $('#products').append(element);
            }


        }


    })
}

const sendNotification = async (id_sale) => {
    {
        HoldOn.open(HoldOptions)
        api_conection("POST", `${apiUrl}/sendNotification`, {id_sale}, function () {
            HoldOn.close()
            notyf.success("Notificación enviada")
            drawDataTable(dt)
        })
    }
}

const updateStatusSendSale = async (id_sale) => {

    {
        HoldOn.open(HoldOptions)
        api_conection("PUT", `${apiUrl}/updateStatusSendSale/${id_sale}`, {}, function () {
            HoldOn.close()
            notyf.success("Orden actualizada")
            drawDataTable(dt)
        })
    }
}

const upateSaleToHistoricStatus = async (id_sale) => {
    {
        HoldOn.open(HoldOptions)
        api_conection("PUT", `${apiUrl}/upateSaleToHistoricStatus/${id_sale}`, {}, function () {
            HoldOn.close()
            notyf.success("Orden actualizada")
            drawDataTable(dt)
        })
    }
}

const upateSendToSaleStatus = async (id_sale) => {
    {
        HoldOn.open(HoldOptions)
        api_conection("PUT", `${apiUrl}/upateSendToSaleStatus/${id_sale}`, {}, function () {
            HoldOn.close()
            notyf.success("Orden actualizada")
            drawDataTable(dt)
        })
    }
}

let columns

if (STATUS == 'PRV_sale') {
    columns = [

        {
            data: 'user_name',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:20px;">${data}</h6>
                    <div>
                        <p style="font-size:10px;">ID VENTA:${row._id}</p>
                    </div>
                </div>`

                return html
            }
        },
        {
            data: 'cant_products',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:16px;">${data}</h6>
                   
                </div>`

                return html
            }


        },
        {
            data: 'date_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js
                const formattedDate = moment(data).format('DD/MM/YYYY HH:mm:ss');

                let html = `<div class="text-center"><h6 style="font-size:13px;">${formattedDate}</h6></div>`;

                return html;
            }
        },
        {
            data: 'date_sale',
            render: function (data, type, row) {

                const dateSale = moment(data);
                const daysPassed = moment().diff(dateSale, 'days');

                let textColor = 'text-success'; // Verde por defecto
                let additionalNote = '0 días transcurridos';

                if (daysPassed > 0) {
                    additionalNote = daysPassed === 1 ? '1 día transcurrido' : `${daysPassed} días transcurridos`;

                    if (daysPassed === 2) {
                        textColor = 'text-warning'; // Amarillo
                    } else if (daysPassed >= 3) {
                        textColor = 'text-danger'; // Rojo
                        additionalNote += '. Al finalizar el día, la orden será cancelada.';
                    }
                }

                let html = `<div class="text-start ${textColor}">
                        <p>${additionalNote}</p>
                    </div>`;

                return html;
            }
        }

        ,

        {
            data: 'total_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js


                let html = `<div class="text-center"><h6 style="font-size:15px;">$ ${data}</h6></div>`;

                return html;
            }

        },


        {

            width: "25%",
            data: '_id',
            render: function (data, type, row) {
                if (type === 'display') {

                    return `<button class="my-1 w-100 see-details-button btn btn-warning" data-id="${data}">Ver Detalles</button>
                    <button class="my-1 w-100  send-notification-button btn btn-info" data-id="${data}">Enviar notificación de  pago</button>
                    <button class="my-1 w-100 delete-button btn btn-danger" data-id="${data}">Cancelar</button>`;
                }
                return data;
            }
        }


    ]
}

if (STATUS == 'OR_sale') {
    columns = [

        {
            data: 'user_name',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:20px;">${data}</h6>
                    <div>
                        <p style="font-size:10px;">ID VENTA:${row._id}</p>
                    </div>
                </div>`

                return html
            }
        },
        {
            data: 'cant_products',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:16px;">${data}</h6>
                   
                </div>`

                return html
            }


        }, {
            data: 'date_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js
                const formattedDate = moment(data).format('DD/MM/YYYY HH:mm:ss');

                let html = `<div class="text-center"><h6 style="font-size:13px;">${formattedDate}</h6></div>`;

                return html;
            }
        },
        {
            data: 'dates_sale',
            render: function (data, type, row) {
                // Validar si dates_sale es un objeto vacío
                if (!data || Object.keys(data).length === 0) {
                    return '<div class="text-center"><h6 style="font-size:15px;">Aún no se registra fecha de pago ni de envío</h6></div>';
                }

                // Formatear las fechas con Moment.js
                const formattedDateShipment = data.date_shipment ? moment(data.date_shipment).format('DD/MM/YYYY HH:mm:ss') : 'Aún no se envia el producto'
                const formattedDatePayment = data.date_payment ? moment(data.date_payment).format('DD/MM/YYYY HH:mm:ss') : 'Sin fecha de pago'


                let html = `<div class="text-start">
                        <h6 style="font-size:15px;">Fecha de Pago: ${formattedDatePayment}</h6>   
                        <h6 style="font-size:15px;">Fecha de Envío: ${formattedDateShipment}</h6>
                       
                    </div>`;

                return html;
            }
        }
        ,

        {
            data: 'total_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js


                let html = `<div class="text-center"><h6 style="font-size:15px;">$ ${data}</h6></div>`;

                return html;
            }

        },


        {

            width: "25%",
            data: '_id',
            render: function (data, type, row) {
                if (type === 'display') {

                    return `<button class="my-1 w-100 see-details-button btn btn-warning" data-id="${data}">Ver Detalles</button>
                    <button class="my-1 w-100  send-button btn btn-info" data-id="${data}">Listo para enviar</button>
                    <button class="my-1 w-100  send-historic-button btn btn-success" data-id="${data}">Enviar a Histórico</button>
                    <button class="my-1 w-100 delete-button btn btn-danger" data-id="${data}">Cancelar</button>`;
                }
                return data;
            }
        }


    ]
}

if (STATUS == 'OR_send') {
    columns = [

        {
            data: 'user_name',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:20px;">${data}</h6>
                    <div>
                        <p style="font-size:10px;">ID VENTA:${row._id}</p>
                    </div>
                </div>`

                return html
            }
        },
        {
            data: 'cant_products',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:16px;">${data}</h6>
                   
                </div>`

                return html
            }


        },
        {
            data: 'date_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js
                const formattedDate = moment(data).format('DD/MM/YYYY HH:mm:ss');

                let html = `<div class="text-center"><h6 style="font-size:13px;">${formattedDate}</h6></div>`;

                return html;
            }
        },
        {
            data: 'dates_sale',
            render: function (data, type, row) {
                // Validar si dates_sale es un objeto vacío
                if (!data || Object.keys(data).length === 0) {
                    return '<div class="text-center"><h6 style="font-size:15px;">Aún no se registra fecha de pago ni de envío</h6></div>';
                }

                // Formatear las fechas con Moment.js
                const formattedDateShipment = data.date_shipment ? moment(data.date_shipment).format('DD/MM/YYYY HH:mm:ss') : 'Aún no se envia el producto'
                const formattedDatePayment = data.date_payment ? moment(data.date_payment).format('DD/MM/YYYY HH:mm:ss') : 'Sin fecha de pago'


                let html = `<div class="text-start">
                        <h6 style="font-size:15px;">Fecha de Pago: ${formattedDatePayment}</h6>   
                        <h6 style="font-size:15px;">Fecha de Envío: ${formattedDateShipment}</h6>
                       
                    </div>`;

                return html;
            }
        }
        ,

        {
            data: 'total_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js


                let html = `<div class="text-center"><h6 style="font-size:15px;">$ ${data}</h6></div>`;

                return html;
            }

        },


        {

            width: "25%",
            data: '_id',
            render: function (data, type, row) {
                if (type === 'display') {

                    return `<button class="my-1 w-100 see-details-button btn btn-warning" data-id="${data}">Ver Detalles</button>
                            <button class="my-1 w-100 return-sale-button btn btn-secondary" data-id="${data}">Regresar a ordenes</button>
                            <button class="my-1 w-100  send-button btn btn-success" data-id="${data}">Enviar a Histórico</button>
                            `;
                }
                return data;
            }
        }


    ]
}

if (STATUS == 'OR_historic') {
    columns = [

        {
            data: 'user_name',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:20px;">${data}</h6>
                    <div>
                        <p style="font-size:10px;">ID VENTA:${row._id}</p>
                    </div>
                </div>`

                return html
            }
        },
        {
            data: 'cant_products',
            render: function (data, type, row) {
                let html = `<div class="text-center"><h6 style="font-size:16px;">${data}</h6>
                   
                </div>`

                return html
            }


        },
        {
            data: 'date_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js
                const formattedDate = moment(data).format('DD/MM/YYYY HH:mm:ss');

                let html = `<div class="text-center"><h6 style="font-size:13px;">${formattedDate}</h6></div>`;

                return html;
            }
        },
        {
            data: 'dates_sale',
            render: function (data, type, row) {
                // Validar si dates_sale es un objeto vacío
                if (!data || Object.keys(data).length === 0) {
                    return '<div class="text-center"><h6 style="font-size:15px;">Aún no se registra fecha de pago ni de envío</h6></div>';
                }

                // Formatear las fechas con Moment.js
                const formattedDateShipment = data.date_shipment ? moment(data.date_shipment).format('DD/MM/YYYY HH:mm:ss') : 'Aún no se envia el producto'
                const formattedDatePayment = data.date_payment ? moment(data.date_payment).format('DD/MM/YYYY HH:mm:ss') : 'Sin fecha de pago'


                let html = `<div class="text-start">
                        <h6 style="font-size:15px;">Fecha de Pago: ${formattedDatePayment}</h6>   
                        <h6 style="font-size:15px;">Fecha de Envío: ${formattedDateShipment}</h6>
                       
                    </div>`;

                return html;
            }
        },
        {
            data: 'total_sale',
            render: function (data, type, row) {
                // Formatear la fecha con Moment.js


                let html = `<div class="text-center"><h6 style="font-size:15px;">$ ${data}</h6></div>`;

                return html;
            }

        },
        {

            width: "25%",
            data: '_id',
            render: function (data, type, row) {
                if (type === 'display') {

                    return `<button class="my-1 w-100 see-details-button btn btn-warning" data-id="${data}">Ver Detalles</button>`;
                }
                return data;
            }
        }


    ]
}

const dt = $(`#${TABLE}`).DataTable({
    responsive: true,
    language: language,
    data: [],
    lengthMenu: [
        [5, 10, 15, 25, 50, 100, 1000],
        ["5 rows", "10 rows", "15 rows", "25 rows", "50 rows", "100 rows", "1000 rows"],
    ],
    order: [
        [2, "desc"],
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


$(async function () {


///////// ----------------------------------------------------- SALES FUNCTIONS -------------------------------------------- /////

   /* $(document.body).on("click", ".delete-button", function () {
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
    });*/

    $(document.body).on("click", ".send-button", async function () {
        let id_sale = $(this).attr("data-id");

        Swal.fire({
            title: "¿Estás seguro de empezar el envío para esta venta?",
            text: "Esta acción no tiene retorno.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, adelante"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await updateStatusSendSale(id_sale);

                }
            });
    });

    $(document.body).on("click", ".send-historic-button", async function () {
        let id_sale = $(this).attr("data-id");

        Swal.fire({
            title: "¿Estás seguro de enviar esta venta al histórico?",
            text: "Esta acción no tiene retorno.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, adelante"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await upateSaleToHistoricStatus(id_sale);

                }
            });
    });

    $(document.body).on("click", ".see-details-button", function () {
        let id_sale = $(this).attr("data-id");
        $("#detailsSaleModal").modal("show")
        getDataSale(id_sale)
    });


///////// ----------------------------------------------------- PRESALES FUNCTIONS -------------------------------------------- /////


    $(document.body).on("click", ".send-notification-button", function () {
        let id_sale = $(this).attr("data-id");
        Swal.fire({
            title: "¿Estás seguro de enviar la notificación de pago?",
            text: "Se enviara un email al cliente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, adelante"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await sendNotification(id_sale);

                }
            });
    });


/////// ----------------------------------------------------- SENDTS STATUS FUNCTIONS -------------------------------------------- /////

    $(document.body).on("click", ".return-sale-button", function () {
        let id_sale = $(this).attr("data-id");
        Swal.fire({
            title: "¿Estás seguro de regresar a ordenes esta venta?",
            text: "Esta acción no tiene retorno.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, adelante"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await upateSendToSaleStatus(id_sale);

                }
            });
    });

/////// ----------------------------------------------------- OTHER FUNCTIONS -------------------------------------------- /////

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


    await drawDataTable(dt)

})