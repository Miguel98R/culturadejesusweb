$(document).ready(function () {
    HoldOn.open()


    $(".swipebox").swipebox();

    $('.swipebox').click(function (e) {
        e.preventDefault();
    })

    $(".viewImage").show()
    $('.header').addClass('loaded');
    setTimeout(() => {


        HoldOn.close()
    }, 7000)





    Fancybox.bind('[data-fancybox="poster"]', {
        // Custom options for all galleries
    });

    Fancybox.bind('[data-fancybox="maps"]', {
        // Custom options for all galleries
    });


});