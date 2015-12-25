$(document).ready(function() {
    // Flexslider
    $('.flexslider').flexslider({
        animation: "fade",
        directionNav: false,
    });

    // Page Scroll
    var sections = $('section')
        nav = $('nav[role="navigation"], .banner-text');

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - 76,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });
    nav.find('a').on('click', function () {
        var $el = $(this)
            id = $el.attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - 75
        }, 500);
      return false;
    });

    // Mobile Navigation
    $('.nav-toggle').on('click', function() {
        $(this).toggleClass('close-nav');
        nav.toggleClass('open');
        return false;
    }); 
    nav.find('a').on('click', function() {
        $('.nav-toggle').toggleClass('close-nav');
        nav.toggleClass('open');
    });

    // Form sending
    $('#order-form').submit(function(event) {
        var $form = $(this),
            formData = new FormData(this),
            closeAlert = function() {
                setTimeout(function() { 
                    $form.find('.alert').removeClass('alert-success alert-danger').html('');
                }, 5000);
            };

        event.preventDefault();

        $.ajax({
            url: '/order',
            type: 'POST',
            data: formData,
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function(data) {
                $form.find('input[type=text], textarea').val('');
                $form.find('.alert')
                    .addClass('alert-success')
                    .html('Заявка успешно отправлена. Мы обязательно с вами свяжемся.');

                closeAlert();
            },
            error: function() {
                $form.find('.alert')
                    .addClass('alert-danger')
                    .html('Извините, во время отправки произошла ошибка. Попробуйте еще раз.');
            
                closeAlert();
            }
        });

        return false;
    });
});

ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
            center: [58.558107, 31.253134],
            zoom: 13
        }, {

        });

    myMap.geoObjects.add(new ymaps.Placemark([58.558107, 31.253134], {
        balloonContent: 'Сырковское шоссе д.30, Великий Новгород'
    }, {
        preset: 'islands#dotIcon',
        iconColor: 'red'
    }))
}