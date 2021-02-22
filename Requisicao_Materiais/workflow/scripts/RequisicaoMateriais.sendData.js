function sendData(){
	var company = hAPI.getCardValue("id_grupoempresa");
	var branch = hAPI.getCardValue("id_empresafilial");
	var serviceManager = ServiceManager.getService('PREWS007');
	var serviceProvider = serviceManager.getBean();
	var serviceLocator = serviceProvider.instantiate('com.totvs.PREWS007');
	var SOLICARM = serviceProvider.instantiate('com.totvs.SOLICARM');
	var CABEC = serviceProvider.instantiate('com.totvs.CABEC');
	var service = serviceLocator.getPREWS007SOAP();			
	
	CABEC.setCPXNUMFLG(new java.math.BigInteger(getValue("WKNumProces")));	
	log.info("###CPXNPFLG : "+getValue("WKNumProces"));
	CABEC.setCPSOLICIT(getUser(hAPI.getCardValue("matriculaSolicitante")));
	CABEC.setCPEMISSAO(convertDate(hAPI.getCardValue("text_dt_emissao")));
	SOLICARM.setACABEC(CABEC);
	SOLICARM.setAITENS(getItems(serviceProvider));
	
	try {
		var PREWS007 = service.prews007A(company, branch, SOLICARM);
	} catch (e) {
		throw(e.toString());
	}
	
	log.info("***** Retorno da integração (18): " + PREWS007);
	hAPI.setCardValue("nrProtheus", PREWS007);
	//hAPI.setCardValue("nrProtheus", "1000");
}

function convertDate(date){
	var strDate = date.split("/");
	var calendar = java.util.Calendar.getInstance();
	calendar.set(java.util.Calendar.DATE, parseInt(strDate[0], 10));
	calendar.set(java.util.Calendar.MONTH, parseInt(strDate[1], 10) - 1);
	calendar.set(java.util.Calendar.YEAR, parseInt(strDate[2], 10));
	
	var gregorianCalendar = new java.util.GregorianCalendar();
	gregorianCalendar.setTime(calendar.getTime());
	var xmlGregorianCalendar = javax.xml.datatype.DatatypeFactory.newInstance().newXMLGregorianCalendar(gregorianCalendar);
	return xmlGregorianCalendar;
}

function getItems(serviceProvider){
	var ARRAYOFITENS = serviceProvider.instantiate("com.totvs.ARRAYOFITENS");
	
	var cardData = hAPI.getCardData(getValue("WKNumProces"));

/*	for(var i in cardData){
		log.info("###metodo :"+i);
	}*/	
	
	var detail = getFilhosForm(cardData, new Array("TEXTCODPRODSERVICO"));
		
	for (var i = 0; i < detail.length; i++) {
		var indexes = detail[i][0].split("___")[1];
		var ITENS = serviceProvider.instantiate("com.totvs.ITENS");
		
		ITENS.setCPLOCAL(hAPI.getCardValue("id_armazemProd___"+indexes));
		ITENS.setCPPRODUTO(hAPI.getCardValue("idCodProdServico___"+indexes));
		ITENS.setCPOBS(hAPI.getCardValue("text_obsProd___"+indexes));
		ITENS.setCPDATPRF(convertDate(hAPI.getCardValue("textDtProd___"+indexes)));
		ITENS.setCPQUANT(parseFloat(hAPI.getCardValue("textQuantidadeProd___"+indexes)));		
		ITENS.setCPUM(hAPI.getCardValue("id_unidadeMedida___"+indexes));
		ITENS.setCPCC(hAPI.getCardValue("codigoArea"));
		
		ARRAYOFITENS.getITENS().add(ITENS);		
	}
	return ARRAYOFITENS;
}