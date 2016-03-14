var names = [];

// funcao que coleta os valores informados e preenche um array de nomes
function invertData() {
	var name1 = document.getElementById("name1").value;
	var name2 = document.getElementById("name2").value;
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var name5 = document.getElementById("name5").value;
	
	// valida se TODOS os campos foram preenchidos (não está especificado obrigatoriedade ou não de todos)
	// assumo que a função só vai atuar se TODOS estiverem preenchidos
	if(name1 && name2 && name3 && name4 && name5) {
		names[0] = name1;
		names[1] = name2;
		names[2] = name3;
		names[3] = name4;
		names[4] = name5;
		
		// iteramos no array de trás para frente e exibimos os valores
		for(i = names.length - 1; i >= 0; i--) {
			alert("Posicao " + (i + 1) + ": " + names[i]);
		}
		
	} else {
		alert("Por favor preencha todos os campos.");
	}

}