//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()

var beginWithDisabled = new RegExp(/^d_/);
function filterDisabled(index, element) {
	return !beginWithDisabled.test(element.id);
}

function disableField2($el, disabled){
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
		($(selector).length > 0) ? $(selector).show() : $el.before($el.clone().attr({"id":($el.attr("id")),"name":($el.attr("name"))}).attr("disabled",true));
		$el.hide();
	}
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

function enableContainer2($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],img,button,span").each(function (i) {
		enableField2($(this), enabled);
	});
};
//início - Leandro - 08/03/2017
//Foi adicionado na linha abaixo o código: input[type='file']
function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],input[type='file'],img,button,span").each(function (i) {
		enableField($(this), enabled);
	});
};
//fim - Leandro - 08/03/2017
function enableField2($el, enabled){
	
	if($el.prop("tagName") == "SELECT"){
		disableField2($el, enabled);
	}
	
}

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
	//início - Leandro - 08/03/2017
	else if($el.attr("type") == "file"){
		$el.prop("disabled",!enabled);
		handleOpacity($el, enabled);
	}
	//Fim - Leandro - 08/03/2017
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
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO){		
		enableField($("#text_NomeLogradouro_socio"), true);
		enableField($("#text_Cod_Municipio"), false);						
		enableField($("#text_Pais_socio"), false);
		enableField($("#id_empresafilial"), false);
		enableField($("#text_Municipio_socio"), false);
		enableField($("#text_Cod_MunicipioSocio"), false);
		enableField($("#nm_estado"), false);
		enableField($("#text_Pais"), false);
		enableField($("#text_CEP"), true);
		enableField($("#text_Numero"), true);
		enableField($("#text_Bairro_socio"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("#nm_cpf_cnpj"), true);
		enableField($("#text_Estado_socio"), false);
		enableField($("#text_codPais"), false);		
		enableField($("#text_NomeLogradouro"), true);
		enableField($("#text_CEP_socio"), true);
		enableField($("#text_sexo_socio"), true);
		enableField($("#text_Bairro"), false);
		enableField($("#text_Numero_socio"), true);
		enableField($("#text_Municipio"), false);
		enableField($("#text_DDI"), false);
		enableField($("#text_Nacionalidade"), false);
		
		
		enableContainer("#panelAprovacaoGesad", false);
		enableContainer("#panelAprovacaoGecon", false);
		enableContainer("#panelAprovacaoConfere", false);
		
	}
	if(CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO){
		enableField($("#id_empresafilial"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("[name='aprovaGsad']"), true);
		
		enableContainer("#panelAprovacaoGecon", false);
		enableContainer("#panelAprovacaoConfere", false);
		enableContainer("#panelFiscal", false);						
		
	}

	if(CURRENT_STATE == NOTIFICAR_GECON_PARA_COMPLEMENTO_DE_CADASTRO){
		enableField($("#id_empresafilial"), false);
		enableField($("#id_grupoempresa"), false);
		enableContainer("#panelAprovacaoGesad", false);
		enableContainer("#panelAprovacaoGecon", false);
		enableContainer("#panelAprovacaoConfere", true);
		
		enableContainer("#panelDados", false);
		enableContainer("#panelCadastro", false);  
		enableContainer("#panelEndereco", false);
		enableContainer("#panelContatos", false);
		enableContainer("#panelBancarios", false);
		enableContainer("#panelProduto", false);
		enableContainer("#panelSocio", false);
	}
	if(CURRENT_STATE == APROVACAO_GECON){
		enableField($("#id_empresafilial"), false);
		enableField($("#id_grupoempresa"), false);
		enableField($("[name='aprovaGecond']"), true);
		enableContainer("#panelAprovacaoGesad", false);
		enableContainer("#panelAprovacaoConfere", false);
		enableContainer("#panelFiscal", false);			
		
		enableContainer("#panelDados", false);
		enableContainer("#panelCadastro", false);  
		enableContainer("#panelEndereco", false);
		enableContainer("#panelContatos", false);
		enableContainer("#panelBancarios", false);
		enableContainer("#panelProduto", false);
		enableContainer("#panelSocio", false);
	}
}