$(document).ready(function () {


    $('.header').addClass('loaded');

    Fancybox.bind('[data-fancybox="gallery"]', {
        Thumbs : {
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

});