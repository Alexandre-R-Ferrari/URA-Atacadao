var formatos = {
		"dd" : function(data) {
				var dia = data.getDate();
				return dia < 10 ? "0" + dia : dia;
		},
		"MM" : function(data) {
			var mes = data.getMonth() + 1;
			return mes < 10 ? "0" + mes : mes;
		},
		"yyyy" : function(data) {
			return data.getFullYear();
		},
		"yy" : function(data) {
			return data.getFullYear().toString().substring(2,4);
		},		
		"hh" : function(data) {
			var h = data.getHours();
			return h < 10 ? "0" + h : h;
		},
		"mm" : function(data) {
			var m = data.getMinutes();
			return m < 10 ? "0" + m : m;
		},
		"ss" : function(data) {
			var s = data.getSeconds();
			return s < 10 ? "0" + s : s;
		},
		"ms" : function(data) {
			var ms = data.getMilliseconds();
			return ms < 100 ? (ms < 10 ? "00" + ms : "0" + ms) : ms;
		}
};

var cDiasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

function formataDataAtual(formato) {
	return formataData(new Date(), formato);
}
function formataData(data, formato) {
	if (formato == null || formato.length == 0) {
		return "";
	}

	var retorno = "";
	var letra = formato.charAt(0);
	var palavra = letra;

	for (var i=1; i<formato.length; i++) {
		var proximaLetra = formato.charAt(i);
		if (letra == proximaLetra) {
			palavra += proximaLetra;
		} else {
			if (formatos[palavra] == undefined) {
				retorno += palavra;
			} else {
				retorno += formatos[palavra](data);
			}				
			letra = proximaLetra;
			palavra = letra;					
		}
	}
	if (formatos[palavra] == undefined) {
		retorno += palavra;
	} else {
		retorno += formatos[palavra](data);
	}
			
	return retorno;	
}

/**
 * Funcao getDateFromString(dt)
 * 
 * Formato: retorna data de entrada no formato String DDMMAA ou DDMMAAAA em Date.
 * @param dt
 * @returns {Date}
 *
 **/
function getDateFromString(dt) {

    var dia = dt.substr(0, 2);
	var mes = dt.substr(2, 2);
	var ano = dt.substr(4);

	mes = parseInt(mes, 10) - 1;

	if (ano.length == 2) {
		ano = "20" + ano;
	}

	var data = new Date(ano, mes, dia);
	return data;
}

function getDateFromStringInternational(dt) {

    var dia = 0;
	var mes = 0;
	var ano = 0;

	if (dt.length == 6) {
		dia = dt.substr(4);
		mes = dt.substr(2, 2);
		ano = "20" + dt.substr(0, 2);
	} else {
		dia = dt.substr(6);
		mes = dt.substr(4, 2);
		ano = dt.substr(0, 4);
	}
	
	mes = parseInt(mes,10) - 1;
	var data = new Date(ano, mes, dia);
	return data;
}

/**
 * Funcao validaData(dt)
 * 
 * Formato: retorna verdadeiro se data de entrada no formato DDMMAA eh valida.
 * @param dt
 * @returns {Boolean}
 *
 **/
function validaData(dt) {

	if(dt == null || dt == undefined || dt.length != 6) {
		return false;
	}

    var dia = dt.substr(0, 2);
	var mes = dt.substr(2, 2);
	var ano = dt.substr(4, 2);

	var flg = false;

	if((Math.abs(ano) > 00) || (Math.abs(ano) <= 99)) {
        switch(mes) {
        case "01":
        case "03":
        case "05":
        case "07":
        case "08":
        case "10":
        case "12":
        	flg = Math.abs(dia) <= 31;
            break;

        case "04":      
        case "06":
        case "09":
        case "11":
        	flg = Math.abs(dia) <= 30;
            break;
        case "02":
            if((Math.abs(ano) % 4 == 0) || (Math.abs(ano) % 100 == 0) || (Math.abs(ano) % 400 == 0)) {
            	flg = Math.abs(dia) <= 29;
            } else {
            	flg = Math.abs(dia) <= 28;
            }
            break;
        }
    }

    return flg;

}

/**
 * Funcao diferencaDias(dt)
 * 
 * Formato: retorna diferenca de dias entre a data atual e a data de entrada ou -1 se a data de entrada eh menor que data atual.
 * @param dt
 * @returns {Boolean}
 *
 **/
function diferencaDias(dt, formato) {

	var hoje = new Date();
	var xhoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(),0,0,0);
	var dataX;
	// formato: 1 - nacional, 2 - internacional
	if (formato == 2) {
		dataX = getDateFromStringInternational(dt);
	} else {
		dataX = getDateFromString(dt);
	}

	var dif = Date.UTC(dataX.getYear(), dataX.getMonth(), dataX.getDate(),0,0,0) - 
        	  Date.UTC(xhoje.getYear(), xhoje.getMonth(), xhoje.getDate(),0,0,0);

    	return (dif / 1000 / 60 / 60 / 24);

}

function somaDiasDataAtual(dias) {
	var data = new Date();
	data.setDate(data.getDate() + dias);
	return data;
}

//verifica se a data (ddmmyy ou ddmmyyyy) é valida (retorna true ou false)
function validaData2(dt) {

    var dia = dt.substr(0, 2);
	var mes = dt.substr(2, 2);
	var ano = dt.substr(4);

	mes = parseInt(mes,10) - 1;

	if (ano.length == 2) {
		ano = "20" + ano;
	}

	var data = new Date(ano, mes, dia);
		
	if (data.getFullYear()==parseInt(ano) && data.getMonth()==parseInt(mes) && data.getDate()==dia) {
		return true;
	} else {
		return false;
	}
}

//retorna a differencia em dias entre duas datas (negativo se a primeira data é menor que a segunda, positivo o contrario)
function diferencaEntreDatas(dt1, dt2) {
	var dia1 = dt1.substr(0, 2);
	var mes1 = dt1.substr(2, 2);
	var ano1 = dt1.substr(4);

	mes1 = parseInt(mes1,10) - 1;

	if (ano1.length == 2) {
		ano1 = "20" + ano1;
	}

	var data1 = new Date(ano1, mes1, dia1);

	var dia2 = dt2.substr(0, 2);
	var mes2 = dt2.substr(2, 2);
	var ano2 = dt2.substr(4);

	mes2 = parseInt(mes2,10) - 1;

	if (ano2.length == 2) {
		ano2 = "20" + ano2;
	}

	var data2 = new Date(ano2, mes2, dia2);	
	
	var one_day=86400000;
	return Math.round((data1-data2)/one_day);
}

function trataData(str) {
	if (str == "" || str == undefined) {
		return "00000000";
	}
    var dia = "";
	var mes = "";
	var ano = "";
	str = str.replace("-", "").replace(" ", "");
    dia = str.substring(0, 2);
	mes = str.substring(2, 4);
	ano = str.substring(4, 8);
	return dia + mes + ano;
}

function trataDataInternacional(str) {
	if (str == "" || str == undefined) {
		return "00000000";
	}
    var dia = "";
	var mes = "";
	var ano = "";
	str = str.replace("-", "").replace(" ", "");
    dia = str.substring(6, 8);
	mes = str.substring(4, 6);
	ano = str.substring(0, 4);
	return dia + mes + ano;
}

function getTempoChamada(horarioInicial) {
	var ano1 = horarioInicial.substring(0,4);
	var mes1 = horarioInicial.substring(4,6);
	var dia1 = horarioInicial.substring(6,8);
	var hora1 = horarioInicial.substring(8,10);
	var min1 = horarioInicial.substring(10,12);
	var seg1 = horarioInicial.substring(12,14);

	mes1 = parseInt(mes1,10) - 1;

	var data1 = new Date(ano1, mes1, dia1, hora1, min1, seg1);	
	
	var horarioFinal = formataDataAtual("yyyyMMddhhmmss");
	var ano2 = horarioFinal.substring(0,4);
	var mes2 = horarioFinal.substring(4,6);
	var dia2 = horarioFinal.substring(6,8);
	var hora2 = horarioFinal.substring(8,10);
	var min2 = horarioFinal.substring(10,12);
	var seg2 = horarioFinal.substring(12,14);

	mes2 = parseInt(mes2,10) - 1;

	var data2 = new Date(ano2, mes2, dia2, hora2, min2, seg2);	
	
	return (data2 - data1) / 1000;
}

