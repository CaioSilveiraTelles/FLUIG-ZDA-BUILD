function beforeStateEntry(sequenceId){
	log.info("#beforeStateEntry ------- sequenceId: " + sequenceId);
	
	var data = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	
	if(sequenceId == DECISAO_APROVACAO){
	 hAPI.setCardValue("text_user_gesad", getLogin(getValue("WKUser")));
	 hAPI.setCardValue("text_data_analise", formatoData.format(data));
	}
	
/*	if(sequenceId == DEFINIR_GESAD){
		log.info("#início validação dos anexos");
		var attachments = hAPI.listAttachments();
		
		if(attachments.isEmpty() && hAPI.getCardValue("portal") != 'true'){
			throw("É necessário anexar os arquivos do processo.");
		}
		
	}*/
	

	if(sequenceId == FIM_APROVADO){
		log.info("#=============================== REALIZA INTEGRAÇÃO ================================");
		//manterFornecedorPessoa();
		//manterFornecedorProtheus();
		//CRIA PASTA E ANEXA OS DADOS NO GED.
		createGED();
	}

}

function getLogin(IdUser){
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", IdUser, IdUser, ConstraintType.MUST);
	var user = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
	return user.getValue(0, "login");
}