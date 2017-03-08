
function trataRetornoServicoAutenticarConsumidorSolicitacao(retorno) {
	var ret = {};
	ret['codRetorno'] = obtemCampo('b:Codigo', retorno)[0];
	ret['sucesso'] = obtemCampo('b:Sucesso', retorno)[0];
	ret['token'] = obtemCampo('a:Token', retorno)[0];
	return ret;
}