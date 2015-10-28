
/* Interactions
/////////////////////////////////////////////////////////////// */

var $container, containerWidth, containerHeight, containerRatio, marginHeight, marginWidth;
var $box = $('<div class="box"><div class="side front"></div> <div class="side top"></div> <div class="side right"></div> <div class="side bottom"></div> <div class="side left"></div></div>');
var bpw = 16;

$(document).ready(function() {
	init();
	appendBoxes();
	bindUIactions();
});

function init() {
	$container = $('.container');
	$wall = $container.find('.wall');
}

function appendBoxes() {
	for(i = bpw; i>0; i--) {
		$wall.append($box.clone());
	}
}

function bindUIactions() {
	$(".box").click(function() { activate($(this), true); });
}

function activate($block, clickFlag) {
	var amount = 0;

	$block.toggleClass('selected', !$block.hasClass("selected"));

	// if(!$block.hasClass("selected")) {
	//
	// 	$block.toggleClass('selected', true);
	// 	if(clickFlag) { localStorage.setItem($block.index(), 1); }
	//
	// } else {
	// 	$block
	// 		.css('transform', '')
	// 		.toggleClass('selected', false)
	// 		// .find('.side')
	// 			// .toggleClass('sideSelected', false);
	//
	// 	if(clickFlag) { localStorage.setItem($block.index(), 0); console.log("Block" + $block.index() + "deactivated."); }
	// }

	// console.timeEnd("activate");
}


// function initContainer(refreshFlag) {
// /* 		console.time("init"); */
//
// 	console.log("initContainer called.");
//
// 	containerWidth = window.innerWidth;
// 	containerHeight = window.innerHeight;
// 	containerRatio = containerWidth / containerHeight;
	// marginHeight = Math.round(containerHeight/80);
	// marginWidth = Math.round(containerWidth/80);
// 	$container.css('width', window.innerWidth);
// 	$container.css('height', containerHeight);
//
// 	drawWalls(refreshFlag);
// /* 		console.timeEnd("init"); */
// }


// function drawWalls(refreshFlag) {
// /* 		console.time("drawWalls"); */
// 	console.log("drawWalls called.");
//
	// if(!refreshFlag){loadSaved()};

/* 		console.timeEnd("drawWalls"); */
// }



// // function loadSaved() {
// // /* 		console.time("loadSaved"); */
// // 	console.log("loadSaved called.");
// // 	var blocks = [];
// // 	var status = [];
// // 	var numKeys = localStorage.length;
// // 	for(i=0;i<numKeys;i++) {
// // 			blocks[i]=localStorage.key(i);
// // 			status[i]=localStorage.getItem(blocks[i]);
// // 			if (status[i]=="1") {
// // 			activate(blocks[i]);
// // 			}
// // 	}
// // /* 		console.timeEnd("loadSaved"); */
// // }



// var delay = (function(){
// 	var timer = 0;
// 	return function(callback, ms){
// 		clearTimeout (timer);
// 		timer = setTimeout(callback, ms);
// 	};
// })();
//
// $(window).resize(function () {
// 	delay(function(){
// 		initContainer(true);
// 	}, 100);
// });
