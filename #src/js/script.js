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
	console.log(str.length);


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
function $_GET(key) {
	var p = window.location.search;
	p = p.match(new RegExp(key + '=([^&=]+)'));
	return p ? p[1] : false;
}

$(document).on('click', '.menu__item', function () {

});
$(document).ready(function () {
	let el = $_GET('id');
	if (el) {
		$('html, body').animate({ scrollTop: $(`#${el}`).offset().top }, 800);
	}
	const url = new URL(document.location);
	const searchParams = url.searchParams;
	searchParams.delete("id"); // удалить параметр "id"
	window.history.pushState({}, '', url.toString());
});