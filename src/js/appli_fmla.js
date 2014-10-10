var main_width = 1920;
var main_height = 1080;
var rapport_proportions_1 = 1.9; 
var rapport_proportions_2 = 1.6; 
var currentSlide = 0;

var choosenLanguage = "en";


// Main init

function initMain(){

	console.log("init main");
	window.addEventListener("resize", resize_window);
	//init_ecran_home();
	get_json();
	init_ecran_area();
	$('#fiche_container').css("display","none");
	$("#fiche_produit_bg").css("display","none");
	resize_window();
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

	// insertion in swiper_area_container
	var area_html = "";
	for (var i = 0;  i <= JsonArray.areas.length - 1; i++) {
		console.log(JsonArray.areas[i].title);
		area_html = "";
		area_html += '<div class="swiper-slide area_slide"> ';
		area_html += 	'<section class="bannier_txt">';
		area_html += 	'<h1>'+JsonArray.areas[i].title+'</h1>';
		area_html += 	'<h2>'+JsonArray.areas[i].subtitle+'</h2>';
		area_html += 	'</section>';
		area_html += 	'<div class="swipper_middle">';
			// puces
			for (var j = 0;  j <= JsonArray.areas[i].items.length - 1; j++) {
			area_html += 		'<a href="#" ficheId="'+JsonArray.areas[i].items[j].fiche_file+'" style="left:'+JsonArray.areas[i].items[j].puce_x+'%; top:'+JsonArray.areas[i].items[j].puce_y+'%"><span>'+JsonArray.areas[i].items[j].puce_name+'</span></a>';
			}
		area_html += 		'<img src="img/area'+JsonArray.areas[i].area_num+'.png">';
		area_html += 	'</div>';
 		area_html += '</div>';
 		document.getElementById('swiper_area_container').innerHTML += area_html;
	};
	// resize containers
	resize_window();

	// init swiper
	init_swipper();
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



function init_ecran_home(){

	show_ecran("ecran_home");
	console.log("init_home");
	$(".home_area").click(function(){
		currentSlide = $(this).attr("slideToShow") ;
		init_ecran_area();
	});
	$("header").click(function(){ init_ecran_home(); 	});
}

function init_ecran_area(){

	show_ecran("ecran_areas");
	// nav 
	$(".bt_home").click(function(){ init_ecran_home(); 	});
}



function init_swipper(){

	var contentSwiper = $('.swiper-container').swiper({
	    // options here:
	    mode:'horizontal',
	    grabCursor:'true',
	    speed:750, 
	    //etc..
	    onSlideChangeStart: function(){
			$('#swiper_nav .swiper_link_active').removeClass('swiper_link_active');
			$('#swiper_nav .swiper_link').eq(contentSwiper.activeIndex).addClass('swiper_link_active');
			area_out_fx();
		},
		onSlideChangeEnd: function(){
			area_in_fx();
		}

	  });
	// play In_fx
	area_in_fx();
	// config links in the footer
	$('#swiper_nav .swiper_link').click(function(){  contentSwiper.swipeTo( $(this).index() );  });



}



function area_in_fx(){
	// show and config click of puces
	$(".swiper-slide-active a").addClass('area_slide_a_active');
	$(".swiper-slide-active a.area_slide_a_active").click(function(){ showFiche($(this).attr("ficheId")); 	});
}
function area_out_fx(){
	// out fx of area
	$(".area_slide a.area_slide_a_active").removeClass('area_slide_a_active');
}
function showFiche(ficheToShow){

	document.getElementById('fiche_produit').innerHTML = '<img src="img/'+choosenLanguage+'/'+ficheToShow+'_fiche.png">';
	$('#fiche_container').fadeIn();
	$('#fiche_produit_bg').fadeIn();
	$('#fiche_produit_bg').click(function(){  hideFiche(); });
	//TweenLite.to("#prop_a", 1.5, {delay:2, opacity:"1", ease:Power2.easeOut});
	resize_window();
}

function hideFiche(ficheToShow){

	$('#fiche_container').fadeOut();
	$('#fiche_produit_bg').fadeOut();
}






// resize
function resize_window(){

	$("#home_middle").css("width",  Math.round( $("#home_middle" ).height()*rapport_proportions_1)+"px"  );
	$(".swipper_middle").css("width",  Math.round( $(".swipper_middle" ).height()*rapport_proportions_2)+"px"  );
	$("#fiche_produit").css("width",  Math.round( $("#fiche_produit").height()*2 )+"px"  );
	$("#fiche_container").css("width",  Math.round( $("#fiche_produit").height()*2 )+"px"  );

}


$( document ).ready(function() {

	initMain();
});



