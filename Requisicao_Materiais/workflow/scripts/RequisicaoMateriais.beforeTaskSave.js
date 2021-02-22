function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
var ATIVIDADE_COMPLETADA = getValue("WKCompletTask");
var ATIVIDADE_ATUAL      = getValue("WKNumState");
var processId = getValue("WKNumProces");
var cardData = hAPI.getCardData(processId);
	
	log.info("###beforeTaskSave - PREVI - Pagamento de Bens e Serviços");
	
	
	var errorMsg = "";
	var lineBreaker = "\n";	
	
	if((nextSequenceId == AUTO_APROVADO || nextSequenceId == AUTO_TEM_SALDO_EM_ESTOQUE) && ATIVIDADE_COMPLETADA){
		
		if(getValue("WKUserComment") != "Movimentado automaticamente via Protheus"){
			errorMsg += "Esta atividade s\u00f3 pode ser movimentada pelo Protheus" + lineBreaker;
		}

		if(errorMsg != ""){
			throw errorMsg;
		}
	}	
	
/*	if(nextSequenceId == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE && ATIVIDADE_ATUAL == STATUS_EM_PREOCESSO_DE_CONTRATACAO && ATIVIDADE_COMPLETADA){
		
		if(getValue("WKUserComment") != "Movimentado automaticamente via Protheus"){
			errorMsg += "Esta atividade s\u00f3 pode ser movimentada pelo Protheus" + lineBreaker;
		}

		if(errorMsg != ""){
			throw errorMsg;
		}
	}	*/
	
/*	if(nextSequenceId == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE && ATIVIDADE_ATUAL == STATUS_EM_PREOCESSO_DE_SOLICITACAO_AO_FORNECEDOR && ATIVIDADE_COMPLETADA){
		
		if(getValue("WKUserComment") != "Movimentado automaticamente via Protheus"){
			errorMsg += "Esta atividade s\u00f3 pode ser movimentada pelo Protheus" + lineBreaker;
		}

		if(errorMsg != ""){
			throw errorMsg;
		}
	}*/
	

/*	if(ATIVIDADE_ATUAL == SOLICITAR_CONFIRMACAO_DE_ENTREGA && nextSequenceId == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE && ATIVIDADE_COMPLETADA){
		
		if(hAPI.getCardValue("chk_incorreta") == "" || hAPI.getCardValue("chk_incorreta") == null){
			errorMsg += "O campo Entrega incorreta \u00E9 obrigat\u00F3rio" + lineBreaker;
		}

		if(errorMsg != ""){
			throw errorMsg;
		}
	}	*/
	
/*	if((nextSequenceId == AGUARDANDO_ATENDIMENTO || nextSequenceId == AGUARDANDO_CONTABILIZACAO) && ATIVIDADE_COMPLETADA){
		
		if(hAPI.getCardValue("chk_incorreta") != ""){
			errorMsg += "O campo Entrega incorreta n\u00e3o pode estar marcado" + lineBreaker;
		}

		if(errorMsg != ""){
			throw errorMsg;
		}
	}*/
	
	if((nextSequenceId == SOLICITAR_CONFIRMACAO_DE_ENTREGA) && ATIVIDADE_COMPLETADA){
		
		var atendidoZerado = false;
		
		/**
		 * LISTA DE PRODUTOS
		 */                                                    
		var detailProduto = getFilhosForm(cardData, new Array("TEXTGRUPOPRODSERVICO"));
				
		for(var i = 0; i < detailProduto.length; i++){
			var index = detailProduto[i][0].split("___")[1];
			
			var qtdAtend = hAPI.getCardValue("textQuantidadeAtend___"+index);
			qtdAtend = new java.lang.Integer(qtdAtend);
			
			if(qtdAtend == 0){
				atendidoZerado = true;				
			}			
			
		}
		
		if(atendidoZerado){
			if(getValue("WKUserComment") == null || getValue("WKUserComment") == "") {
				errorMsg += "Em caso de quantidade atendida igual a zero, deve ser informado o motivo através da aba Complementos." + lineBreaker;
			}			
		}
		
			if(errorMsg != ""){
				throw errorMsg;
			}
		
	}
	
	if((nextSequenceId == AGUARDANDO_ATENDIMENTO && ATIVIDADE_ATUAL == SOLICITAR_CONFIRMACAO_DE_ENTREGA) && ATIVIDADE_COMPLETADA){
		
		/**
		 * LISTA DE PRODUTOS
		 */                                                    
		var detailProduto = getFilhosForm(cardData, new Array("TEXTGRUPOPRODSERVICO"));
				
		for(var i = 0; i < detailProduto.length; i++){
			var index = detailProduto[i][0].split("___")[1];
			
			var qtdAtend    = new java.lang.Integer(hAPI.getCardValue("textQuantidadeAtend___"+index));
			var qtdAtendAnt = new java.lang.Integer(0);
			
			if(hAPI.getCardValue("textQuantidadeAtendAnt___"+index) == ""){
				qtdAtendAnt = new java.lang.Integer(0);
			}else{
				qtdAtendAnt = new java.lang.Integer(hAPI.getCardValue("textQuantidadeAtendAnt___"+index));
			}
			
			
			var total = (parseInt(qtdAtend) + parseInt(qtdAtendAnt));
		
			//hAPI.setCardValue("textQuantidadeAtend___"+index, total);
			hAPI.setCardValue("textQuantidadeAtendAnt___"+index, total);
			
		}		
		
	}	
	
}