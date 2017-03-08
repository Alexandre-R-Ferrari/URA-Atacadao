
function setAttachTeste(dadosCliente) {
	var attach = {};
	
	dadosCliente['Attach'] = attach;	

	return dadosCliente;
}

function setAttachEntrada(state, dadosCliente) {
	var attach = {};

	dadosCliente['Attach'] = attach;	

	return dadosCliente;
}

function replaceUndefined(str, valor) {
	var idx = str.indexOf("undefined");
	if (idx > 0) {
		return replaceUndefined(str.substring(0,idx) + valor + str.substring(idx + 9),"");
	}
	return str;
}

function setAttachDataFinal(attach) {
	if (getUltimosCaracteres(attach, 1) == "|") {
		attach = attach.substring(0, attach.length - 1);
	}
	var map = attach.split("|");
	var m;
	for (m in map) {
		var chaveValor = map[m].split(";&;");
		if (chaveValor[1] == "") {
			chaveValor[1] = "null";
		}
		AppState[chaveValor[0]] = chaveValor[1];
	}
	return void 0;
}

function setAttach(dadosCliente, params) {
	var attaches = "";

	attaches += "u_app;&;" + 'Postos' + "|";
	attaches += "u_nav;&;" + tiraPontoVirgulaFinal(dadosCliente['navegacao']) + "|";
	attaches += "u_dest;&;" + completaComZeros(dadosCliente['finalizacao'], 4) + "|";
    
	attaches += "u_canal_entrada;&;" + dadosCliente['dnis'] + "|";
	attaches += "u_opcmenu;&;" + tiraPontoDoFinal(dadosCliente['opcoes']) + "|";
	attaches += "u_der_talker;&;" + 'false' + "|";
	attaches += "u_call_back_elegivel;&;" + 'false' + "|";
	attaches += "u_prioridade;&;" + '0' + "|";
	attaches += "u_sufixo;&;" + "" + "|";
	attaches += "u_banco_parceiro;&;" + "" + "|";
	attaches += "u_status_cred;&;" + "" + "|";
	if (params != undefined && jsonValido(params)) {
		attaches += "u_cod_skill;&;" + params['skill'] + "|";
		attaches += "u_cod_transf;&;" + params['u_cod_transf'] + "|";
		attaches += "u_destino;&;" + params['vdn'] + "|";
	}
	attaches += "u_data_hora_inicial_ura;&;" + dadosCliente['DataHoraInicial'] + "|";
	attaches += "u_data_hora_final_ura;&;" + formataDataAtual("yyyyMMdd-hhmmss") + "|";
	attaches += "u_tipo_consulta;&;" + "" + "|";
	attaches += "protocolo;&;" + dadosCliente.Protocolo + "|";
    
    return replaceUndefined(attaches,"null");
}

function adicionaAttachProtocolo(attaches, dadosCliente) {
	attaches += "protocolo;&;" + dadosCliente.Protocolo + "|";
	return replaceUndefined(attaches,"null");
}

function adicionaAttachPesquisaSat(attaches, dadosCliente) {
	var pesquisa = dadosCliente.PesquisaAtiva ? "S" : "N";
	attaches += "u_pesquisa_ativa;&;" + pesquisa + "|";
	return attaches;
}

function adicionaAttachTransferiu(attaches, dadosCliente) {
	if (dadosCliente["Transferiu"]) {
		attaches += "u_transferiu;&;" + "S" + "|";
	} else {
		attaches += "u_transferiu;&;" + "N" + "|";
	}
	return replaceUndefined(attaches,"");
}
