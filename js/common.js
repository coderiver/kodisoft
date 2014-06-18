head.ready(function() {

// cycle init
	
	$(".js-slider").each(function(){
		var pager = $(this).next('.slider__pager');
		$(this).cycle({
			slides: '> div',
			pager: pager
		});
	});

// contacts map size

	function MapSize(){
		var h = $(window).outerHeight();
		h = (h - 200);
		$(".js-contacts").css('height', h);
	}
	MapSize();

// scroll slider 

	function scroll_slider(){
		var slider = $(".js-scroll");

		slider.each(function(){
			var slider_item = $(this).find('.js-scroll-item');
			var nav = $(this).find(".js-scroll-nav");
			var link = nav.find('a');
			
			link.on('click', function(){
				var attr = $(this).attr('href');
				
				$("html, body").animate({
           		    scrollTop: $('[data-number = '+attr+']').offset().top
           		}, 500);
				
				return false;
			});

		});
	}
	if ($(".js-scroll").length) {
    	scroll_slider();;
    };
	

	function scroll_nav(){
		$('.js-scroll-item').each(function(){
			var pos = $(this).offset().top;
			var block = $(this).attr('data-number');
			if ($(window).scrollTop() >= pos - 250 ) {
				$(".js-scroll-nav a").removeClass('is-active');
				$('[href = '+block+']').addClass('is-active');
			}
			else{
				$('[href = '+block+']').removeClass('is-active');
			}
		});
	}
	if ($(".js-scroll").length) {
    	scroll_nav();
    };

	function scroll_nav_fixed(){
        var nav = $(".js-scroll");
        var top = nav.offset().top;
        if ($(window).scrollTop() >= top) {
            $(".js-scroll-nav").addClass('is-fixed');
        }
        else{
            $(".js-scroll-nav").removeClass('is-fixed');
        };
    };
    if ($(".js-scroll").length) {
    	scroll_nav_fixed();
    };
   
// intellect house icons animation

	function anim1(){
		var item = $(".inthouse__icons");
		var top = item.offset().top;
		if ($(window).scrollTop() > (top - 400)) {
			item.addClass('is-animated');
		}
	}
	if ($(".inthouse__icons").length) {
    	anim1();
    };

    function anim2(){
		var item = $(".watchdog");
		var top = item.offset().top;
		if ($(window).scrollTop() > (top - 400)) {
			item.addClass('is-animated');
		}
	}
	if ($(".watchdog").length) {
    	anim2();
    };

// document scroll

	$(window).scroll(function(){
		if ($(".js-scroll").length) {
			scroll_nav();
    		scroll_nav_fixed();
    	};
    	if ($(".inthouse__icons").length) {
    		anim1();
    	};
    	if ($(".watchdog").length) {
    		anim2();
    	};
	});
	$(window).resize(function(){
		MapSize();
	});

// document click

	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});


});