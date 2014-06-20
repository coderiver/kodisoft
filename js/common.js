head.ready(function() {

// cycle init
	
	
	function SliderInit(){
		$(".js-slider").each(function(){
			var pager = $(this).next('.slider__pager');
			var top = $(this).offset().top;
			$(this).cycle({
				slides: '> div',
				pager: pager,
				paused: true
			});
			if ($(window).scrollTop() >= (top - 140)) {
				$(this).cycle('resume');
			}
		});
	}
	if ($(".js-slider").length) {
    	SliderInit();
    };

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
    	scroll_slider();
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
    if ($(".js-scroll-nav").length) {
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

// people
	
	function people(){
		var h = $(".js-people").outerHeight();
		$(".occupation").css('height', h);
	}
	people();

// hint
	if ($(".hint").length) {
		$(".restaurant__point").on('click', function(){
			$(this).find('.hint').toggleClass('is-open');
		});	
	};

// parallax 

	$(".parallax__layer1").parallax(
        {
            xparallax: '30px',
            yparallax: '20px',
            width: 1,
            height: 1,
            mouseport: jQuery(".mcloud__img")
        }
    );
    $(".parallax__layer2").parallax(
        {
            xparallax: '20px',
            yparallax: '10px',
            width: 1,
            height: 1,
            invertX: false,
            invertY: false,
            mouseport: jQuery(".mcloud__img")
        }
    );	


// rd slider

	function rd_slider(){
		var top = $(".rd").offset().top;
		var item = $(".rd__item");
		var h = $(window).outerHeight();
		var scroll_top = $(window).scrollTop();
		var b = $('body');

		function sliderScroll(){
			$('.rd__item').each(function(){
				var pos = $(this).offset().top;
				var id = $(this).attr('id');
				if( $(window).scrollTop() == (pos)){
					$('.rd__item').removeClass('is-animated');
					$(this).addClass('is-animated');
					$('.scroll-nav__inner a').removeClass('is-active');
					$('[href = #'+id+']').addClass('is-active');
				}
			});
		}
		$(window).scroll(function() {
			sliderScroll();
		});

		// slider paginator
		$('.scroll-nav__inner a').click(function (e){
			e.preventDefault();

			var page = $(this).attr("href");

			$('html, body').stop().animate({
				scrollTop: $(page).offset().top
			}, 800);
		});

		item.css('height', h);
		item.first().addClass('is-animated');

		if (scroll_top >= top ) {
			$("body").addClass('slider-mode');
			var $current, flag = false;

				$('body.slider-mode').bind('mousewheel', function(event) {
					if (b.hasClass('is-running')) { 
						return false; 
					}

					b.addClass('is-running');

					var current = $(".rd__item.is-animated")

				    if (event.originalEvent.wheelDelta >= 0) {
				        var prev = current.prev();

				        if (prev.length) {
				        	flag = true;
				        	$('body').scrollTo(prev, 500, {
				        		onAfter : function(){
				        			flag = false;
				        		}
				        	});
				        }
				        else{
				        	event.preventDefault();
				        	b.removeClass('slider-mode ');
				        }
				    }
				    else {
				        var next = current.next();

				        if (next.length) {
				        	flag = true;
				        	$('body').scrollTo(next, 500, {
				        		onAfter : function(){
				        			flag = false;
				        		}
				        	});
				        }
				    }
				    setTimeout(function(){b.removeClass('is-running');},500);
					event.preventDefault();
				});
		}
		else{
			$("body").removeClass('slider-mode');
		}
		

	}
	if ($(".rd").length) {
		rd_slider();
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
    	if ($(".js-slider").length) {
    		SliderInit();
    	};
    	if ($(".rd").length) {
			rd_slider();
		};
	});
	$(window).resize(function(){
		MapSize();
		people();
		if ($(".rd").length) {
			rd_slider();
		};
	});

// document click

	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});


});