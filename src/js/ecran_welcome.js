// WELCOME SCREEN ////////////////////////////////////////////////////////////////////////////////////////////

var obj_ecran_welcome = function(){

	this.init=function(){

		console.log('obj_ecran_welcome.init()');
		var welcome_item = document.querySelectorAll('#ecran_welcome img');
		for (var i = 0; i < welcome_item.length; i++) {
			welcome_item[i].style.opacity = 1;
		}	
		welcome_config();
	};

	function welcome_config(){

		$('.bt_welcome').click(function() {
			
			// au click sur bienvenue, on récupère la langue choisie
			choosenLanguage = $(this).attr("language");			
			setTimeout(function () { oo_ecran_intro.start();}, 500);
			// fade Out et Appel de la fonction OnEnd
			TweenLite.fromTo("#ecran_welcome", 0.5, { opacity:"1" },{ opacity:"0" , onComplete: function(){
					document.getElementById('ecran_welcome').innerHTML = "";
					ecran_welcome_end(); 
					
				}
			});
		});
	}
};