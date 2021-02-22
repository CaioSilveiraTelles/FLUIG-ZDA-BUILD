var INDEX = null;
$(document).ready(function(){
	bindings();
	activeCalendar();
	requiredFieldsRule();
	enableFields();
	disableChildren();
	activeDynamicType();
});

function bindings(){
	activeCalendar();
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO){
		
	    var date = new Date();
	    
	    $('#text_dt_emissao').val(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear());
		
		$('#requisicaoMaterial').hide();
		putFirstArea();
		getCompanyAndBranch();
		$("#btn_areaDemandante").click(function(){
			openZoom("ds_consulta_area_demandante", "codigo,"+encodeURI("Código")+",nome,"+encodeURI("Descrição"), "codigo,nome", "area", null);
		});
		$("#btn_grupoempresa").click(function(){
			openZoom("ds_protheus_empresa_filial", "CODEMP,"+encodeURI("Código")+",EMP,"+encodeURI("Descrição"), "CODEMP,EMP", "empresa", null);
		});
		$("#btn_empresafilial").click(function(){
			openZoom("ds_protheus_empresa_filial", "CODFIL,"+encodeURI("Código")+",FIL,"+encodeURI("Descrição"), "CODFIL,FIL", "filial", null);
		});
		$("#addProduto").click(function(){
			var index = wdkAddChild('tableProduto');
			activeCalendar();
			$(".grupo-produto").click(function(){
				INDEX = this.id.split("___")[1];
				var msg = "";
				if($("#id_grupoempresa").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a empresa\n";
				}
				if($("#id_grupofilial").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a filial";
				}
				if(msg != "") {
					FLUIGC.toast({title: '',message: msg,type: 'danger'});
					return false;
				}
				openZoom("ds_protheus_grupo_produto_req","CODIGO,"+ encodeURI("Código")+ ",DESCRICAO,"+ encodeURI("Descrição"),
						"CODIGO,DESCRICAO","grupoProduto","empresa,"+ $("#id_grupoempresa").val()+ ",filial,"
								+ $("#id_empresafilial").val());
			});
			$(".produto").click(function(){
				INDEX = this.id.split("___")[1];
				var msg = "";
				if($("#id_grupoempresa").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a empresa\n";
				}
				if($("#id_grupofilial").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a filial";
				}
				if($("#idGrupoProdServico___"+INDEX).val() == ""){
					msg += "\u00C9 necess\u00E1rio informar o grupo de produtos";
				}
				if(msg != "") {
					FLUIGC.toast({title: '',message: msg,type: 'danger'}); 
					return false;
				}
				openZoom("ds_protheus_produto","PROD,"+ encodeURI("Código")+ ",DESCRICAO,"+ encodeURI("Descrição"),
						"PROD,DESCRICAO,UM,ARMAZEM,DESCARMAZEM","produto","empresa,"+ $("#id_grupoempresa").val()+ ",filial,"
								+ $("#id_empresafilial").val()+ ",grupo,"+$("#idGrupoProdServico___"+INDEX).val());
			});
			$(".armazem").click(function(){
				INDEX = this.id.split("___")[1];
				var msg = "";
				if($("#id_grupoempresa").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a empresa\n";
				}
				if($("#id_grupofilial").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a filial";
				}
				if(msg != "") {
					FLUIGC.toast({title: '',message: msg,type: 'danger'}); 
					return false;
				}
				openZoom("ds_protheus_armazem","CODIGO,"+ encodeURI("Código")+ ",DESCRICAO,"+ encodeURI("Descrição"),
						"CODIGO,DESCRICAO","armazem","empresa,"+ $("#id_grupoempresa").val()+ ",filial,"
								+ $("#id_empresafilial").val());
			});
			$(".unidade-medida").click(function(){
				INDEX = this.id.split("___")[1];
				var msg = "";
				if($("#id_grupoempresa").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a empresa\n";
				}
				if($("#id_grupofilial").val() == ""){
					msg += "\u00C9 necess\u00E1rio informar a filial";
				}
				if(msg != "") {
					FLUIGC.toast({title: '',message: msg,type: 'danger'}); 
					return false;
				}
				openZoom("ds_protheus_unidade_medida","UNIMED,"+ encodeURI("Código")+ ",DESCPO,"+ encodeURI("Descrição"),
						"UNIMED,DESCPO","un","empresa,"+ $("#id_grupoempresa").val()+ ",filial," + $("#id_empresafilial").val());
			});
		});
		$("#cmb_tipo_solicitacao").on("change",function(){
			if(this.value == "1"){
				$('#requisicaoMaterial').hide();
				$("#zoom_requisicaoMaterial").val("");		
				$("label[for='zoom_requisicaoMaterial']").removeClass("required");
			}				
			else{
				$('#requisicaoMaterial').show();
				$("label[for='zoom_requisicaoMaterial']").addClass("required");
			}
				
		});
		$("#btn_requisicaoMaterial").click(function(){
			if($("#cmb_tipo_solicitacao").val() == "2"){
				openZoom("ds_protheus_requisicao_devolucao","numFluig,"+ encodeURI("Número Fluig"),
						"numFluig","requisicoes","empresa,"+ $("#id_grupoempresa").val()+ ",filial," + $("#id_empresafilial").val());
			}
		});
	}
	
	if(CURRENT_STATE != 0 && CURRENT_STATE != INICIO){
	
		if($('#cmb_tipo_solicitacao').val() == "2"){
			$('#requisicaoMaterial').show();
		}else{
			$('#requisicaoMaterial').hide();			
		}			
		
	}	
	
	if(CURRENT_STATE == APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE || CURRENT_STATE == ALTERAR_REQUISICAO){		
		$("[name='aprovaRadio']").prop('checked', false);	
		$("#motivoAprova").val("");
	}

	if(CURRENT_STATE == STATUS_SEPARAR_MATERIAL_PARA_ENTREGA_AO_SOLICITANTE){

/*		$(":input[name^='textGrupoProdServico___']").each(function() {
			var index = this.id.split("___")[1];				

			$("#text_obsProd___"+index).prop("readonly",true);
			$("#textQuantidadeProd___"+index).prop("readonly",true);
			$("#textQuantidadeAtend___"+index).prop("readonly",false);							
				
		});	*/			
		
	}
	
}

function activeCalendar(){
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO){
		
	    var date = new Date();
	    FLUIGC.calendar('div[id^="divDtProd_"]', {
	       minDate: date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear(),	       
	       language: 'pt-br',
	    });				   
		
	}

}

function openZoom(datasetId, columns, fieldsToReturn, type, filter){
	window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields="
			+ columns + "&resultFields=" + fieldsToReturn + "&type=" + type
			+ (filter != null ? "&filterValues=" + filter : ""), "zoom",
			"status, scrollbars=no, width=600, height=350, top=0, left=0");
}

function putFirstArea(){
	var dataset = DatasetFactory.getDataset("ds_consulta_area_demandante", null, null, null);
	if(dataset != null && dataset.values.length > 0){
		for(var i=0;i<dataset.values.length;i++){
			if(isUserOfGroup(dataset.values[i].codigo)){
				$("#codigoArea").val(dataset.values[i].codigo);
				$("#text_area_demandante").val(dataset.values[i].nome);
				break;
			}
		}
	}
	getManagers();
}

function isUserOfGroup(groupId){
	var user = parent.WCMAPI.getUserCode();
	var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, [groupFilter], null);
	for(var i=0;i<dataset.values.length;i++){
		if(dataset.values[i]["colleagueGroupPK.colleagueId"] == user)
			return true;
	}
	return false;
}

function getManagers(){
	var managementGroups = getManagementGroups();
	var usersFromSelectedGroup = getUsersFromSelectedGroup();
	
	//Busca gerencia de nucleo
	var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", managementGroups.core, managementGroups.core, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, [groupFilter], null);
	for(var i=0;i<dataset.values.length;i++){
		for(var u=0;u<usersFromSelectedGroup.length;u++){
			if(dataset.values[i]["colleagueGroupPK.colleagueId"] == usersFromSelectedGroup[u]["colleagueGroupPK.colleagueId"]){
				$("#gerencia").val(dataset.values[i]["colleagueGroupPK.colleagueId"]);
				break;
			}
		}
	}
	
	//Busca gerencia executiva
	var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", managementGroups.executive, managementGroups.executive, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, [groupFilter], null);
	for(var i=0;i<dataset.values.length;i++){
		for(var u=0;u<usersFromSelectedGroup.length;u++){
			if(dataset.values[i]["colleagueGroupPK.colleagueId"] == usersFromSelectedGroup[u]["colleagueGroupPK.colleagueId"]){
				$("#gerencia").val($("#gerencia").val() == ""?
 						dataset.values[i]["colleagueGroupPK.colleagueId"] : 
 							$("#gerencia").val() + "," + dataset.values[i]["colleagueGroupPK.colleagueId"]);
				break;
			}
		}
	}
}

function getUsersFromSelectedGroup(){
	var groupId = $("#codigoArea").val();
	var groupFilter = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleagueGroup", null, [groupFilter], null);
	return dataset.values;
}

function getManagementGroups(){
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return {core: dataset.values[0].nucleo, executive : dataset.values[0].executivo};
}

function setSelectedZoomItem(item){
	if(item.type == "area"){
		$("#gerencia").val("");
		$("#codigoArea").val(item.codigo);
		$("#text_area_demandante").val(item.nome);
		getManagers();
	}
	if(item.type == "empresa"){
		$("#id_grupoempresa").val(item.CODEMP);
		$("#txt_grupoempresa").val(item.EMP);
	}
	if(item.type == "filial"){
		$("#id_empresafilial").val(item.CODFIL);
		$("#txt_empresafilial").val(item.FIL);
	}
	if(item.type == "grupoProduto"){
		$("#idGrupoProdServico___"+INDEX).val(item.CODIGO);
		$("#textGrupoProdServico___"+INDEX).val(item.DESCRICAO);
	}
	if(item.type == "produto"){
		$("#idCodProdServico___"+INDEX).val(item.PROD);
		$("#textCodProdServico___"+INDEX).val(item.DESCRICAO);
		$("#text_unidadeMedida___"+INDEX).val(item.UM);
		$("#id_unidadeMedida___"+INDEX).val(item.UM);
		$("#id_armazemProd___"+INDEX).val(item.ARMAZEM);
		$("#text_armazemProd___"+INDEX).val(item.DESCARMAZEM);
	}
	if(item.type == "armazem"){
		$("#id_armazemProd___"+INDEX).val(item.CODIGO);
		$("#text_armazemProd___"+INDEX).val(item.DESCRICAO);
	}
	if(item.type == "un"){
		$("#id_unidadeMedida___"+INDEX).val(item.UNIMED);
		$("#text_unidadeMedida___"+INDEX).val(item.DESCPO);
	}
	if(item.type == "requisicoes"){				
		$("#zoom_requisicaoMaterial").val(item.numFluig);
		getDadosRequisicao();
	}
}

function getDadosRequisicao(){
	
	var empresa    = $("#id_grupoempresa").val();
	var filial     = $("#id_empresafilial").val();
	var requisicao = $("#zoom_requisicaoMaterial").val();
	
	var empresaFilter    = DatasetFactory.createConstraint("empresa", empresa, empresa, ConstraintType.MUST);
	var filialFilter     = DatasetFactory.createConstraint("filial", filial, filial, ConstraintType.MUST);
	var requisicaoFilter = DatasetFactory.createConstraint("numFluig",requisicao, requisicao, ConstraintType.MUST);
	
	var dataset = DatasetFactory.getDataset("ds_protheus_detalhe_requisicao", null, [empresaFilter, filialFilter, requisicaoFilter], null);

	cleanChilds(['tableProduto']);

	if(dataset != null && dataset.values.length > 0){		
		console.log("Dataset : "+dataset.values.length);
		console.log("Dataset : "+dataset.values);	
		for(var i=0; i < dataset.values.length; i++){
			console.log("i : "+i);			

			var index = wdkAddChild('tableProduto');
			$("#idGrupoProdServico___"+index).val(dataset.values[i].GRPPROD);
			$("#textGrupoProdServico___"+index).val(dataset.values[i].DESGRPPROD);
			$("#idCodProdServico___"+index).val(dataset.values[i].PRODUTO);
			$("#textCodProdServico___"+index).val(dataset.values[i].DESPRODUTO);
			$("#textQuantidadeProd___"+index).val(dataset.values[i].QUANT);
			$("#text_unidadeMedida___"+index).val(dataset.values[i].UN);
			$("#id_unidadeMedida___"+index).val(dataset.values[i].UN);
			$("#textDtProd___"+index).val(dataset.values[i].CGRUPO);
			$("#id_armazemProd___"+index).val(dataset.values[i].LOCAL);
			$("#text_armazemProd___"+index).val(dataset.values[i].DESLOCAL);
			$("#itemRequisicao___"+index).val(dataset.values[i].ITEM);
			$("#textDtProd___"+index).val(dataset.values[i].NECESSIDADE);
			
			enableField($("#textQuantidadeProd___"+index), true);
			enableField($("#deleteProduto___"+index), true);
			
		}		
		
	}
}

function activeDynamicType(){
	
	$('#cmb_tipo_solicitacao').change(function(){
		
		if(this.value == '2') {
			enableContainer("#panelItens", false);
					
		}else{
			enableContainer("#panelItens", true);
			$(":input[name^='textGrupoProdServico___']").each(function() {
				var index = this.id.split("___")[1];				
				enableField($("#textGrupoProdServico___"+index), false);
				enableField($("#textCodProdServico___"+index), false);				
				enableField($("#textQuantidadeAtend___"+index), false);
				enableField($("#id_unidadeMedida___"+index), false);
				enableField($("#textDtProd___"+index), false);
				enableField($("#text_armazemProd___"+index), false);				
			}); 		
								
		}
		
	});
	
}

function getCompanyAndBranch(){
	var dataset = DatasetFactory.getDataset("ds_protheus_empresa_filial", null, null, null);
	if(dataset != null && dataset.values.length > 0){
		$("#id_grupoempresa").val(dataset.values[0].CODEMP);
		$("#txt_grupoempresa").val(dataset.values[0].EMP);
		$("#id_empresafilial").val(dataset.values[0].CODFIL);
		$("#txt_empresafilial").val(dataset.values[0].FIL);
	}
}

function disableChildren(){
	if(CURRENT_STATE != INICIO && CURRENT_STATE != 0){
		$("#itens").find("input").each(function(index, value){
			if(this.id.indexOf("___") > -1){
				this.setAttribute("disabled", true);
			}
		});
	}
}

function cleanChilds(tables){
	for(var i in tables){
		$('#'+tables[i]).find('td').each(function(index) {			
			if(index > 1) fnWdkRemoveChild(this);
		});
	}
}