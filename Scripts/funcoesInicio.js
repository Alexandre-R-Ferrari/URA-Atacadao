
function getAnunciador(dadosCliente, codigo) {
	return '';
}

function sistemaInoperante(dadosCliente) {
	if (dadosCliente['parametros']['SistemaInoperante'] == 'S') {
		return true;
	}
	return dadosCliente['token'] == '';
}

function getFraseSaudacao() {
	var periodo = getPeriodoSaudacao();
	switch (periodo) {
		case "DIA":
			return "PHD0002.vox";
			break;
		case "TARDE":
			return "PHD0003.vox";
			break;
		default:
			return "PHD0004.vox";
			break;
	}
}

function isForaHorario(parametros) {
	var feriados = "";
	var horaIniSemSabDom = "0000;0000;0000";
	var horaFimSemSabDom = "2359;2359;2359";
	if (jsonValido(parametros)) {
		if (jsonValido(parametros["Feriados"])) {
			feriados = parametros["Feriados"];
		}
		horaIniSemSabDom = parametros["horaInicialSemSabDom"];
		horaFimSemSabDom = parametros["horaFinalSemSabDom"];
	}
	var data = new Date(); 
	var dataHoje = formataDataAtual("ddMM");
	var diaSemana = data.getDay();
	var ini = horaIniSemSabDom.split(";");
	var fim = horaFimSemSabDom.split(";");
	
	var horaAtual = parseInt(formataDataAtual("hhmm"), 10);
	
	if (feriados.indexOf(dataHoje) >= 0 && (horaAtual < parseInt(ini[2],10) || horaAtual > parseInt(fim[2],10) )) {
		return true;
	}
	
	if (diaSemana == 0 && (horaAtual < parseInt(ini[2],10) || horaAtual > parseInt(fim[2],10) ) ) {
		return true;
	} else {	
		if (diaSemana == 7 && (horaAtual < parseInt(ini[1],10) || horaAtual > parseInt(fim[1],10) ) ) {
			return true;
		} else {
			if (diaSemana >= 1 && diaSemana <= 5 && (horaAtual < parseInt(ini[0],10) || horaAtual > parseInt(fim[0],10) ) ) {
				return true;
			}
		}
	}	
	return false;
}

