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
	if ($(".js-scroll").length && !$('.js-scroll-rd').length) {
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
        if ($(window).scrollTop() >= top -47) {
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
	var b = $('body');
	var item = $(".rd__item");
	var top = $(".rd").offset().top;
	var h = $(window).outerHeight();
	item.css('height', h);
	item.first().addClass('is-animated');
	$('.scroll-nav__inner a').click(function (e){
		e.preventDefault();

		var page = $(this).attr("href");

		$('html, body').stop().animate({
			scrollTop: $(page).offset().top
		}, 800);
	});


	$(window).scroll(function(event) {
		if ($(window).scrollTop() >= top ){
			$('body').addClass('slider-mode');
		}
	});
	$('.scroll-nav__inner li:first-child').addClass('is-first');
	$('.scroll-nav__inner li:last-child').addClass('is-last');

	function goto(myid){
		console.log('scrolling to '+myid);
		toscroll = myid+'';
		
		if(!b.hasClass('is-running')){
			b.addClass('is-running');
			$('body').scrollTo($(''+toscroll), 1000, {
	    		onAfter : function(){
	    			b.removeClass('is-running');
	    			$('.scroll-nav__inner a').removeClass('is-active');
	    			$('.scroll-nav__inner a[href='+toscroll+']').addClass('is-active');
	    		}
	    	});
		}
		
	}
	function next(){
		console.log('next')
		if($('.scroll-nav__inner .is-active').parent().hasClass('is-last')){
			$('body').removeClass('slider-mode');
		}
		else{
			mynext = $('.scroll-nav__inner .is-active').parent().next().children('a').attr('href');
			goto(mynext);
		}
	}
	function prev(){
		console.log('prev');
		if($('.scroll-nav__inner .is-active').parent().hasClass('is-first')){
			$('body').removeClass('slider-mode');
		}
		else{
			myprev = $('.scroll-nav__inner .is-active').parent().prev().children('a').attr('href');
			goto(myprev);
		}
	}
	$('.scroll-nav__inner a').click(function(event) {
		goto($(this).attr('href'));
		return false;
	});
	var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	$('body').bind(mousewheelevt, function(e){
		if(b.hasClass('slider-mode')){
		    var evt = window.event || e //equalize event object     
		    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
		    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

		    if(delta > 0) {
		        prev();
		    }
		    else{
		        next();

		    }   
		    return false;
		}
		else{
			console.log('we are free to scroll');
		}
	});

	function rd_slider(){
		
		// var scroll_top = $(window).scrollTop();
		

		// if (scroll_top >= top ) {
		// 	$("body").addClass('slider-mode');
		// 	var $current, flag = false;

		// 		$('body.slider-mode').bind('mousewheel', function(event) {
		// 			if (b.hasClass('is-running')) { 
		// 				return false; 
		// 			}

		// 			b.addClass('is-running');

		// 			var current = $(".rd__item.is-animated")

		// 		    if (event.originalEvent.wheelDelta >= 0) {
		// 		        var prev = current.prev();

		// 		        if (prev.length) {
		// 		        	flag = true;
		// 		        	$('body').scrollTo(prev, 500, {
		// 		        		onAfter : function(){
		// 		        			flag = false;
		// 		        		}
		// 		        	});
		// 		        	event.preventDefault();
		// 		        }
		// 		        else{
		// 		        	b.removeClass('slider-mode ');
		// 		        }
		// 		    }
		// 		    else {
		// 		        var next = current.next();

		// 		        if (next.length) {
		// 		        	flag = true;
		// 		        	$('body').scrollTo(next, 500, {
		// 		        		onAfter : function(){
		// 		        			flag = false;
		// 		        		}
		// 		        	});
		// 		        }

		// 		    }
		// 		    setTimeout(function(){b.removeClass('is-running');},500);
					
		// 		});
		// }
		// else{
		// 	$("body").removeClass('slider-mode');
		// }
		

	}
	// end rd_slider
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