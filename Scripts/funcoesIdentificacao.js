
function isCPF(cpf) {
    var acumulador = 0, numerosIguais = true;
    for (var peso = 10, indice = 0; indice < 9; indice++, peso--) {
        acumulador += peso * cpf[indice];
        if (cpf[indice] != cpf[indice + 1]) {
            numerosIguais = false;
        }
    }
    if (numerosIguais) {
        return false;
    }
    var digito1;
    var resto = acumulador % 11;
    if (resto < 2) {
        digito1 = 0;
    } else {
        digito1 = 11 - resto;
    }
    if (digito1 != cpf[9]) {
        return false;
    }
    acumulador = 0;
    for (peso = 11, indice = 0; indice < 10; indice++, peso--) {
        acumulador += peso * cpf[indice];
    }
    var digito2;
    var resto = acumulador % 11;
    if (resto < 2) {
        digito2 = 0;
    } else {
        digito2 = 11 - resto;
    }
    if (digito2 != cpf[10]) {
        return false;
    }
    return true;
}

function isCNPJ(cnpj) {
	var acumulador = 0, pesos=[6,5,4,3,2,9,8,7,6,5,4,3,2];
	for  (var indice=0; indice < 12; indice++) {
		acumulador += pesos[indice+1] * cnpj[indice];
	}
	var digito1;
	var resto = acumulador % 11;
	if (resto < 2) {
		digito1 = 0;
	} else {
		digito1 = 11 - resto;
	}
	if (digito1 != cnpj[12]) {
		return false;
	}
	acumulador = 0;
	for  (var indice=0; indice < 13; indice++) {
		acumulador += pesos[indice] * cnpj[indice];
	}
	var digito2;
	var resto = acumulador % 11;
	if (resto < 2) {
		digito2 = 0;
	} else {
		digito2 = 11 - resto;
	}
	if (digito2 != cnpj[13]) {
		return false;
	}
	return true;	
}

function validaCartao(ccNumb) {
	//Modulo 10
		var valid 	= "0123456789"
		var len 	= ccNumb.length;
		var bNum 	= true;
		var iCCN 	= ccNumb;
		var sCCN 	= ccNumb.toString();
		var iCCN;
		var iTotal 	= 0;
		var bResult = false;
		var digit;
		var calc;
		var calc2;
		var temp;
			iCCN = sCCN.replace (/^\s+|\s+$/g,'');	// strip spaces
		    //alert(iCCN);
		for (var j=0; j<len; j++) {
		temp = "" + iCCN.substring(j, j+1);
		if (valid.indexOf(temp) == "-1") bNum = false;
		}
		//Not a Number
		if(!bNum){return false;}
		    iCCN = parseInt(iCCN);
			
		if(len == 0){ /* nothing, field is blank */ 
			bResult = false;
		}else{
			if(len >= 15){		//15 or 16 for Amex or V/MC
				for(var i=len;i>0;i--){
				digit = "digit" + i;
				//alert(digit);
				
					calc = parseInt(iCCN) % 10;	//right most digit
					calc = parseInt(calc);
					//alert(calc);
					iTotal += calc;		//parseInt(cardnum.charAt(count))i:\t" + calc.toString() + " x 2 = " + (calc *2) +" : " + calc2 + "\n";
					// commented out below which wrote NONALTERED digit to page for demo only.
					//document.form1.textfield.value += "" + i + ":\t" + calc.toString() + " x 1 = " + calc + "\n";
					
					i--;
				digit = "digit" + i;
				//alert(digit);
				
					iCCN = iCCN / 10; 	// subtracts right most digit from ccNum
					calc = parseInt(iCCN) % 10 ;	// step 1 double every other digit
					 //alert( iCCN + " " + calc);
					 calc2 = calc *2;
					
					switch(calc2){
						case 10: calc2 = 1; break;	//5*2=10 & 1+0 = 1
						case 12: calc2 = 3; break;	//6*2=12 & 1+2 = 3
						case 14: calc2 = 5; break;	//7*2=14 & 1+4 = 5
						case 16: calc2 = 7; break;	//8*2=16 & 1+6 = 7
						case 18: calc2 = 9; break;	//9*2=18 & 1+8 = 9
						default: calc2 = calc2; 		//4*2= 8 &   8 = 8  -same for all lower numbers
					}
					iCCN = iCCN / 10; 	// subtracts right most digit from ccNum
					iTotal += calc2;
					// commented out below which wrote MULTIPLIED digit to page for demo only
					//document.form1.textfield.value += "" + i +":\t" + calc.toString() + " x 2 = " + (calc *2) +" : " + calc2 + "\n";
				}
					// commeneted out SUM below for demo only
					//document.form1.textfield.value += "\t\tSum: " + iTotal + "\n";
				if ((iTotal%10)==0){
					//document.calculator.results.value = "Yes"; 
					bResult = true;
		 		}else{
					//document.calculator.results.value = "No"; 
					bResult = false;
				}
			}else{
				// menor que 15 digitos
				var sum = 0;
				var alt = false;
				var numvar = 0;
				for(var i = ccNumb.length - 1; i >= 0; i--)
				{
					numvar = parseInt(ccNumb.charAt(i));
					if(alt)
					{
						numvar *= 2;
						if(numvar > 9)
						{
							numvar -= 9;
						}
					}
					sum += numvar;
					alt = !alt;
				}
				return sum % 10 == 0;
			}
		}

		return bResult;
}

function trataRetornoIdentificacao(dadosCliente) {
	var statusCartao = dadosCliente;
	var statusParametro = dadosCliente;
	if (statusParametro.indexOf(statusCartao) != -1) {
		return 'blacklist';
	} else if (statusParametro.indexOf(statusCartao) != -1) {
		return 'fraude';
	} else if (ehCPFouCartao(coleta) == cpf) {
		return 'cpf';
	} else if (statusParametro.indexOf(statusCartao) != -1) {
		return 'cobranca';
	} else if (statusParametro.indexOf(statusCartao) != -1) {
		return 'bloqueioCodBarras';
	} else if (statusParametro.indexOf(statusCartao) != -1) {
		return 'bloqueio';
	} else if (statusParametro.indexOf(statusCartao) != -1) {
		return 'prevencaoFraude';
	} else {
		return 'norm';
	}
}
