var lineBreaker = "\n";
var rules = [validateTable, validateField];
var beforeSendValidate = function(CURRENT_STATE, NEXT_STATE){
	var errorMsg = ""; 
	if(CURRENT_STATE == NEXT_STATE){
		return;
	}
	
	var fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE) >= 0){
			var selector = (fields[i].name.indexOf("___") > 0) ? 
					'[name^="'+fields[i].name+'"]' 
					: '[name="'+fields[i].name+'"]';
			$(selector).each(function(){
				for(rule in rules){
					var validation = rules[rule](this, selector);
					if(validation.status != "success"){
						if(validation.status === "error"){
							errorMsg += validation.message;
						}
						break;
					}
				}
			});
		}
	}
	
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == ALTERAR_REQUISICAO){
		$("#tableProduto").find("input").each(function(index, value){
			if(this.id.indexOf("textCodProdServico___") > -1 && this.value == ""){
				errorMsg += "O campo C\u00F3digo do Produto é obrigat\u00F3rio" + lineBreaker;
			}
			if(this.id.indexOf("textQuantidadeProd___") > -1 && this.value == ""){
				errorMsg += "O campo Quantidade é obrigat\u00F3rio" + lineBreaker;
			}
			if(this.id.indexOf("text_unidadeMedida___") > -1 && this.value == ""){
				errorMsg += "O campo Unidade de Medida é obrigat\u00F3rio" + lineBreaker;
			}
			if(this.id.indexOf("textDtProd___") > -1 && this.value == ""){
				errorMsg += "O campo Data Necessidade é obrigat\u00F3rio" + lineBreaker;
			}
			if(this.id.indexOf("text_armazemProd___") > -1 && this.value == ""){
				errorMsg += "O campo Armaz\u00E9m é obrigat\u00F3rio" + lineBreaker;
			}
		});
	}
	
	if(CURRENT_STATE == APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE){
		
		if(!$("[name='aprovaRadio']").is(':checked')){		
			errorMsg += "O campo Apova\u00E7\u00E3o \u00E9 obrigat\u00F3rio" + lineBreaker;
		}		
		
		if($("#reprovado").is(':checked')){
			if($("#motivoAprova").val() == ""){		
				errorMsg += "O campo Motivo \u00E9 obrigat\u00F3rio" + lineBreaker;
			}
			
		}			
				
		
	}
	
	if (CURRENT_STATE == GERACAO_DE_PRE_REQUISICAO
			|| CURRENT_STATE == STATUS_EM_PREOCESSO_DE_SOLICITACAO_AO_FORNECEDOR
			|| CURRENT_STATE == STATUS_EM_PREOCESSO_DE_CONTRATACAO
			|| CURRENT_STATE == STATUS_PRE_REQUISICAO_GERADA) {
		if($("#integraProtheus").val() != "s"){
			errorMsg += "Esta atividade só pode ser movimentada pelo Protheus" + lineBreaker;
		}
	}
	
	if(CURRENT_STATE == SOLICITAR_CONFIRMACAO_DE_ENTREGA && NEXT_STATE == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE){
		if($("#chk_incorreta").prop("checked") == false){
			errorMsg += "Só poderá ir para a atividade 'Aguardando atendimento' caso o campo Status da entrega esteja marcado como Incorreto" + lineBreaker;
		}
	}	
	
	if(CURRENT_STATE == SOLICITAR_CONFIRMACAO_DE_ENTREGA && (NEXT_STATE == AGUARDANDO_ATENDIMENTO || NEXT_STATE == AGUARDANDO_CONTABILIZACAO)){
		if($("#chk_incorreta").prop("checked") == true){
			errorMsg += "Só poderá ir para a atividade 'Aguardando atendimento' ou 'Aguardando Contabilização' caso o campo Status da entrega esteja desmarcado" + lineBreaker;
		}
	}	
	
	if(CURRENT_STATE == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE){
		
		$(":input[name^='textGrupoProdServico___']").each(function() {
			var index = this.id.split("___")[1];				
			
			var itemPedido   = $("#textQuantidadeProd___"+index).val();
				itemPedido = parseInt(itemPedido);
				
			var itemAtendido = $("#textQuantidadeAtend___"+index).val();
				itemAtendido = parseInt(itemAtendido);
				
				if($("#textQuantidadeAtend___"+index).val() == ""){
					errorMsg += "É necessário informar a quantidade atendida para o item : "+$("#textCodProdServico___"+index).val()+ lineBreaker;
				}				
				
				if(itemAtendido > itemPedido){
					errorMsg += "Quantidade atendida não pode ser maior que Quantidade solicitada para o item : "+$("#textCodProdServico___"+index).val()+ lineBreaker;
				}
				
		});			
		
	}	
	
	if(CURRENT_STATE == AGUARDANDO_ATENDIMENTO){
		
		$(":input[name^='textGrupoProdServico___']").each(function() {
			var index = this.id.split("___")[1];
			
			var itemPedido = $("#textQuantidadeProd___"+index).val();
				itemPedido = parseInt(itemPedido);			
			
			var itemAtendidoAnt = $("#textQuantidadeAtendAnt___"+index).val();
				itemAtendidoAnt = parseInt(itemAtendidoAnt);
				
			var itemAtendido = $("#textQuantidadeAtend___"+index).val();
				itemAtendido = parseInt(itemAtendido);
				
				itemAtendido = itemAtendido + itemAtendidoAnt;
				
				if($("#textQuantidadeAtend___"+index).val() == ""){
					errorMsg += "É necessário informar a quantidade atendida para o item "+$("#textCodProdServico___"+index).val()+ lineBreaker;
				}
				
				if(itemAtendido == 0){
					errorMsg += "É necessário informar a quantidade atendida para o item "+$("#textCodProdServico___"+index).val()+ lineBreaker;
				}				
								
				
				if(itemAtendido > itemPedido){
					errorMsg += "A soma das quantidades atendidas não pode ser maior que a quantidade solicitada para o item "+$("#textCodProdServico___"+index).val()+ lineBreaker;
				}
				
		});			
		
	}	
	
	if((CURRENT_STATE == INICIO || CURRENT_STATE == ALTERAR_REQUISICAO) && $("#cmb_tipo_solicitacao").val() == 2){
		if($('#zoom_requisicaoMaterial') == ""){
			errorMsg += "O campo Requisi\u00E7\u00E3o de Material é obrigat\u00F3rio\n";
		}
		
	}
	
	if(errorMsg != ""){
		throw errorMsg;
	}
}

/**
 * Regra de negócio: Valida se pai x filho tem ao menos um registros.
 * @param el: Elemento sendo avaliado.
 * @returns validation Validation.
 */
function validateTable(el){
	var validation = new Validation();
	if($(el).prop("tagName") === "TABLE" ){
		validation.status = "ignore";
		if($(el).find("tr").size() <= 2){
			validation.message = "Insira ao menos um registro no pai x filho: "
				+getLabel($(el).attr("name"))+lineBreaker;
			validation.status = "error";
		}
	}
	return validation;
}

/**
 * Regra de negócio: Valida campos, sejam radio, check, inputs mesmo que em pai x filho.
 * @param el: Elemento sendo avaliado.
 * @param selector: Seletor usado para pegar o elemento.
 * @returns validation Validation.
 */
function validateField(el, selector){
	var validation = new Validation();
	if((
			["radio","checkbox"].indexOf($(el).attr("type")) >= 0
			&& $(selector+':checked').size() <= 0
		) 
		|| $(el).val().trim().length <= 0){ 
		validation.message = "Campo "+getLabel($(el).attr("name"))+" é obrigatório!"+lineBreaker;
		validation.status = "error";
	}
	return validation;
}

/**
 * Classe validação.
 * @attribute status: success, ignore ou error.
 * @attribute messagem: Messagem de erro.
 */
function Validation(){
	this.status = "success";
	this.message = "";
}

var requiredFields = new Fields();
/**
 * Classe campos.
 * @attribute fields: success, ignore ou error.
 * @method addField: Adiciona objetos compostos por String name e Array activities.
 * @method getFields: Recupera campos.
 */
function Fields(){
	this.fields = [];
	this.addField = function(name, arrayActivities){
		this.fields.push({"name":name,"activities":arrayActivities});
	}
	this.getFields = function(){
		return this.fields;
	}
}

/**
 * Inclui o * indicativo de campo obrigatório nos labels a partir do nome do campo.
 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
 * @param isRequired: é obrigatório? booleano.
 * @returns void.
 */
function setRequired(name, isRequired){
	name = name.split("___")[0];
	(isRequired) ? $("[for='"+name+"']").addClass('required')
		: $("[for='"+name+"']").removeClass('required');
}

/**
 * Retorna label baseado no name do campo, verificando atributo "for" da label.
 * @param name: name do campo.
 * @returns label: texto do label.
 */
function getLabel(name) {
	name = name.split("___")[0];
	return $("[for='"+name+"']").html();
}
