$(document).ready(function () {




    if ($(window).width() >= 1200) {
        $("#logoNav").css('max-height', '120px');
        $("#title").css('font-size', '5rem');

    }

    if ($(window).width() >= 880 && $(window).width() < 1200) {
        $("#logoNav").css('max-height', '120px');

        $("#title").css('font-size', '4rem');

    }

    if ($(window).width() < 880) {
        $("#logoNav").css('max-height', '95px');
        $("#title").css('font-size', '4rem');


    }


    let page = 0

    if($(window).width() >= 680 && $(window).width() < 1200 ){
        Page = 5
    }else{
        Page = 10

    }

    if($(window).width() < 680 ){
        Page = 2
    }



    if(Page == 1){
        $('.images').addClass('text-center')
    }

    var images = $('.images li');
    var numImages = images.length;
    var perPage = Page;
    var numPages = Math.ceil(numImages / perPage);
    var pagination = $('.pagination');

    for (var i = 1; i <= numPages; i++) {
        $('<button>', {
            text: i,
            class: 'page',
            data: {
                page: i
            }
        }).appendTo(pagination);
    }

    pagination.find('.page:first').addClass('active');

    images.slice(perPage).hide();

    pagination.on('click', '.page', function() {
        var page = $(this).data('page');
        var start = (page - 1) * perPage;
        var end = start + perPage;

        images.hide().slice(start, end).fadeIn(500);

        pagination.find('.page').removeClass('active');
        $(this).addClass('active');
    });



    $('.images img').click(function() {
        var src = $(this).attr('src');
        $('.modal-image').attr('src', src);
        $('.modal-container').fadeIn();
    });

    $('.modal-close').click(function() {
        $('.modal-container').fadeOut();
    });


});