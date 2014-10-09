var main_width = 1920;
var main_height = 1080;
var rapport_proportions_1 = 1.9; 
var currentSlide = 0;

var choosenLanguage = "en";


// Main init

function initMain(){

	console.log("init main");
	resize_window();
	window.addEventListener("resize", resize_window);
	show_ecran_home();
	//get_json();
}


// data porcess

function get_json(){

	/* get Json depending choosen language */

	var urlJson = "json/fmla_"+choosenLanguage+".json";
	$.getJSON(urlJson, function(data) {
		useJsonDatas(data);
	});
}

function useJsonDatas(arr) {
	JsonArray = arr;
	alert(JsonArray.language)
	//area_container
}



// Screen switch

function show_ecran(id){

	$("#ecran_home").css("display","none");
	$("#ecran_areas").css("display","none");

	switch(id){
		case "ecran_home":
			$("#ecran_home").fadeIn();
			break;
		case "ecran_areas":
			$("#ecran_areas").fadeIn();
	}
	resize_window();
}



function show_ecran_home(){

	show_ecran("ecran_home");
	console.log("init_home");
	$(".home_area").click(function(){
		currentSlide = $(this).attr("slideToShow") ;
		show_ecran_area();
	});
	$("header").click(function(){ show_ecran_home(); 	});
}

function show_ecran_area(){

	show_ecran("ecran_areas");
	// init swiper
	init_swipper();

	// nav 
	$(".bt_home").click(function(){ show_ecran_home(); 	});

	// config puces
	$("#ecran_areas .area a").click(function(){ showFiche($(this).attr("ficheId")); 	});
}



function init_swipper(){

	alert("init swipper");
	var contentSwiper = $('.swiper-container').swiper({
	    // options here:
	    mode:'horizontal',
	    //etc..
	    onSlideChangeStart: function(){
	    	updateNavPosition();
	    	area_out_fx();
		},
		onSlideChangeEnd: function(){
	    	area_in_fx();
		}

	  });

	//Update Nav Position
	function updateNavPosition(){
		$('#swiper_nav .swiper_link_active').removeClass('swiper_link_active');
		$('#swiper_nav .swiper_link').eq(contentSwiper.activeIndex).addClass('swiper_link_active');
	}

	//Nav
	$('#swiper_nav .swiper_link').click(function(){  contentSwiper.swipeTo( $(this).index() );  });

}


function area_out_fx(){

	$(".area_slide a.area_slide_a_active").removeClass('area_slide_a_active');
}


function area_in_fx(){

	$(".swiper-slide-active a").addClass('area_slide_a_active');
}


function showFiche(ficheToShow){

	alert(ficheToShow);
}


// resize
function resize_window(){

	$("#home_middle").css("width",  Math.round( $("#home_middle" ).height()*rapport_proportions_1)+"px"  );
	$(".swipper_middle").css("width",  Math.round( $(".swipper_middle" ).height()*rapport_proportions_1)+"px"  );

}


$( document ).ready(function() {

	initMain();
});



