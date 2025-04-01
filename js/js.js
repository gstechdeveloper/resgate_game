var podeAtirar=true;
	

function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador'></div>");
	$("#fundoGame").append("<div id='inimigo1'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo'></div>");

    $("#jogador").addClass("anima1")
    $("#inimigo1").addClass("anima1")
    $("#amigo").addClass("anima3")

    var jogo = {}
    
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
        }
    
    jogo.pressionou = [];
    
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {
       
        
        movefundo();
        //Verifica se o usuário pressionou alguma tecla	
	
	    $(document).keydown(function(e){
            jogo.pressionou[e.which] = true;
        });
    
    
        $(document).keyup(function(e){
           jogo.pressionou[e.which] = false;
        });


        movejogador(jogo,TECLA);
        moveinimigo1(velocidade,posicaoY);
        moveinimigo2();
        moveamigo();
        colisao();
	
	}

}

function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1);
	
} // fim da função movefundo()

function colisao() {
	var colisao1 = ($("#jogador").collision($("#inimigo1")));
	// jogador com o inimigo1

	console.log(colisao1);

}

function movejogador(jogo, TECLA) {
    
	
	if (jogo.pressionou[TECLA.W]) {
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo-10);
	
	}
	
	if (jogo.pressionou[TECLA.S]) {
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);	
	}
	
	if (jogo.pressionou[TECLA.D]) {
        disparo();	
	}

    if (topo<=0) {
		
        $("#jogador").css("top",topo+10);
    }

    if (topo>=434) {	
        $("#jogador").css("top",topo-10);
            
    }

} // fim da função movejogador()

function moveinimigo1(velocidade,posicaoY) {

	posicaoX = parseInt($("#inimigo1").css("left"));
	$("#inimigo1").css("left",posicaoX-velocidade);
	$("#inimigo1").css("top",posicaoY);
		
		if (posicaoX<=0) {
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);
			
		}
}

function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
$("#inimigo2").css("left",posicaoX-3);
            
    if (posicaoX<=0) {
        
    $("#inimigo2").css("left",775);
                
    }
}

function moveamigo() {
	
	posicaoX = parseInt($("#amigo").css("left"));
	$("#amigo").css("left",posicaoX+1);
				
		if (posicaoX>906) {
			
		$("#amigo").css("left",0);
					
		}

} 

function disparo() {
	
	if (podeAtirar==true) {
		
	podeAtirar=false;
	
	topo = parseInt($("#jogador").css("top"))
	posicaoX= parseInt($("#jogador").css("left"))
	tiroX = posicaoX + 190;
	topoTiro=topo+37;
	$("#fundoGame").append("<div id='disparo'></div");
	$("#disparo").css("top",topoTiro);
	$("#disparo").css("left",tiroX);
	
	var tempoDisparo=window.setInterval(executaDisparo, 30);
	
	} //Fecha podeAtirar
 
   	    function executaDisparo() {
	    posicaoX = parseInt($("#disparo").css("left"));
	    $("#disparo").css("left",posicaoX+15); 

        		if (posicaoX>900) {
						
			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			podeAtirar=true;
					
                   }
	} // Fecha executaDisparo()
} // Fecha disparo()


