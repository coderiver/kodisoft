head.ready(function() {

// cycle init

	$(".js-slider").cycle({
		slides: '> div',
		pager: '.slider__pager'
	});

// document click

	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});


});