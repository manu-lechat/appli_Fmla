var main_width = 1920;
var main_height = 1080;
var rapport_proportions_1 = 1.9; 
var rapport_proportions_2 = 1.6; 
var currentSlide = 0;
var currentStep = 0;
var choosenLanguage = "en";
var contentSwiper;
var myTween;
// Main init

function initMain(){

	console.log("init main");
	resize_window();
	doNextStep();
	//window.addEventListener("resize", resize_window);
	//init_ecran_home();
	//get_json();
	//init_ecran_area();

}


function doNextStep(){

	currentStep++;
	console.log("Doing Step "+currentStep);

	switch(currentStep){
		case 1: 	 
			// clear screen
			//show_ecran("none");
			doNextStep();
		break;	
		case 2: 			
			get_json();		// get datas
		break;	
		case 3:
			init_areas();	 		// init_areas -> called one Time	
		break;	
		case 4: 	
			init_home();	// init home -> called one Time
		break;	
		case 5: 		
			$("#ecran_loader").fadeOut(1000);
			affiche_home();	 // affiche home -> called sev Time
		break;
	}
}


// Step 2 ////////////////////////////////////////////////////////////////////////////////////////////


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
	doNextStep();

}


// Step 3 ////////////////////////////////////////////////////////////////////////////////////////////



function init_areas(){


	console.log('funcion init_areas');
	// config links in the footer
	$('#swiper_nav .swiper_link').click(function(){ contentSwiper.swipeTo( $(this).index(), 0); area_in_fx();  });
	$(".bt_home").click(function(){ affiche_home(); 	});

	 // init_swipper
	contentSwiper = $('.swiper-container').swiper({
	    // options here:
	    mode:'horizontal',
	    grabCursor:'true',
	    speed:750, 
	    onSlideChangeStart: function(){
	    	area_out_fx();
		},
		onSlideChangeEnd: function(){
			area_in_fx();
		}
	  });
	// show current puces
	area_in_fx();
	// next 
	doNextStep();
}


function show_area(idSlide){

	show_ecran("ecran_areas");
	$("#ecran_areas .area_slide").css("display","block");

	//contentSwiper.reInit();
	contentSwiper.resizeFix();
	contentSwiper.swipeTo(idSlide,0);
}


function area_in_fx(){

	console.log("area_in_fx");

	// puces
	 $(".swiper-slide-active a").click(function(){ showFiche($(this).attr("ficheId")); 	});
	 $(".swiper-slide-active a").each(function() {
	 	var myTween = new TweenLite.fromTo(this, 1, {  opacity:"0"},{ delay:Math.random(),  opacity:"1"});
	 	});


}

function area_out_fx(){

	console.log("area_out_fx");

	// puces	
	$(".swiper-slide-active a").css("opacity","0");
	
	// footer links
	$('#swiper_nav .swiper_link_active').removeClass('swiper_link_active');
	$('#swiper_nav .swiper_link').eq(contentSwiper.activeIndex).addClass('swiper_link_active');

}

// Step 4 ////////////////////////////////////////////////////////////////////////////////////////////


function init_home(){

	console.log("function init_home");
	$("header").click(function(){ init_ecran_home(); 	});
	$(".showSlide").click(function(){ 	show_area( $(this).attr("slideToShow")) ; }); // calling show_area()
	doNextStep();
}

function affiche_home(){

	show_ecran("ecran_home");		
	console.log("function affiche_home");
	// fx apparition des zones clicables   
	TweenLite.fromTo("#home_a1", 1.8,  { opacity:"0" },{delay:0.5, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a2", 1.8,  { opacity:"0" },{delay:0.6, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a3", 1.8,  { opacity:"0" },{delay:0.7, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a4", 1.8,  { opacity:"0" },{delay:0.8, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a5", 1.8,  { opacity:"0" },{delay:0.9,   opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a6", 1.8,  { opacity:"0" },{delay:1, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a7", 1.8,  { opacity:"0" },{delay:1.1, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a8", 1.8,  { opacity:"0" },{delay:1.2, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a9", 1.8,  { opacity:"0" },{delay:1.3, opacity:"1", ease:Power2.easeOut});
	TweenLite.fromTo("#home_a10", 1.8, { opacity:"0" },{delay:1.4,  opacity:"1", ease:Power2.easeOut});
	
}

// config swiper sphere ////////////////////////////////////////////////////////////////////////////////////////////




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


// Screen switch
function show_ecran(id){

	console.log('show_ecran : '+id);
	switch(id){
		case "ecran_home": 			 		
			$('#ecran_home').fadeIn();
			$('#fiche_container').css("display","none");
			$("#fiche_produit_bg").css("display","none");
			$("#ecran_areas").css("display","none");	
		break;
		case "ecran_areas": 
			$('#ecran_areas').fadeIn();
			$('#ecran_home').css("display","none");
			$('#fiche_container').css("display","none");
			$("#fiche_produit_bg").css("display","none");
		break;
	}		
}

// resize
function resize_window(){

	console.log("resize_window");

	$("#home_middle").css("width",  Math.round( $("#home_middle" ).height()*1.4)+"px"  );

	$(".swipper_middle").each(function() {
	 	$(this).css("width", "100px" );
	});
	
	$("#fiche_produit").css("width",  Math.round( $("#fiche_produit").height()*2 )+"px"  );
	$("#fiche_container").css("width",  Math.round( $("#fiche_produit").height()*2 )+"px"  );
	$("#ecran_home #home_middle a.resize").css("width",  Math.round( $("#ecran_home #home_middle a").height()*1.6 )+"px"  );

}


// init
$( document ).ready(function() { 	initMain(); });



