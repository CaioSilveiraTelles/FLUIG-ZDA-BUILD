function afterStateEntry(sequenceId){
	var CURRENT_USER = getValue("WKUser");
	var PROCESS = getValue("WKNumProces");
	log.info("#afterStateEntry cadastro-fornecedor | Sequence ID: " + sequenceId+ " Process: " + PROCESS + " USER: "+CURRENT_USER);
	var managementGroups = getManagementGroups();
	
	if(sequenceId == DEFINIR_GESAD){
		var group = PREFIX_GROUP_DEFINIR_GESAD+"_"+PROCESS;
		var resultGroup = createGroup(group, group, "false", "gesadGroup");
		
		if(resultGroup == "OK"){
			var GESAD = managementGroups.gesad;
			var listGroup = new Array(managementGroups.analyst2, managementGroups.manager, managementGroups.executive);
			
			var listUsers = createUserList(GESAD, listGroup, CURRENT_USER);
			
			addUsersGroup(listUsers,group);
			
	        var users = new java.util.ArrayList();
	        users.add("Pool:Group:" + group);
	        hAPI.setAutomaticDecision(GESAD_CONFERIR_PRE_CADASTRO, users, "Criação Dinâmica de Grupo no Fluig");
		}else
			throw("Erro ao criar o grupo. Contate o administrador.");
    }
	
	if(sequenceId == DEFINIR_GECON){
		var POOL_GECON = hAPI.getCardValue("poolGecon");
		
		if(POOL_GECON == ""){
			var group = PREFIX_GROUP_DEFINIR_GECON+"_"+PROCESS;
			var resultGroup = createGroup(group, group, "false", "geconGroup");
			
			if(resultGroup == "OK"){
				var GECON = managementGroups.gecon;
				var listGroup = new Array(managementGroups.analyst, managementGroups.assistant);
				
				var listUsers = createUserList(GECON, listGroup, CURRENT_USER);
				
				addUsersGroup(listUsers,group);
				
		        var users = new java.util.ArrayList();
		        users.add("Pool:Group:" + group);
		        hAPI.setAutomaticDecision(NOTIFICAR_GECON_PARA_COMPLEMENTO, users, "Criação Dinâmica de Grupo no Fluig");
			}else
				throw("Erro ao criar o grupo. Contate o administrador.");
		}else{
			var users = new java.util.ArrayList();
			users.add(POOL_GECON);
			
			hAPI.setAutomaticDecision(NOTIFICAR_GECON_PARA_COMPLEMENTO, users, "Criação Dinâmica de Grupo no Fluig");
		}
		
    }
	
	if(sequenceId == DEFINIR_GECON_APROVACAO){
		var POOL_APROV_GECON = hAPI.getCardValue("poolGeconAprov");
		
		if(POOL_APROV_GECON == ""){
			var group = PREFIX_GROUP_DEFINIR_GECON_APROVACAO+"_"+PROCESS;
			var resultGroup = createGroup(group, group, "false", "geconAprovGroup");
			
			if(resultGroup == "OK"){
				var GECON = managementGroups.gecon;
				var listGroup = new Array(managementGroups.analyst, managementGroups.analyst2);
				
				var listUsers = createUserList(GECON, listGroup, CURRENT_USER);
				
				addUsersGroup(listUsers,group);
				
		        var users = new java.util.ArrayList();
		        users.add("Pool:Group:" + group);
		        hAPI.setAutomaticDecision(APROVACAO_GECON, users, "Criação Dinâmica de Grupo no Fluig");
			}else
				throw("Erro ao criar o grupo. Contate o administrador.");
		}else{
			 var users = new java.util.ArrayList();
		     users.add(POOL_APROV_GECON);
		     hAPI.setAutomaticDecision(APROVACAO_GECON, users, "Criação Dinâmica de Grupo no Fluig");
		}
		
    }
	
	if(sequenceId == FIM_APROVADO){
		sendMail("aprovada", hAPI.getCardValue("text_Email"), "");
	}
	
	if(sequenceId == FIM_REPROVADO){
		sendMail("reprovada", hAPI.getCardValue("text_Email"), hAPI.getCardValue("obsAprovaGesad"));
	}
		
}

function getManagementGroups(){
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return {analyst: dataset.getValue(0, "analista"), analyst2: dataset.getValue(0, "analista2"), assistant : dataset.getValue(0, "assistentes"), manager : dataset.getValue(0, "nucleo"), executive : dataset.getValue(0, "executivo") , gecon : dataset.getValue(0, "GECON_TRI") , gesad : dataset.getValue(0, "GESAD") };
}