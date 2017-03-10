
// CONSTANTES
var silencio = "SIL100MS.vox";
var diretorioVox = "../Resources/Prompts/Vox/";
// FIM CONSTANTES

function criaDadosCliente() {
	var ret = {};
	
	ret['profile'] = getIVRProfile();
	ret['ambiente'] = getAmbiente();
	ret['token'] = '';
	
	ret['navegacao'] = '';
	ret['paytrue'] = '';

	ret['attach'] = {};
	//ret['parametros'] = '';
	ret['parametros'] = {
		'SistemaInoperante' : 'N'	
	};
	
	
	return ret;
}

function getANITratado(ani) {
	if (ani != "" && ani != undefined) {
		if (ani.indexOf(":") >= 0) {
			var aux1 = ani.split(":");
			if (aux1[1] != "") {
				if (aux[1].indexOf("@") >= 0) {
					var aux2 = aux1.split("@");
					ani = aux2[0];
				}
			}
		}
	}
	return ani;
}

function ehCPFouCartao(coleta) {
	return (coleta.length == 11 ? 'cpf' : 'cartao');
}

function ehCobranca(dadosCliente) {
	return '';
}

function possuiMaisDeUmCartao(dadosCliente) {
	return '';
}

function transferenciaAtivada(dadosCliente, ponto) {
	return '';
}

function opcaoCreditoPessoalAtivado(dadosCliente, ponto) {
	return '';
}

function getDDD(ani){
	return ani.substring(0,2);
}

function getTelefone(ani){
	return getUltimosCaracteres(ani,9);
}

function getUltimosCaracteres(str, qtd){
	if (str != undefined && str.length > qtd){
		return str.substring(str.length - qtd, str.length);
	}
	return str;
}

function getValorEmDollar(valor) {
	var dezenas = trataValor(valor.substr(0, valor.length - 2));
	var centavos = trataValor(valor.substr(valor.length - 2));
	return ("$" + dezenas + "." + centavos);
}

function getValorEmEuro(valor) {
	var dezenas = trataValor(valor.substr(0, valor.length - 2));
	var centavos = trataValor(valor.substr(valor.length - 2));
	return ("E" + dezenas + "." + centavos);
}

function getValorEmLibra(valor) {
	var dezenas = trataValor(valor.substr(0, valor.length - 2));
	var centavos = trataValor(valor.substr(valor.length - 2));
	return ("L" + dezenas + "." + centavos);
}

function trataValor(valor) {
	if (trim(valor) == "" || isNaN(valor)) {
		return 0;
	}
	return parseInt(valor, 10);
}

function trataFloat(valor) {
	if (trim(valor) == "" || isNaN(valor)) {
		return 0;
	} else {
		valor = valor.replace(/[^\d\.\-]/g, "");
		var str = parseFloat(valor, 10);
		return str;
	}
}

function tiraPonto(str) {
	if (str != undefined && str != null) {
		return str.replace(".","");
	}
	return "";
}

function tiraPontoVirgulaFinal(str) {
	if (str != undefined) {
		if (str.charAt(str.length - 1) == ";") {
			str = str.substring(0,str.length - 1)
		}
	}
	return str;
}

function tiraPontoDoFinal(str) {
	if (str != undefined) {
		if (str.charAt(str.length - 1) == ".") {
			str = str.substring(0,str.length - 1)
		}
	}
	return str;
}

function falaValor(numero) {
	if (numero != undefined && numero != "") {
		numero += "";
		numero = numero.replace(".", "");
		numero = numero.replace(",", "");
		return numero;
	}
	return "0";
}

function completaComZeros(variavel, tamanho) {
	if (variavel == null) {
		variavel = "";
	}
	while (variavel.length < tamanho) {
		variavel = "0" + variavel;
	}
	return variavel;
}

function completaComZerosDireita(variavel, tamanho) {
	if (variavel == null) {
		variavel = "";
	}
	while (variavel.length < tamanho) {
		variavel = variavel + "0";
	}
	return variavel;
}

function completaComEspacos(variavel, tamanho) {
	if (variavel == null) {
		variavel = "";
	}
	while (variavel.length < tamanho) {
		variavel = variavel + " ";
	}
	return variavel;
}

function adicionaDados(objeto, nome, valor) {
	objeto[nome] = valor;
	return objeto;
}

function trim(str) {
	if (str != null && str != undefined) {
		str = str.toString();
		return str.replace(/^\s+|\s+$/g,"");
	}
	return "";
}

function verificaJsonVazio(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}
	return true;
}

function jsonValido(obj) {
	if (obj == null || obj == undefined) return false;
	return true;
}

function jsonValidoArray(jsonValidar, array) {
	if ( ! jsonValido(jsonValidar) || array.length == 0) {
		return false;
	}
	for (var i = 0; i < array.length; i++) {
		if ( ! jsonValido(jsonValidar[array[i]])) {
			return false;
		}
		jsonValidar = jsonValidar[array[i]];
	}
	return true;
}

function getLastUrl() {
	return AppState.LAST_EVENT_URL.substr(AppState.LAST_EVENT_URL.lastIndexOf("/")+1);
}

function getPeriodoSaudacao() {
	var horaAtual = parseInt(formataDataAtual("hh"), 10);
	if (horaAtual >= 0 && horaAtual <= 12) {
		return "DIA";
	} else if (horaAtual <= 18) {
		return "TARDE";
	}
	return "NOITE";
}

function logDebug(str) {
	return JSON.stringify(str);
}

function adicionaNavegacao(dadosCliente, numero) {
	if (dadosCliente != undefined && numero != undefined) {
		dadosCliente['navegacao'] += numero + ';';
	}
	return dadosCliente;
}

// Funcao para adicionar navecao que sera enviada na transacao de seguranca
function adicionaPayTrue(dadosCliente, numero) {
	if (dadosCliente != undefined && numero != undefined) {
		dadosCliente['paytrue'] += numero + ';';
	}
	return dadosCliente;
}

function getURLServico(parametros, servico) {
	var url = parametros['URLServicos'];
	if (url == undefined || url.length == 0) {
		url = "../../_Servicos/src-gen/";
	}
	url += servico + ".vxml";
	return url;
}

/*********************************************************************************************************
AUTORES: DSF/BARS 2014 - v0.0.1
FUNCAO GENERICA PARA OBTER UM VALOR OU UM ARRAY DE VALORES DENTRO DE UM JSON PELO NOME DO CAMPO
EXEMPLO DE USO:
	Estrutura
		var teste = {
				"a" : {
					"b" : [
			       		{"b1" : "valor_1"},
			       		{"b1" : "valor_2"}			       
					],
					"c" : "valor_3"
				}
		};
	Comando:
		Caso 1: "[" + jsonLog(obtemCampo("b1", teste)) + "]"
		Caso 2: "[" + jsonLog(obtemCampo("c", teste)) + "]"
	Saida:
		Caso 1: ["0": "valor_1" "1": "valor_2"]
		Caso 2: ["0": "valor_3"]
**********************************************************************************************************/
function obtemCampo(nomeCampo, retornoTransacao){
	var ret = obtemCampoTransacao(nomeCampo, retornoTransacao);
	if (ret.length === 0){
		ret[0] = retCampoNaoExistenteObtemCampo;
	}
	return ret;
}

function obtemCampoTransacao(nomeCampo, retornoTransacao){
	var retornoCampo = [];
	var temp = [];
	
	for (var tag in retornoTransacao){
		switch (typeof retornoTransacao[tag]){
			case "object":
				if (Object.prototype.toString.call(retornoTransacao[tag]) === '[object Array]'){
					if (tag === nomeCampo){
						temp = retornoTransacao[tag];
					}else{
						temp = obtemCampoTrataArray(nomeCampo, retornoTransacao[tag]);
					}
				}else{
					if (tag === nomeCampo){
						temp[0] = retornoTransacao[tag];					
					}else{
						temp = obtemCampoTransacao(nomeCampo, retornoTransacao[tag]);
					}
				}
				if (temp.length > 0){
					retornoCampo = temp;
				}	
				break;
			default:
				if (tag === nomeCampo){
					retornoCampo.push(retornoTransacao[tag]);
				}
		}
	}
	
	return retornoCampo;
}

function obtemCampoTrataArray(nomeCampo, retornoTransacao){	
	var retornoCampo = [];
	var temp = [];
	
	for (var i=0; i < retornoTransacao.length; i++){
		if (Object.prototype.toString.call(retornoTransacao[i]) === '[object Array]'){
			temp = obtemCampoTrataArray(nomeCampo, retornoTransacao[i]);
		}else{
			temp = obtemCampoTransacao(nomeCampo, retornoTransacao[i]);
		}
		if (temp.length == 1){
			retornoCampo.push(temp[0]);
		}
	}
	
	return retornoCampo;
}
/*********************************************************************************************************
*********************************************************************************************************/