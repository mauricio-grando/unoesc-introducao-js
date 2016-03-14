function mergeStrings() {
	// pega os valores dos campos
	var name1 = document.getElementById("name1").value;
	var name2 = document.getElementById("name2").value;
	
	// caso as palavras tenham tamanhos diferentes, ficará ruim o processo de intercalar
	if(name1 == "" || name2 == "") {
		alert("Por favor informe dois nomes.");
	}
	else if(name1.length != name2.length) {
		alert("Para poder intercalar corretamente, informe palavras de mesmo tamanho.");
		
	} else {
		// poderíamos não declarar arrays, por termos variáveis não tipadas
		// todavia, para fins de exercício vamos deixar de forma elegante e atribuir corretamente
		var array1 = [];
		var array2 = [];

		// percorre cada string deixando um array de chars
		array1 = name1.split('');
		array2 = name2.split('');
		
		var result = '';
		for(i = 0; i < array1.length; i++) {
			result += array1[i];
			result += array2[i];
		}
		
		document.getElementById("result").value = result;
	
	}
}