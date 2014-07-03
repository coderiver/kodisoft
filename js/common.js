head.ready(function() {

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}
// cycle init

function findnext(){
	console.log('runnext');
	var scrollPosition = $(window).scrollTop();
	$('.products__item').each(function() {
        var that = $(this);
        artPosition = that.offset().top;
        dv = artPosition - scrollPosition;
        //console.log(dv);
        
        if (dv > 10 && dv<600 && !running) {
        	var running = 1;
        	console.log($('.products__item').index(that));
            target = that;
            //$.scrollTo(target, 400, {axis:'y', easing:'easeInOutQuart'});
            disable_scroll();
            $('html, body').animate({
		        scrollTop: $(this).offset().top
		    }, 300,function(){running = 0;enable_scroll();});	
            console.log('runed');
            return false;
        }
    });
}
function findprev(){
	console.log('runprev');
	var scrollPosition = $(window).scrollTop();
	$('.products__item').each(function() {
        var that = $(this);
        artPosition = that.offset().top;
        dv = artPosition - scrollPosition;
        //console.log(dv);
        
        if (dv < -10 && dv>-600 && !running) {
        	var running = 1;
        	console.log($('.products__item').index(that));
            target = that;
            //$.scrollTo(target, 400, {axis:'y', easing:'easeInOutQuart'});
            disable_scroll();
            $('html, body').animate({
		        scrollTop: $(this).offset().top
		    }, 300,function(){running = 0;enable_scroll();});	
            console.log('runed');
            return false;
        }
    });
}

findnext1 = _.debounce(findnext, 30, true);
findprev1 = _.debounce(findprev, 30, true);
var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    $('body').bind(mousewheelevt, function(e){
        	//console.log('gogog');
        	
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            
            if(delta > 0) {
                findprev1();
            }
            else{
	            findnext1();			    
            }   
            //return false;
        

    });
	

	// $(document).scrollsnap({
 //        snaps: '.products__item',
 //        proximity: 40,
 //        easing: 'easeOutBack'
 //        });
	
	function SliderInit(){
		$(".js-slider").each(function(){
			var pager = $(this).next('.slider__pager');
			var top = $(this).offset().top;
			$(this).cycle({
				slides: '> div',
				pager: pager,
				paused: true,
				speed: 600,
				swipe: true
			});
			if ($(window).scrollTop() >= (top - 140)) {
				$(this).cycle('resume');
			}
			if ($(window).scrollTop() >= (top + 800)) {
				$(this).cycle('goto', 0);
			}
		});
		//.cycle('goto', 0);
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
		var h = $(".js-people:first-child").width();
		$(".occupation").css('height', h);
	}
	//people();

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
if($(".rd").length && !head.touch){
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
		//alert('a');
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

}
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
	});
	$(window).resize(function(){
		MapSize();
		people();

	});

// document click

	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});


});