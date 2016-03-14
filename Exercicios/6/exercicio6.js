// desabilita edição dos campos que não serão informados
function hiddenFields(div, op) {
	document.getElementById("addressData").style.display = "none";
	document.getElementById("cepData").style.display = "none";
	document.getElementById("intervalData").style.display = "none";
	document.getElementById(div).style.display = "block";
		
	// seta a operação a ser realizada
	document.getElementById("op").value = op;			
}

var xhr = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();

// processa a resposta da requisição de cep
function processCep() {
	if(xhr.status == 200 && xhr.readyState == 4) {
		
		var json = xhr.responseText;
    	var result = JSON.parse(json);
		var erro = result.erro;

		// se tem erros, alerta o usuário
		if(erro == true) {
			document.getElementById("addressResult").innerHTML = "<b>Endereço não encontrado para o cep informado.</b>";

		} else {
			document.getElementById("addressResult").innerHTML = "";
			document.getElementById("addressIntervalResult1").innerHTML = "";
			document.getElementById("addressIntervalResult2").innerHTML = "";
			
			var p = document.createElement("P");
			for (var key in result) {
				var t = document.createTextNode(result[key] + "\n");
				p.appendChild(t);
				document.getElementById("addressResult").appendChild(p);
			}
		}
    }
}

// processa a resposta da requisição de endereços
function processAddress() {
	if(xhr.status == 200 && xhr.readyState == 4) {
		
		var json = xhr.responseText;
    	var result = JSON.parse(json);
		var erro = result.erro;
		
		if(erro == true) {
			document.getElementById("addressResult").innerHTML = "<b>CEP não encontrado.</b>";

		} else {
			document.getElementById("addressResult").innerHTML = "";
			document.getElementById("addressIntervalResult1").innerHTML = "";
			document.getElementById("addressIntervalResult2").innerHTML = "";
			
			for (var key in result) {
				var p = document.createElement("P");
				var cep = document.createTextNode(result[key].cep + "\n");
				var logradouro = document.createTextNode(result[key].logradouro + "\n");
				var complemento = document.createTextNode(result[key].complemento + "\n");
				var bairro = document.createTextNode(result[key].bairro + "\n");
				var localidade = document.createTextNode(result[key].localidade + "\n");
				var uf = document.createTextNode(result[key].uf + "\n");
				var ibge = document.createTextNode(result[key].ibge + "\n");
				p.appendChild(cep);
				p.appendChild(logradouro);
				p.appendChild(complemento);
				p.appendChild(bairro);
				p.appendChild(localidade);
				p.appendChild(uf);
				p.appendChild(ibge);
				document.getElementById("addressResult").appendChild(p);
			}
		}
    }
}

// processa a resposta do intervalo de ceps
function processCepInterval() {
	if(xhr2.status == 200 && xhr2.readyState == 4 && xhr.status == 200 && xhr.readyState == 4) {
		document.getElementById("addressResult").innerHTML = "";
		document.getElementById("addressIntervalResult1").innerHTML = "";
		document.getElementById("addressIntervalResult2").innerHTML = "";
		
		var json1 = xhr.responseText;
    	var result1 = JSON.parse(json1);
		var erro1 = result1.erro;
		
		var json2 = xhr2.responseText;
    	var result2 = JSON.parse(json2);
		var erro2 = result2.erro;

		// se tem erros, alerta o usuário
		if(erro1 == true || erro2 == true) {
			document.getElementById("addressResult").innerHTML = "<b>Não foram encontrados resultados para o intervalo informado.</b>";

		} else {
			
			var p = document.createElement("P");
			for (var key in result1) {
				var t = document.createTextNode(result1[key] + "\n");
				p.appendChild(t);
				document.getElementById("addressIntervalResult1").appendChild(p);
			}
			
			var p = document.createElement("P");
			for (var key in result2) {
				var t = document.createTextNode(result2[key] + "\n");
				p.appendChild(t);
				document.getElementById("addressIntervalResult1").appendChild(p);
			}
			
		}
    }
}

// submita informações para retornar os dados da viacep.com.br (sempre em json)
function submitCEP() {
	var op = document.getElementById("op").value;
	
	// valida qual operação será executada (consulta por cep, por endereço ou intervalo de ceps)
	if(op == "cep") {
		var cep = document.getElementById("cepIpt").value;

		// pattern para remoção de caracteres inválidos
		cep = cep.replace(/\D/g, '');

		// caso tenha sido informado um cep diferente 8 dígitos, retorna mensagem
		if(cep.length != 8 || cep == "") {
			alert("Por favor informe um cep com 8 dígitos.");

		} else {
			var url = "//viacep.com.br/ws/" + cep + "/json/";

			// setando a função de processamento
			xhr.onreadystatechange = processCep;

			xhr.open("get", url);
			xhr.send(); // faz a requisição

		}
	} else if(op == "address") {
		var street = document.getElementById("street").value;
		var city = document.getElementById("city").value;
		var state = document.getElementById("state").value;
		
		if(city == "" || street == "" || state == "") {
			alert("Por favor informe todos os campos.");

		} else {
			var url = "//viacep.com.br/ws/" + state + "/" + city + "/" + street + "/json/";
			
			// setando a função de processamento
			xhr.onreadystatechange = processAddress;

			xhr.open("get", url);
			xhr.send(); // faz a requisição
		}
	} else if (op == "interval") {
		var cepIni = document.getElementById("cepIni").value;
		var cepFinal = document.getElementById("cepFinal").value;
		
		if(cepIni == "" || cepFinal == "") {
			alert("Por favor informe o cep inicial e final.");

		} else {
			cepIni = cepIni.replace(/\D/g, '');
			cepFinal = cepFinal.replace(/\D/g, '');
			
			if(cepIni.length != 8 || cepFinal.length != 8) {
				alert("Por favor informe cep de 8 dígitos.");
				
			} else {
				var urlIni = "//viacep.com.br/ws/" + cepIni + "/json/";
				var urlFinal = "//viacep.com.br/ws/" + cepFinal + "/json/";
				
				//var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = processCepInterval;
				xhr.open('get', urlIni);
				xhr.send();
					
				xhr2 = new XMLHttpRequest();
				xhr2.onreadystatechange = processCepInterval;
				xhr2.open('get', urlFinal);
				xhr2.send();
			}
				
		}
	}
}