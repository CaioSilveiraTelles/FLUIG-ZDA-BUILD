//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()

var beginWithDisabled = new RegExp(/^d_/);
function filterDisabled(index, element) {
	return !beginWithDisabled.test(element.id);
}

function disableField($el, disabled){
	//Pega o ID, pois no caso do radio é preciso desabilitar cada item do radio.
	//Pendente avaliar qual o comportamento FLUIG quanto a radio no pai x filho:
	//XXX: Por hora é obrigatório ter ids diferentes por linha e por opção do radio

	var selector = "#d_"+$el.attr("id")+"[name='d_"+$el.attr("name")+"']";
	$el = $el.filter(filterDisabled);
	if(disabled){
		$(selector).hide();
		$el.show();
	}
	else{
		($(selector).length > 0) ? $(selector).show() : $el.before($el.clone().attr({"id":("d_"+$el.attr("id")),"name":("d_"+$el.attr("name"))}).attr("disabled",true));
		$el.hide();
	}
}

function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],img,button,span").each(function (i) {
		enableField($(this), enabled);
	});
};

function enableField($el, enabled){
	if($el.attr("type") == "text"){
		$el.prop("readonly",!enabled);
	}
	else if($el.prop("tagName") == "TEXTAREA"){
		$el.prop("readonly",!enabled);
	}
	else if($el.prop("tagName") == "SELECT"){
		disableField($el, enabled);
	}
	else if($el.attr("type") == "button"){
		$el.prop("disabled",!enabled);
		handleOpacity($el, enabled);
	}
	else if($el.prop("tagName") == "SPAN"){
		!enabled ? $el.css("pointer-events", "none") : $el.css("pointer-events", "auto");
		handleOpacity($el, enabled);
	}
	else if($el.prop("tagName") == "IMG"){
		$el.prop("onclick",enabled);
		handleOpacity($el, enabled);
	}
	else if($el.attr("type") == "radio" || $el.attr("type") == "checkbox"){
		var nameOf = $el.attr("name");

		//Como ID não recebe ___, seletor por ID
		//Nâo há como automatizar desabilitar específico pelo ID, justamente por não receber ___

		if(nameOf != ""){
			var selector = "[name='"+nameOf+"'],[name^='" + nameOf + "___']";
			$el = $(selector).filter(filterDisabled);
			if($el.length && $el.length > 0 && ($el.attr("type") == "radio" || $el.attr("type") == "checkbox")){
				$el.each(function(i){
					var labelSelector = "label[for^='"+$(this).prop("id")+"'],label[for^='d_"+$(this).prop("id")+"']";
					$(labelSelector).each(function (i) {
						var prefix = (beginWithDisabled.test($(this).prop("for"))) ? "d_" : "";
						if(enabled){
							$(this).prop("for", $(this).prop("for").replace(beginWithDisabled,""));
						}
						else if(prefix == ""){
							$(this).prop("for", "d_"+$(this).prop("for"));
						}
					});
					disableField($(this), enabled);
				});
			}
		}
		else{
			disableField($el, enabled);
		}
	}
	else{
		$el.prop("readonly",!enabled);
	}
}
function handleOpacity($el, enabled){
	if(enabled){
		$el.css("opacity", 1);
		$el.css("filter", "");
	} else {
		$el.css("opacity", 0.7);
		$el.css("filter", "alpha(opacity=70)");
	}
}

//@Deprecated
function applyDisabledStyle(){
	var arr = $("input");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("textarea");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("select");
	$.each(arr,function(index, item){
		$(item).change();
	});	

	var imgs = document.getElementById(tableId).getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		imgs[i].style.display = "none";
	}
}

function enableFields(){
	if(CURRENT_STATE == null){
		enableContainer($("form")[0],false);
	}
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == ALTERAR_REQUISICAO){
		enableField($("#cmb_tipo_solicitacao"), true);
		enableField($("#id_empresafilial"), true);
		enableField($("#textQuantidadeProd"), true);
		enableField($("#text_obsProd"), true);
		enableField($("#text_armazemProd"), false);
		enableField($("#textCodProdServico"), false);
		enableField($("#textDtProd"), false);
		enableField($("#text_dt_emissao"), false);
		enableField($("#text_area_demandante"), false);
		enableField($("#textLoginSolicit"), false);
		enableField($("#motivoAprova"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("#txt_grupoempresa"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#txt_empresafilial"), false);
		enableField($("#zoom_requisicaoMaterial"), false);
		enableField($("[name='aprovaRadio']"), false);
		enableField($("#chk_incorreta"), false);
		$("#addProduto").removeClass("fs-display-none");
	}
	
	if(CURRENT_STATE == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE || CURRENT_STATE == AGUARDANDO_ATENDIMENTO){
		enableContainer("#panelItens", false); 		
		enableContainer("#panelAprovacao", false);
		enableField($("#motivoAprova"), false);
		enableField($("[name='aprovaRadio']"), false);
		enableField($("#cmb_tipo_solicitacao"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#textQuantidadeProd"), false);
		enableField($("#textDtProd"), false);
		enableField($("#textCodProdServico"), false);
		enableField($("#text_obsProd"), false);
		enableField($("#text_armazemProd"), false);
		enableField($("#text_dt_emissao"), false);
		enableField($("#text_area_demandante"), false);
		enableField($("#textLoginSolicit"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("#txt_grupoempresa"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#txt_empresafilial"), false);
		enableField($("#zoom_requisicaoMaterial"), false);
		enableField($("#chk_incorreta"), false);		
		
		$(":input[name^='textGrupoProdServico___']").each(function() {
			var index = this.id.split("___")[1];				

			$("#text_obsProd___"+index).prop("readonly",true);
			$("#textQuantidadeProd___"+index).prop("readonly",true);			
			$("#textQuantidadeAtend___"+index).prop("readonly",false);			
				
		});			
		
	}
	
	if(CURRENT_STATE == APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE){
		enableField($("#motivoAprova"), true);
		enableField($("[name='aprovaRadio']"), true);
		enableField($("#cmb_tipo_solicitacao"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#textQuantidadeProd"), false);
		enableField($("#textDtProd"), false);
		enableField($("#textCodProdServico"), false);
		enableField($("#text_obsProd"), false);
		enableField($("#text_armazemProd"), false);
		enableField($("#text_dt_emissao"), false);
		enableField($("#text_area_demandante"), false);
		enableField($("#textLoginSolicit"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("#txt_grupoempresa"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#txt_empresafilial"), false);
		enableField($("#zoom_requisicaoMaterial"), false);
		enableField($("#chk_incorreta"), false);
		enableContainer("#panelItens", false); 
	}	
	if (CURRENT_STATE == FIM || CURRENT_STATE == FIM2 || CURRENT_STATE == FIM3 || CURRENT_STATE == GERACAO_DE_PRE_REQUISICAO
			|| CURRENT_STATE == STATUS_PRE_REQUISICAO_GERADA || CURRENT_STATE == STATUS_EM_PREOCESSO_DE_CONTRATACAO
			|| CURRENT_STATE == STATUS_EM_PREOCESSO_DE_SOLICITACAO_AO_FORNECEDOR
			|| CURRENT_STATE == AGUARDANDO_CONTABILIZACAO
			|| CURRENT_STATE == ANALIZA_DEVOLUCAO || CURRENT_STATE == ANALISA_REQUISICAO) {
		
		enableField($("#motivoAprova"), false);
		enableField($("[name='aprovaRadio']"), false);
		enableField($("#cmb_tipo_solicitacao"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#textQuantidadeProd"), false);
		enableField($("#textDtProd"), false);
		enableField($("#textCodProdServico"), false);
		enableField($("#text_armazemProd"), false);
		enableField($("#text_dt_emissao"), false);
		enableField($("#text_area_demandante"), false);
		enableField($("#textLoginSolicit"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("#txt_grupoempresa"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#txt_empresafilial"), false);
		enableField($("#zoom_requisicaoMaterial"), false);
		enableField($("#chk_incorreta"), false);
		enableField($("#text_obsProd"), false);	
		enableContainer("#panelItens", false); 
	}
	if(CURRENT_STATE == SOLICITAR_CONFIRMACAO_DE_ENTREGA){
		enableField($("#motivoAprova"), false);
		enableField($("[name='aprovaRadio']"), false);
		enableField($("#cmb_tipo_solicitacao"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#textQuantidadeProd"), false);
		enableField($("#textDtProd"), false);
		enableField($("#textCodProdServico"), false);
		enableField($("#text_armazemProd"), false);
		enableField($("#text_dt_emissao"), false);
		enableField($("#text_area_demandante"), false);
		enableField($("#textLoginSolicit"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("#txt_grupoempresa"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#txt_empresafilial"), false);
		enableField($("#zoom_requisicaoMaterial"), false);
		enableField($("#text_obsProd"), false);
		enableField($("#chk_incorreta"), true);
		enableContainer("#panelItens", false); 
	}
}