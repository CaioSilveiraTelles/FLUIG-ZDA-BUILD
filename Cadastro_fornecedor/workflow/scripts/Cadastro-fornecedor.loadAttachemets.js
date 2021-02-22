function loadAttachemets(process,company,state,file,userTask){
	
	var loginAdm = "admin";
	var senhaAdm = "adm";
	var ServiceWorkflow = "ECMWorkflowEngineService";
	var completeTask = false;
	
	try {
		var webServiceProvider = ServiceManager.getServiceInstance(ServiceWorkflow);
		var webServiceLocator  = webServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceServiceLocator");
		var webService = webServiceLocator.getWorkflowEngineServicePort();
		
		var StringArrayArray = webServiceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray");
		var StringArray = webServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		var ProcessAttachmentDtoArray = webServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
		var ProcessTaskAppointmentDtoArray = webServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
		var ProcessAttachmentDto = webServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDto");
		var Attachment = webServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.Attachment");
		
		ProcessAttachmentDto.setAttachmentSequence(0);
		ProcessAttachmentDto.setColleagueId(loginAdm);
		ProcessAttachmentDto.setColleagueName("teste");
		ProcessAttachmentDto.setCompanyId(company);
		ProcessAttachmentDto.setDeleted(false);
		ProcessAttachmentDto.setDescription("teste publicado dataset");
		ProcessAttachmentDto.setDocumentId(0);
		ProcessAttachmentDto.setFileName(file);
		ProcessAttachmentDto.setNewAttach(true);
		ProcessAttachmentDto.setOriginalMovementSequence(state);
		ProcessAttachmentDto.setPermission("1");
		ProcessAttachmentDto.setProcessInstanceId(process);
		
		Attachment.setAttach(true);
		Attachment.setDescriptor(true);
		Attachment.setEditing(false);
		Attachment.setFileName(file);
		Attachment.setPrincipal(false);
		
		ProcessAttachmentDto.setAttachments([Attachment]);
		ProcessAttachmentDtoArray.setItem([ProcessAttachmentDto]);
		
		
		
		StringArray.setItem(["adm7"]);
		var threads = hAPI.getActiveStates();
		
		var responsavel = webService.getAvailableUsers(loginAdm,senhaAdm,company,process,state,threads.get(0));
		
		for(var i in responsavel.getItem()){
			log.info("#===========: " + i);
		}
		
		var result = webService.saveAndSendTask(loginAdm,senhaAdm,company,process,state,StringArray,
									"comentarios",userTask,completeTask,ProcessAttachmentDtoArray,StringArrayArray,
									ProcessTaskAppointmentDtoArray,false,threads.get(0));
		
		log.info("#load attachemets ok ============================> " + result);
		
		
	} catch (e) {
		log.error("#ERRO ----------->: " + e.toString());
	}
}