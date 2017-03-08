
var eventos = {
		'1' : 'Retencao_Anunciador_01',
		'2' : 'Retencao_Anunciador_02',
		
		
		'15' : 'Retencao_Anunciador_15',
}

function getEventoNome(numero) {
	var nomeEvento = eventos[numero];
	if (nomeEvento == undefined || nomeEvento == '') {
		nomeEvento = 'Nao_Definido_' + numero;
	}
	return nomeEvento;
}

function adicionaEventoNavegacao(dadosCliente, numero) {
	if (dadosCliente != undefined && numero != undefined) {
		dadosCliente['navegacao'] += completaComZeros(numero, 4) + ';';
	}
	return dadosCliente;
}

function setEventoFinal(dadosCliente, numero) {
	if (dadosCliente != undefined && numero != undefined) {
		dadosCliente = adicionaEventoNavegacao(dadosCliente, numero);
		dadosCliente['finalizacao'] = numero;
	}
	return dadosCliente;
}
