function createGED(){
	try {
		
		var gson = new com.google.gson.Gson();
		
		var raizPublicacao = getFolder();
		
		var cpfcnpj = hAPI.getCardValue("nm_cpf_cnpj").replace(".","").replace("-","").replace("/","").replace(".","");
		
		var folderParent = parseInt(raizPublicacao.folder);
		var pastaForn    = hAPI.getCardValue("pastaForn");
		if(pastaForn == ""){
			
			var dto = docAPI.newDocumentDto();
			dto.setDocumentDescription(cpfcnpj+" - "+hAPI.getCardValue("text_Nome"));
			dto.setDocumentType("1");
			dto.setParentDocumentId(folderParent);
			dto.setDocumentTypeId("");

			log.info("#FOLDER PARENT: " + folderParent);
			var folder = docAPI.createFolder(dto, null, null);
			log.info("#PASTA CRIADA COM O ID :" + folder.getDocumentId());	
			pastaForn = folder.getDocumentId();
			
		}		

		
		if(pastaForn){
			var attachments = hAPI.listAttachments();
			log.info("#attachments.size() : "+attachments.size());
	        for (var i = 0; i < attachments.size(); i++) {
		log.info("====contador===="+i);
	            var docDto = attachments.get(i);
	 			log.info("docDto.getDocumentId() : "+docDto.getDocumentId());
	
				log.info("#docDto.getDocumentType: " + docDto.getDocumentType());
	            if (docDto.getDocumentType() == "7" || docDto.getDocumentType() == "2") {
	                
					log.info("#move documentos para a nova pasta");
					
					var mountPoint = "/public/ecm/document/updateDocumentFolder";
					var request = new Object();
					request.id = docDto.getDocumentId().toString();
					request.parentId = pastaForn.toString();
					request = gson.toJson(request);
					
					var c1 = DatasetFactory.createConstraint("json", request, request, ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("mountPoint", mountPoint, mountPoint, ConstraintType.MUST);
					var dataset = DatasetFactory.getDataset("service_genericRest", new Array(), new Array(c1,c2), new Array());
	
					if(hAPI.getCardValue("portal") == "true"){
						
							            docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());
						         
						                docDto.setDocumentId(0);
						                docDto.setParentDocumentId(pastaForn);
						
						log.info("===docDto==="+docDto);
						         
						                var attachArray = new java.util.ArrayList();
						                var mainAttach = docAPI.newAttachment();
						                mainAttach.setFileName(docDto.getPhisicalFile());
						                mainAttach.setPrincipal(true);
						                mainAttach.setAttach(false);
						                attachArray.add(mainAttach);
						log.info("===mainAttach==="+mainAttach);
						log.info("===attachArray==="+attachArray);
						         
						                var doc = docAPI.createDocument(docDto, attachArray, null, null,null);
										log.info("===doc==="+doc);
						                log.info("#DOCUMENTO CRIADO COM O ID: " + doc.getDocumentId());						
						
					}
					

	            }
	        }
	
			atualizaPastaForn(pastaForn);
	
		}
	} catch (e) {
		log.error("Problemas na criação da pasta/documento: \n" + e);
	}
}

function getFolder() {
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return { folder : dataset.getValue(0, "pastaForn") };
}