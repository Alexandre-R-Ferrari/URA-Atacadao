function getParametrosURL() {
	return "http://";
}

function logIVRProfile() {
	var sip = session.connection.protocol.sip;
	var headers = sip.headers;
	if (jsonValido(headers) && headers["qsw-ivr-profile-name"] != undefined) {
		return "GSW_IVR_PROFILE=" + headers["qsw-ivr-profile-name"];
	} else {
		var requesturi = sip.requesturi;
		if (jsonValido(requesturi)) {
			return "RequesrUri=" + requesturi["gvp-tenant-id"];
		}
	}
	return "";
}

function getIVRProfile() {
	var profile = "";
	var sip = session.connection.protocol.sip;
	var headers = sip.headers;
	if (jsonValido(headers) && headers["qsw-ivr-profile-name"] != undefined) {
		profile = headers["qsw-ivr-profile-name"];
	} else {
		var requesturi = sip.requesturi;
		if (jsonValido(requesturi)) {
			profile = requesturi["gvp-tenant-id"];
		}
	}
	var i = profile.indexOf(".") + 1;
	if (i > 0) {
		return profile.substring(i);
	}
	return profile;
}

function logAmbiente() {
	var sip = session.connection.protocol.sip;
	var headers = sip.headers;
	if (jsonValido(headers) && headers["RequestURI"] != undefined) {
		return "RequestURI=" + headers["RequestURI"];
	} else {
		var requesturi = sip.requesturi;
		if (jsonValido(requesturi)) {
			return "voicexml=" + requesturi["voicexml"];
		}
	}
	return "";
}

function getAmbiente() {
	var uri = "";
	var sip = session.connection.protocol.sip;
	var headers = sip.headers;
	if (jsonValido(headers) && headers["RequestURI"] != undefined) {
		uri = headers["RequestURI"];
	} else {
		var requesturi = sip.requesturi;
		if (jsonValido(requesturi)) {
			uri = requesturi["voicexml"];
		}
	}
	uri = uri.toLowerCase();
	var stringInicio = "://vvcewdur";
	var stringFim = "";
	var i = uri.indexOf(stringInicio);
	var f = uri.indexOf(stringFim);
	if (i == -1 || f == -1 || f < i) {
		if (uri.indexOf("251.18") != -1) {
			return "desenvolvimento";
		} else if (uri.indexOf("251.31") != -1 || uri.indexOf("vvcewdurdes05") != -1 || uri.indexOf("251.28") != -1 || uri.indexOf("vvcewdurdes04") != -1) {
			return "homologacao";
		}
		return "producao";
	}
	var ambiente = uri.substring(i + stringInicio.length, f);
	switch (ambiente) {
		case "prd":
			return "producao";
		case "des":
			return "homologacao";
		case "lab":
			return "desenvolvimento";
		default:
			return "producao";
	}
}