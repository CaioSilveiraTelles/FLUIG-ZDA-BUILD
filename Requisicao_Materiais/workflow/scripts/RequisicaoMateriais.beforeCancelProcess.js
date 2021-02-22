function beforeCancelProcess(colleagueId,processId){		
	
	var errorMsg = "";
	var lineBreaker = "\n";		
	
	if(hAPI.getCardValue("integraProtheus") == "s" || getValue("WKNumState") == GERACAO_DE_PRE_REQUISICAO){
		
		errorMsg += "Esta solicita\u00e7\u00e3o s\u00f3 pode ser cancelada pelo Protheus" + lineBreaker;
		
		if(errorMsg != ""){
			throw errorMsg;
		}		
		
	}
	
}