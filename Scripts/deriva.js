
function setParametrosDerivacao(dadosCliente, destino) {
	var ret = {};
	ret['imderivacao'] = '';
	ret['imforahorario'] = '';
	ret['imdesligaforahorario'] = '';
	ret['ptderivacao'] = '';
	ret['menuatendente'] = false;
	ret['verificahorario'] = false;
	
	switch (destino) {
		case 'identificacaoBlacklist':
			break;
		case 'identificacaoFraude':
			break;
		case 'identificacaoBloqueio':
			break;
		case 'identificacaoPrevencaoFraude':
			break;
		case 'identificacaoErroGenerico':
			break;
		case 'bloqueioCodigoBarrasTransferenciaAtiva':
			break;
		case 'bloqueioCodigoBarrasMaxTentativas':
			ret['menuatendente'] = true;
			ret['verificahorario'] = true;
			ret['imderivacao'] = '1449';
			ret['imforahorario'] = '1038';
			ret['imdesligaforahorario'] = '1447';
			ret['ptderivacao'] = '30';
			break;
		case 'cobrancaNegociacaoValores':
			break;
		case 'cobrancaOutrosAssuntos':
			break;
		case 'cobrancaClienteCobranca':
			break;
		case 'adicionalSemBloqueioOutrasOpcoes':
			break;
		case 'plasticoDesbloqueadoVendaDeSeguroEmprestimoTransferenciaAtiva':
			break;
	}
	return ret;
}

function getIMMenuAtendente(destino) {
	var ret = {};
	switch (destino) {
		case 'bloqueioCodigoBarrasMaxTentativas':
			ret['iminicial'] = '1448';
			ret['imnomatch'] = '1451';
			ret['imnoinput'] = '1450';
			ret['imdesliga'] = '1452';
			break;
		case 'cobrancaClienteCobranca':
			break;
	}
	return ret;
}

function isDentroHorario(dadosCliente) {
	var data = new Date(); 
	var dataHoje = formataDataAtual("ddMM");
	var diaSemana = data.getDay();
	// seg a sabado ex feriados 8 as 21
	var horaAtual = parseInt(formataDataAtual("hhmm"), 10);
	if (diaSemana == 0) {
		return false;
	} else {	
		if (horaAtual < 0800 || horaAtual > 2100) {
			return false;
		}
	}
	return true;
} 
