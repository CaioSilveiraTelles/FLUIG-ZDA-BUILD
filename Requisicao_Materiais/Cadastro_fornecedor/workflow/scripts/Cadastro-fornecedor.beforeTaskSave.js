function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	log.info("============beforeTaskSave============");
	
	var ATIVIDADE_COMPLETADA = getValue("WKCompletTask");
	var ATIVIDADE_ATUAL      = getValue("WKNumState");
	var PROCESS_ID           = getValue("WKNumProces")
	
	log.info("ATIVIDADE_COMPLETADA : "+ATIVIDADE_COMPLETADA);
	log.info("ATIVIDADE_ATUAL : "+ATIVIDADE_ATUAL);
	log.info("PROCESS_ID : "+PROCESS_ID);
	log.info("nextSequenceId : "+nextSequenceId);
	
	if(ATIVIDADE_ATUAL == GESAD_CONFERIR_PRE_CADASTRO && nextSequenceId == DECISAO_APROVACAO && ATIVIDADE_COMPLETADA){
		log.info("PRIMEIRO IF");
		var informacao = getValue("WKUserComment")+" Observação : "+hAPI.getCardValue("obsAprovaGesad");
		log.info("informacao : "+informacao);
		hAPI.setTaskComments(colleagueId, PROCESS_ID, 0, informacao);
		
	}
	
	if(ATIVIDADE_ATUAL == NOTIFICAR_GECON_PARA_COMPLEMENTO && nextSequenceId == PRIMEIRA_APROVACAO_GECON && ATIVIDADE_COMPLETADA){
		log.info("SEGUNDO IF");
		var informacao = getValue("WKUserComment")+" Observação : "+hAPI.getCardValue("obsAprovaConferencia");
		log.info("informacao : "+informacao);
		hAPI.setTaskComments(colleagueId, PROCESS_ID, 0, informacao);
		
	}	
	
	if(ATIVIDADE_ATUAL == APROVACAO_GECON && nextSequenceId == SEGUNDA_APROVACAO_GECON && ATIVIDADE_COMPLETADA){
		log.info("TERCEIRO IF");
		var informacao = getValue("WKUserComment")+" Observação : "+hAPI.getCardValue("obsAprovaGecond");
		log.info("informacao : "+informacao);
		hAPI.setTaskComments(colleagueId, PROCESS_ID, 0, informacao);
		
	}		
	
}