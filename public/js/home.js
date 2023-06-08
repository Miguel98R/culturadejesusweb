$(document).ready(function () {


    $('.header').addClass('loaded');

// Obtener la fecha actual
    var fechaActual = moment();

// Obtener la fecha objetivo (9 de agosto de 2023)
    var fechaObjetivo = moment('2023-08-09');

// Calcular la diferencia en días entre las dos fechas
    var diasRestantes = fechaObjetivo.diff(fechaActual, 'days');

// Mostrar la cuenta regresiva en días
    console.log("Días restantes: " + diasRestantes);

    $('#contador').text(diasRestantes);


    Fancybox.bind('[data-fancybox="gallery"]', {
        Thumbs: {
            type: "modern"
        },
        caption: (fancybox, slide) => {
            const caption = slide.caption || "";

            return `${slide.index + 1} / ${
                fancybox.carousel?.slides.length
            } <br /> ${caption}`;
        },
    });

    Fancybox.bind('[data-fancybox="poster"]', {
        // Custom options for all galleries
    });

    Fancybox.bind('[data-fancybox="maps"]', {
        // Custom options for all galleries
    });


});