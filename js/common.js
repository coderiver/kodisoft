head.ready(function() {

// cycle init

	$(".js-slider").cycle({
		slides: '> div',
		pager: '.slider__pager'
	});

// scroll slider 
	
	// function scroll_height(){
		// var height = $(window).outerHeight();
		// var item = $('.js-scroll-item');
		// item.css('height', height);
	// }
	// scroll_height();

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
	scroll_slider();

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
	scroll_nav();

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
    scroll_nav_fixed();


// document scroll

	$(window).scroll(function(){
		scroll_nav();
		scroll_nav_fixed();
	});
	$(window).resize(function(){
		// scroll_height();
	});

// document click

	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});


});