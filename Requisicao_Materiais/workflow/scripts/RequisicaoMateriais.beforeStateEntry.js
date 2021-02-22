function beforeStateEntry(sequenceId){
	log.info("***** sequenceId " + sequenceId);
	log.info("***** aprovaRadio " + hAPI.getCardValue("aprovaRadio"));
	log.info("***** cmb_tipo_solicitacao " + hAPI.getCardValue("cmb_tipo_solicitacao"));
	
	var CURRENT_USER = getValue("WKUser");
	var PROCESS = getValue("WKNumProces"); 	
		
	
	if (sequenceId == ATIVIDADE_AUTOMATICA_1) {
		
		try{
			
			if(hAPI.getCardValue("gerentesAreaDemandante") != ""){
				
		        var users = new java.util.ArrayList();
		        users.add("Pool:Group:"+hAPI.getCardValue("gerentesAreaDemandante"));
		        hAPI.setAutomaticDecision(APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE, users, "Movido automaticamente pelo Fluig.");				
				
			}else{
			
				var managementGroups = getManagementGroups();
				
				var group = PREFIX_GROUP_AREA_DEMAND+"_"+PROCESS;
				var resultGroup = createGroup(group, group, "false", "gerentesAreaDemandante");	
				log.info("###resultGroup : "+resultGroup);
				
				if(resultGroup == "OK"){
					
					var GERENCIA = hAPI.getCardValue("codigoArea");
					
					var values = verificaGrupo(GERENCIA);
					log.info("### retorno ")
					
						/*TRATAMENTO REALIZADO PARA IDENTIFICAR OS RESPONSÁVEIS PELA APROVAÇÃO DE UM BENS E SERVIÇOS
						 * QUANDO A SOLICITAÇÃO FOR DE UM CENTRO DE CUSTO DE UMA DIRETORIA, UMA VEZ QUE ESSES CENTRS DE CUSTO
						 * NÃO POSSUEM GERENTES DE NÚCLEO E EXECUTIVOS
						 */					
					if(values.grupoDiretoria){
						
						var listGroup = new Array(managementGroups.assessor, values.codigoGrupoDiretor);
						log.info("### listGroup "+listGroup);
						var listUsers = createUserList(values.codigoGrupoDiretoria, listGroup, CURRENT_USER);
						
						addUsersGroup(listUsers,group);
						
				        var users = new java.util.ArrayList();
				        users.add("Pool:Group:"+group);
				        hAPI.setAutomaticDecision(APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE, users, "Movido automaticamente pelo Fluig.");							
					}else{
						
						/*
						 * Tratamento realizado para as gerências que não possuem gerentes de núcleo ou executivos, uma vez que 
						 * que possuem cargos correlatos, por exemplo ASJUR, onde o gerente executivo é o cargo Consultor Jurídico 
						 */
						var correlato = verificaCorrelato(GERENCIA);
						if(correlato.grupoCorrelato){
							
							log.info("Estou no else IF");
							var listGroup = new Array(correlato.codigoNucleo, correlato.codigoExecutivo);
							log.info("### listGroup "+listGroup);
							var listUsers = createUserList(GERENCIA, listGroup, CURRENT_USER);
							
							addUsersGroup(listUsers,group);
							
					        var users = new java.util.ArrayList();
					        users.add("Pool:Group:"+group);
					        hAPI.setAutomaticDecision(APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE, users, "Movido automaticamente pelo Fluig.");								
							
						}else{						

							log.info("###Dentro do  resultGroup == OK ");
							log.info("###managementGroups.manager_nucleo : "+managementGroups.manager_nucleo);
							log.info("###managementGroups.manager : "+managementGroups.manager);
							
							var listGroup = new Array(managementGroups.manager, managementGroups.manager_nucleo);
							
							var listUsers = createUserList(GERENCIA, listGroup, CURRENT_USER);
							
							addUsersGroup(listUsers,group);
							
					        var users = new java.util.ArrayList();
					        users.add("Pool:Group:"+group);
					        hAPI.setAutomaticDecision(APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE, users, "Movido automaticamente pelo Fluig.");						
						}
					}
					

				}else
					throw("Erro ao criar o grupo. Contate o administrador.");				
				
			}						
			
		}catch (e) {
			log.error("***** Erro ao movimentar o processo: " + e);
			throw "Erro ao movimentar o processo: \n" + e;
		}
		
	}
	
	if (sequenceId == GERACAO_DE_PRE_REQUISICAO) {
		try{
			sendData();
		}catch(e){
			log.error("***** Erro ao gerar Pre-Requisicao no Protheus: " + e);
			throw "Erro ao gerar Pre-Requisicao no Protheus: \n" + e;
		}
	}
	
	if(sequenceId == FIM3){
		try{
			devolveProtheus();
		}catch(e){
			log.error("***** Erro ao realizar devolução do(s) produtos: " + e);
			throw "Erro ao realizar devolução do(s) produtos: \n" + e;
		}		
	}	
	
	if(sequenceId == AGUARDANDO_CONTABILIZACAO || sequenceId == AGUARDANDO_ATENDIMENTO){
		try{
			baixaProtheus();
		}catch(e){
			log.error("***** Erro ao realizar baixa da Pre-Requisicao no Protheus: " + e);
			throw "Erro ao realizar baixa da Pre-Requisicao no Protheus: \n" + e;
		}		
	}
}

function getManagementGroups(){
	log.info("###Estou no getManagementGroups()###");
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return {analyst: dataset.getValue(0, "analista"), assistant : dataset.getValue(0, "analista2"), manager : dataset.getValue(0, "executivo"), manager_nucleo : dataset.getValue(0, "nucleo"), gefin : dataset.getValue(0, "GEFIN"), assessor : dataset.getValue(0, "ASSESSOR") };
}