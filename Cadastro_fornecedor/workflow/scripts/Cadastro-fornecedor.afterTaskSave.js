function afterTaskSave(colleagueId,nextSequenceId,userList){
	log.info("#afterTaskSave cadastro de fornecedor===============");
	
	/*
	 * Associa os anexos do GED no Workflow
	 */
	
	try{
		
		log.info("#afterTaskSave attachDocuments");
		var docList = hAPI.getCardValue("listDocs");
		log.info("#docList : "+docList);
		if(docList != ""){
			
			docList = docList.split(",");
			
			var attachments = hAPI.listAttachments();
			
	        var anexos = new java.util.ArrayList();	        	
			
	        for(var  i = 0; i < attachments.size(); i++) {
				
				var docDto = attachments.get(i);
				
				anexos.add(docDto.getDocumentId().toString());	
				
			}
			
			log.info("====anexos : "+anexos);
			
			for(var i in docList){
				log.info("Anexos : "+docList[i]);
				index = anexos.indexOf(docList[i]);
				log.info("index : "+index);
				if(index == -1){
					hAPI.attachDocument(docList[i]);
				}
				
			}
			
			hAPI.setCardValue("listDocs", "");
		}		
		
	}catch (e) {
		log.error("Erro ao incluir documentos como anexos ao workflow. "+e.toString());
	}
	
	
}