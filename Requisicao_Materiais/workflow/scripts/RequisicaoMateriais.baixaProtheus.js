function baixaProtheus(){
	
	var company    = hAPI.getCardValue("id_grupoempresa");
	var branch     = hAPI.getCardValue("id_empresafilial");	
	var serviceManager = ServiceManager.getService('PREWS007');
	var serviceProvider = serviceManager.getBean();
	var serviceLocator = serviceProvider.instantiate('com.totvs.PREWS007');
	var STRBAIXA = serviceProvider.instantiate('com.totvs.STRBAIXA');
	var service = serviceLocator.getPREWS007SOAP();				
	
	STRBAIXA.setSOLICBAIXA(getItemsBaixa(serviceProvider));
	
	try {
		var PREWS007 = service.prews007C(company, branch, STRBAIXA);
		log.info("Retorno Baixa de itens : "+PREWS007);
	} catch (e) {
		log.error("Erro na Baixa de itens : "+e);
		throw(e.toString());
	}	
	
}

function getItemsBaixa(serviceProvider){
	
	var requisicao = hAPI.getCardValue("nrProtheus");

	var ARRAYOFBAIXA = serviceProvider.instantiate("com.totvs.ARRAYOFBAIXA");

	var cardData = hAPI.getCardData(getValue("WKNumProces"));
	var requisicao = hAPI.getCardValue("nrProtheus");
	
	var detail = getFilhosForm(cardData, new Array("IDGRUPOPRODSERVICO")); 
		
	for (var i = 0; i < detail.length; i++) {
		var indexes = detail[i][0].split("___")[1];
		var ITENS = serviceProvider.instantiate("com.totvs.BAIXA");
		
		ITENS.setCPPRODUTO(hAPI.getCardValue("idCodProdServico___"+indexes));
		ITENS.setCPNUM(requisicao);		
		ITENS.setCPXNUMFLG(new java.math.BigInteger(getValue("WKNumProces")));		
		ITENS.setCPQUANT(new java.math.BigInteger(hAPI.getCardValue("textQuantidadeAtend___"+indexes)));
		log.info('### textQuantidadeAtend___ : '+hAPI.getCardValue("textQuantidadeAtend___"+indexes));
		log.info('### getCPQUANT : '+ITENS.getCPQUANT());

		ARRAYOFBAIXA.getBAIXA().add(ITENS);				
	}
	
	return ARRAYOFBAIXA;
}