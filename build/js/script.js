
/* Interactions
/////////////////////////////////////////////////////////////// */

var $container, containerWidth, containerHeight, containerRatio, marginHeight, marginWidth;

var bpw = 20;

var $box = $('<div class="box"><div class="side top"></div> <div class="side right"></div> <div class="side bottom"></div> <div class="side left"></div></div>');

// $(document).ready(function() {
// 	appendBoxes;
// });

function appendBoxes() {
	for(i = 0; i<bpw; i++) {
		$(".wall").append($box);
	}
	initContainer();
}

function initContainer(refreshFlag) {
/* 		console.time("init"); */

	console.log("initContainer called.");
	$container = $('#container');

	containerWidth = window.innerWidth;
	containerHeight = window.innerHeight;
	containerRatio = containerWidth / containerHeight;
	marginHeight = Math.round(containerHeight/80);
	marginWidth = Math.round(containerWidth/80);
	$container.css('width', window.innerWidth);
	$container.css('height', containerHeight);

	drawWalls(refreshFlag);
/* 		console.timeEnd("init"); */
}


function drawWalls(refreshFlag) {
/* 		console.time("drawWalls"); */
	console.log("drawWalls called.");



	$('#wall-back').css('-webkit-transform', 'translateZ(-'+ containerWidth / 2 +'px)').css({
		width: containerWidth,
		height: containerHeight
	}).find('.box').css({
		marginTop: marginHeight,
		marginBottom: marginHeight
	}).find('.top').css({
		height: containerWidth/10,
		top:	-containerWidth/10
	}).end().find('.bottom').css({
		height: containerWidth/10
	});

	$('#wall-left').css({
		width: containerWidth/2,
		height: containerHeight,
		left: -containerWidth/2
	}).find('.box').css({
				marginTop: 		marginHeight,
				marginBottom: 	marginHeight
			}).find('.top').css({
				height: containerWidth/10,
				top:	-containerWidth/10
			}).end().find('.bottom').css({
				height: containerWidth/10
			});

	$('#wall-right').css({
		width: containerWidth/2,
		height: containerHeight,
		left: containerWidth/2
	}).find('.box').css({
				marginTop: 		marginHeight,
				marginBottom: 	marginHeight
			}).find('.top').css({
				height: containerWidth/10,
				top:	-containerWidth/10
			}).end().find('.bottom').css({
				height: containerWidth/10
			});

	$('#wall-top').css({
			width: containerWidth,
			height: containerWidth / 2,
			top: -containerWidth / 2
			}).find('.box').find('.top').css({
		height: containerHeight/10,
		top:	-containerHeight/10
	}).end().find('.bottom').css({
		height: containerHeight/10
	}).end().find('.left, .right').css({
		width: containerHeight/10
	});

	$('#wall-bottom').css({
		width: containerWidth,
		height: containerWidth / 2,
		top: containerHeight - (containerWidth / 2)
	}).find('.box').find('.top').css({
		height: containerHeight/10,
		top:	-containerHeight/10
	}).end().find('.bottom').css({
		height: containerHeight/10
	}).end().find('.left, .right').css({
		width: containerHeight/10
	});

	if(!refreshFlag){loadSaved()};

/* 		console.timeEnd("drawWalls"); */
}



function loadSaved() {
/* 		console.time("loadSaved"); */
	console.log("loadSaved called.");
	var blocks = [];
	var status = [];
	var numKeys = localStorage.length;
	for(i=0;i<numKeys;i++) {
			blocks[i]=localStorage.key(i);
			status[i]=localStorage.getItem(blocks[i]);
			if (status[i]=="1") {
			activate(blocks[i]);
			}
	}
/* 		console.timeEnd("loadSaved"); */
}



function activate(index, clickFlag) {
	var amount = 0;
/*
	console.time("activate");
	console.log("activate called.");
*/
	$block = $('.box').eq(index);
	if(!$block.hasClass("selected")){
		if($block.parent().is('#wall-top')){
			amount = -(($container.height() / 2) - (marginHeight));
			}
			else if($block.parent().is('#wall-bottom')){
				amount = ($container.height() / 2) - (marginHeight);

			}
			else if($block.parent().is('#wall-left')) {
				amount = -($container.width() / 2) + (marginWidth);
			}
			else {
				amount = ($container.width() / 2) - (marginWidth);
			}
			$block.css('-webkit-transform', 'translateZ('+ amount +'px)').toggleClass('selected', true).find('.side').toggleClass('sideSelected', true);
			if(clickFlag){ localStorage.setItem(index, 1); }
	} else {
		$block.css('-webkit-transform', '').toggleClass('selected', false).find('.side').toggleClass('sideSelected', false);
		if(clickFlag){localStorage.setItem(index, 0); console.log("Block" +index+ "deactivated.");}
	}
/* 		console.timeEnd("activate"); */
}


$(".box").each(function(i) {
	var $thisBlock = $(this);
	var hover = 0;

	$thisBlock.click(function() {
			activate(i, true);
	});

	$thisBlock.hover(function(){
		$thisBlock.toggleClass("active").find('.side').toggleClass("sideActive");
		if(!$thisBlock.hasClass("selected")){
			if($thisBlock.parent().is('#wall-top')||$thisBlock.parent().is('#wall-left')){
				hover = -50;
			} else {
				hover = 50;
			}

			$thisBlock.css('-webkit-transform', 'translateZ('+ hover +'px)');
		}
	}, function(){
		$thisBlock.toggleClass("active").find('.side').toggleClass("sideActive");
		if(!$thisBlock.hasClass("selected")){
			hover = 0;
			$thisBlock.css('-webkit-transform', 'translateZ('+ hover +'px)');
		}

	});

});

var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

$(window).resize(function () {
	delay(function(){
		console.log('Resize...');
				initContainer(true);
	}, 100);
});
