const preDdlv2024 = [
    {
        imgSrc: "/public/images/cultura_img/congreso_portada",
        title: "Predica 1 | Pas. Hector",
        buttonText: "Adquirir",
        number:1,
        active:false,
        url_video:''
    },
    // Agrega más objetos de card aquí
];

const ddLv2024 = [
    {
        imgSrc: "/public/images/cultura_img/congreso_portada",
        title: "Predica 2 | Pas. Juan",
        buttonText: "Comprar"
    },
    // Agrega más objetos de card aquí
];

const posDdlv2024 = [
    {
        imgSrc: "/public/images/cultura_img/congreso_portada",
        title: "Predica 3 | Pas. Pedro",
        buttonText: "Obtener"
    },
    // Agrega más objetos de card aquí
];

// Función para renderizar las cards
function renderCards(data, containerSelector) {
    data.forEach(card => {
        const cardHtml = `
                        <div class="col-4">
                            <div class="card bg-black border-0">
                                <div class="card-body">
                                    <img src="${card.imgSrc}" />
                                    <div class="m-3 p-2">
                                        <h4 class="text-white">${card.title}</h4>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button class="w-100 button button--fill btn-danger">${card.buttonText}</button>
                                </div>
                            </div>
                        </div>
                    `;
        $(containerSelector).append(cardHtml);
    });
}

$(async function () {
    await renderCards(preDdlv2024, "#pre_ddlv_2024");
    await renderCards(ddLv2024, "#ddlv_2024");
    await renderCards(posDdlv2024, "#pos_ddlv_2024");
})