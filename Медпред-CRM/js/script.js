$(document).ready(function () {
    const da = new DynamicAdapt("max");
    da.init();
    Fancybox.bind("[data-fancybox]");
    AOS.init({

        offset: 200,
        once: true

    });
    $('input[type="tel"]').inputmask({ "mask": "+7(999) 999-9999" });

    $(".detail-text ol").each(function (index, value) {
        console.log(value);

        let items = $(value).find('> li')
        items.each(function (index, value) {
            $(value).attr('data-count', index + 1)
        });
    });
    $("form").submit(function (event) {
        let form = $(this);
        event.preventDefault();
        form.find('button').addClass('sending');
        form.find('input[name="page"]').val(window.location.href);
        $.ajax({
            url: "/mail.php",
            data: form.serialize(),
            type: "POST",
            // dataType: "json"
            error: function () { // Данные не отправлены
                alert('Произошла ошибка, попробуйте еще раз');
                form.find('button').removeClass('sending');
                Fancybox.close();
            }
        }).done(function (data) {
            form.find('button').removeClass('sending');
            Fancybox.close();
            form[0].reset();
            Fancybox.show([
                {
                    src: '#form-success',
                    type: 'inline',
                },
            ]);
        })

    });
    let str = 'Лапароскопическая'
})


$(document).on('click', '.js-menu__btn', function () {
    if (!$(this).hasClass('open')) {
        $(this).addClass('open');
        $('.js-menu').addClass('open');
        $('body').addClass('lock');
    } else {
        $(this).removeClass('open');
        $('.js-menu').removeClass('open');
        $('body').removeClass('lock');
    }
});


$(document).ready(function () {
    $("a:not([data-fancybox])").on('click', function(event) {
        if (this.hash !== "") {
            let currentLocation = window.location.pathname;
            let link = $(this).attr('href');

            if (link.startsWith("/")) {
                let protocol = window.location.protocol;
                let domain = window.location.hostname;
                let currentUrlWithProtocol = protocol + '//' + domain;
                link = currentUrlWithProtocol + link;
            }

            let url = new URL(link);
            let path = url.pathname;

            if (currentLocation == path){
                event.preventDefault();
                let hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){
                    window.location.hash = hash;
                });
            }
        }
    });
});