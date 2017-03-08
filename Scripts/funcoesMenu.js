
function getMenuExemplo(dadosCliente) {
	var ret = {};
	ret['frases'] = '';
	ret['iminicio'] = '9999';
	ret['imnoimput'] = '9999';
	ret['imnomatch'] = '9999';
	ret['maxtentativas'] = '2';
	ret['opcsvalidas'] = '234';
	return ret;
}

function getMenuIntrodutorio(dadosCliente) {
	var ret = {};
	ret['frases'] = '';
	ret['opcoes'] = '';
	ret['tentativas'] = '';
	ret['maxTentativas'] = '';
	return ret;
}

function getServicoMenuIntrodutorio(opc) {
	if (opc.length == 16 || opc.length == 11) {
		opc = 'c';
	}
	var ordemOriginal = '2c34';
	var servico = {
			'2' : 'perdaRoubo',
			'c' : 'cartaoCPF',
			'3' : 'prospect',
			'4' : 'cancelamento'
		};
	return servico[opc];	
}

function getMenuCartoes(dadosCliente) {
	var ret = {};
	return ret;
}

function getMenuAdicionalSemBloqueio(dadosCliente) {
	var ret = {};
	ret['frases'] = 'MSG030.vox;MSG024.vox;MSG196.vox';
	ret['opcoes'] = '270';
	ret['tentativas'] = '';
	ret['maxTentativas'] = '';
	return ret;
}

function getServicoMenuAdicionalSemBloqueio(opc) {

	var ordemOriginal = '270';
	var servico = {
			'2' : 'codigoBarras',
			'7' : 'outrasOpcoes',
			'0' : 'ouvirOpcoesNovamente'
		};
	return servico[opc];	
}

