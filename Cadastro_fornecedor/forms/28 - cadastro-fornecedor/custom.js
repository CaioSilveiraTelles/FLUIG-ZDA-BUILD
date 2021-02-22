var FOLDER_UPLOAD = "30";
$(document).ready(function(){
	removeSpecialChars();
	activeMask();
	activeDynamicType();
	activeCalendar();
	validateFormOnRuntime();
	requiredFieldsRule();
	validateCustomField();
	enableFields();
	bindZoom();
	bindings();
	loadAttchaments();	
});

function loadAttchaments(){
	
	$(".docsPublish").each(function() {
		 if(this.value != ""){
			 var doc = this.value;
			 var name = $(this).prev().val();
			 
			 $(this).parent().find("div[class*=labelDocument]")
			 				 .append("<h4 id=\""+doc+"\">"+name+"<span class=\"close\">×</span></h4>");
			 
			 $(this).parent().find("input[type*=file]").hide();
		 }
	});
	
	$(document).on('click', '.labelDocument', function(){
		deleteDocument($(this).prev().val(),this);
	});
	
	$(function(){
		$('.upload').fileupload({
		    dataType: 'json',
		    done: function (e, data) {
		    	uploadFile(FOLDER_UPLOAD, data.result.files[0],this.id);
		    }
		});
	});
}

function uploadFile(folder,file,field){

	var cic = $("#nm_cpf_cnpj").val().replace(".","").replace("-","").replace("/","").replace(".","");
	var taxionomia = taxionomiaAnexos(field);
	var fileName = cic+"_"+taxionomia;

	 $.ajax({
         async : false,
         type : "POST",
         contentType: "application/json",
         url : '/api/public/ecm/document/createDocument',
 		 data: JSON.stringify({
 			"description": fileName,
 			"parentId": folder,
 			"attachments": [{
 				"fileName": file.name
 			}],
 		}),
 		error: function() {
 			toastBox('danger', 'Falha ao enviar');
 			return false;
 		},
 		success: function(data) {
 			toastBox('info', "Documento publicado - " + fileName)
 			$("#"+field).hide().next().val(fileName).next().val(data.content.id)
 								.next().append("<h4 id=\""+data.content.id+"\">"+fileName+"<span class=\"close\">×</span></h4>");
 			
 			updatePublishList();
 		},
 	});
}

function deleteDocument(doc,field){
	 $.ajax({
		  async : false,
		  type : "POST",
		  contentType: "application/json",
		  url : '/api/public/ecm/document/remove',
		  data: JSON.stringify({
		   "id": doc,
		  }),
		  error: function(e){
			  toastBox('danger', 'Erro ao excluir documento.');
		  },
		  success: function(data){
			  toastBox('info', 'Documento excluido');
			  $("#"+doc).remove();
			  $(field).parent().find("input[type*=hidden]").val("");
			  $(field).parent().find("input[type*=file]").show();
			  updatePublishList();
		  },
	 	});
}

function updatePublishList(){
	var docList = new Array();
	$(".docsPublish").each(function() {
		 if(this.value != ""){
			 docList.push(this.value);
		 }
	});
	$("#listDocs").val(docList.toString());
}

var index;
function bindZoom(){
	$("#btn_grupoempresa").click(function(){
		$("#id_empresafilial").val("");
		$("#txt_empresafilial").val("");
		
		var dataset = "ds_protheus_empresa_filial"; 
		var campos = "CODEMP, Código,EMP,Empresa";
		var resultFields = "CODEMP,EMP";
		var type = "empresa";
		var filter = "";
		var titulo = "Empresa";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_empresafilial").click(function(){
		var empresa = $("#id_grupoempresa").val();
		if(empresa == ""){
			alertBox("É necessário informar a Empresa");
		}else{
			var dataset = "ds_protheus_empresa_filial"; 
			var campos = "CODFIL, Código,FIL,Filial";
			var resultFields = "CODFIL,FIL";
			var type = "filial";
			var filter = "empresa,"+empresa;
			var titulo = "Filial";
			openZoom(dataset,campos,resultFields,type,titulo,filter);
		}
	});
	
	$("#btn_estado").click(function(){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
		}else{
			$("#text_Cod_Municipio").val("");
			$("#text_Municipio").val("");
			
			var dataset = "ds_protheus_estado"; 
			var campos = "codigo, Código,estado,Estado";
			var resultFields = "codigo,estado";
			var type = "estado";
			var filter = "empresa,"+empresa+",filial,"+filial;
			var titulo = "Estado";
			openZoom(dataset,campos,resultFields,type,titulo,filter);
		}
	});
	
	$("#btn_cod_municipio").click(function(){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		var estado = $("#nm_estado").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		if(estado == ""){
			alertBox("É necessário informar o Estado");
			return false;
		}		
		
		var dataset = "ds_protheus_municipio"; 
		var campos = "codigo, Código,estado,Estado,municipio,Município";
		var resultFields = "codigo,estado,municipio";
		var type = "municipio";
		var filter = "empresa,"+empresa+",filial,"+filial+",estado,"+estado;
		var titulo = "Municipio";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_cod_ddi").click(function(){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		var dataset = "ds_protheus_ddi"; 
		var campos = "codigo, Código,pais,País";
		var resultFields = "codigo,pais";
		var type = "ddi";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "DDI";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$(document).on('click', '.btnCodDdiSocio', function(){		
		index = $(this).prev()[0].id.split("___")[1];
		
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		
		var dataset = "ds_protheus_ddi"; 
		var campos = "codigo, Código,pais,País";
		var resultFields = "codigo,pais";
		var type = "ddisocio";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "ddi";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});	
	
	$(document).on('click', '.btnZoomProduto', function(){
		index = $(this).prev()[0].id.split("___")[1];
		
		$("#Text_CodSubItem___"+index).val("");
		$("#Text_DescSubItem___"+index).val("");
		
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		var dataset = "ds_protheus_grupo_produto"; 
		var campos = "codigo, Código,descricao,Descrição";
		var resultFields = "codigo,descricao";
		var type = "produto";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "Produto";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
		
	});
	
	$(document).on('click', '.btnZoomSubProduto', function(){
		index = $(this).prev()[0].id.split("___")[1];
		
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		var produto = $("#Text_CodProdServico___"+index).val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		if(produto == ""){
			alertBox("É necessário informar produto");
			return false;
		}
		var dataset = "ds_protheus_sub_item"; 
		var campos = "codigo, Código,descricao,Descrição";
		var resultFields = "codigo,descricao";
		var type = "subProduto";
		var filter = "empresa,"+empresa+",filial,"+filial+",produto,"+produto;
		var titulo = "SubItem";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_cod_pais").click(function(){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		var dataset = "ds_protheus_pais"; 
		var campos = "pais, Codigo,descricao,Descrição";
		var resultFields = "pais,descricao";
		var type = "pais";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "País";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_cod_pais_nacionalidade").click(function(){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		var dataset = "ds_protheus_pais"; 
		var campos = "pais, Codigo,descricao,Descrição";
		var resultFields = "pais,descricao";
		var type = "paisNacional";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "País";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$(document).on('click', '.btnZoomEstadoSocio', function(){
		index = $(this).prev()[0].id.split("___")[1];
		
		$("#text_Cod_MunicipioSocio___"+index).val("");
		$("#text_Municipio_socio___"+index).val("");
		
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		
		var dataset = "ds_protheus_estado"; 
		var campos = "codigo, Código,estado,Estado";
		var resultFields = "codigo,estado";
		var type = "estadoSocio";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "Estado";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$(document).on('click', '.btnZoomMunicipioSocio', function(){
		index = $(this).prev()[0].id.split("___")[1];
		
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		var estado = $("#text_Estado_socio___"+index).val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		if(estado == ""){
			alertBox("É necessário informar o Estado");
			return false;
		}		
		
		var dataset = "ds_protheus_municipio"; 
		var campos = "codigo, Código,estado,Estado,municipio,Município";
		var resultFields = "codigo,estado,municipio";
		var type = "municipioSocio";
		var filter = "empresa,"+empresa+",filial,"+filial+",estado,"+estado;
		var titulo = "Municipio";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$(document).on('click', '.btnZoomPaisSocio', function(){
		//index = $(this).prev().context.id.split("___")[1];
		index = $(this).prev()[0].id.split("___")[1];
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial");
			return false;
		}
		var dataset = "ds_protheus_pais"; 
		var campos = "pais, Codigo,descricao,Descrição";
		var resultFields = "pais,descricao";
		var type = "paisSocio";
		var filter = "empresa,"+empresa+",filial,"+filial;
		var titulo = "País";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_bairro").click(function(){
		var dataset = "ds_pessoa_bairros"; 
		var campos = "codBairro, Codigo,nomBairro,Bairro";
		var resultFields = "codBairro,nomBairro";
		var type = "bairro";
		var filter = "codBairro,,nomBairro,";
		var titulo = "Bairro";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$(document).on('click', '.bairroSocio', function(){
		index = $(this).prev()[0].id.split("___")[1];
	
		var dataset = "ds_pessoa_bairros"; 
		var campos = "codBairro, Codigo,nomBairro,Bairro";
		var resultFields = "codBairro,nomBairro";
		var type = "bairroSocio";
		var filter = "codBairro,,nomBairro,";
		var titulo = "Bairro";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_atividade_eco").click(function(){
		var dataset = "ds_pessoa_atividades_economicas"; 
		var campos = "codCnae, Codigo,dscCnae,Descrição";
		var resultFields = "codCnae,dscCnae";
		var type = "atividadeEco";
		var filter = "codCnae,,dscCnae,";
		var titulo = "Atividade Economica";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_banco").click(function(){
		var dataset = "ds_pessoa_bancos"; 
		var campos = "codBanco, Codigo,nomBanco,Banco";
		var resultFields = "codBanco,nomBanco";
		var type = "banco";
		var filter = "codBanco,,nomBanco,";
		var titulo = "Banco";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	$("#btn_agencia").click(function(){
		var banco = $("#cod_Banco").val();
		if(banco == ""){
			alertBox("É necessário informar o banco");
			return false;
		}
		var dataset = "ds_pessoa_agencia"; 
		var campos = "codAgencBncria, Codigo Agencia,codBanco,Banco, codDvAgenc,Código DV,nomAgencBncria,Nome Agência,numAgenc,Número Agência";
		var resultFields = "codAgencBncria,codBanco,codDvAgenc,nomAgencBncria,numAgenc";
		var type = "agencia";
		var filter = "codAgencBncria,,codBanco,"+banco+",codDvAgenc,,nomAgencBncria,,numAgenc,";
		var titulo = "Agencia";
		openZoom(dataset,campos,resultFields,type,titulo,filter);
	});
	
	
}

function openZoom(dataset,campos,resultFields,type,titulo,filter){
    window.open("/webdesk/zoom.jsp?datasetId="+dataset+
    			"&dataFields="+campos+
    			"&resultFields="+resultFields+
    			"&type="+type+
    			"&filterValues="+filter+
    			"&title="+titulo, "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
}

function setSelectedZoomItem(selectedItem) {	
    switch (selectedItem.type) {
		case 'empresa':
			$("#id_grupoempresa").val(selectedItem.CODEMP);
			$("#txt_grupoempresa").val(selectedItem.EMP);
			break;
		case 'filial':
			$("#id_empresafilial").val(selectedItem.CODFIL);
			$("#txt_empresafilial").val(selectedItem.FIL);
			break;
		case 'estado':
			$("#nm_estado").val(selectedItem.codigo);
			break;
		case 'municipio':
			$("#text_Cod_Municipio").val(selectedItem.codigo);
			$("#text_Municipio").val(selectedItem.municipio);
			break;
		case 'ddi':
			$("#text_DDI").val(selectedItem.codigo);
			break;
		case 'ddisocio':
			$("#Text_ddi_socio___"+index).val(selectedItem.codigo);
			break;			
		case 'produto':			
			$("#Text_CodProdServico___"+index).val(selectedItem.codigo);
			$("#Text_DescProdServico___"+index).val(selectedItem.descricao);
			break;
		case 'subProduto':
			$("#Text_CodSubItem___"+index).val(selectedItem.codigo);
			$("#Text_DescSubItem___"+index).val(selectedItem.descricao);
			break;
		case 'pais':
			$("#text_codPais").val(selectedItem.pais);
			$("#text_Pais").val(selectedItem.descricao);
			break;
		case 'estadoSocio':
			$("#text_Estado_socio___"+index).val(selectedItem.codigo);
			break;
		case 'municipioSocio':
			$("#text_Cod_MunicipioSocio___"+index).val(selectedItem.codigo);
			$("#text_Municipio_socio___"+index).val(selectedItem.municipio);
			break;
		case 'paisSocio':
			$("#text_Pais_socio_code___"+index).val(selectedItem.pais);
			$("#text_Pais_socio___"+index).val(selectedItem.descricao);
			break;
		case 'paisNacional':
			$("#cod_nacionalidade").val(selectedItem.pais);
			$("#text_Nacionalidade_for").val(selectedItem.descricao);
			break;
		case 'bairro':
			$("#cod_Bairro").val(selectedItem.codBairro);
			$("#text_Bairro").val(selectedItem.nomBairro);
			break;
		case 'bairroSocio':
			$("#cod_Bairro_socio___"+index).val(selectedItem.codBairro);
			$("#text_Bairro_socio___"+index).val(selectedItem.nomBairro);
			break;
		case 'atividadeEco':			
			$("#cod_ativEconomica").val(selectedItem.codCnae);						
			$("#text_ativEconomica").val(selectedItem.dscCnae);			
			break;
		case 'banco':
			$("#cod_Banco").val(selectedItem.codBanco);
			$("#text_Banco").val(selectedItem.nomBanco);
			break;
		case 'agencia':
			$("#numAgenc").val(selectedItem.numAgenc);
			$("#codDvAgenc").val(selectedItem.codDvAgenc);
			$("#codAgencBncria").val(selectedItem.codAgencBncria);
			$("#text_Agncia").val(selectedItem.nomAgencBncria);
			break;
		default:
			break;
	}
}

function activeCalendar(){
	FLUIGC.calendar('#div_DataFinalValidade');

    var date1 = new Date();
    FLUIGC.calendar('#dtVencIsencaoPIS,#dtVencIsencaoCONFIS,#dtVencIsencaoCSLL,#dtVencIsencaoIRRF,#dtVencIsencaoISS,#dtVencIsencaoINSS', {
       minDate: date1.getDate()+'/'+(date1.getMonth()+1)+'/'+date1.getFullYear(),       
       language: 'pt-br',
    });	
	
    var date = new Date();
    FLUIGC.calendar('#dtSerasa, #div_DtEmis, #div_DtNascimento,#div_DataInicioValidade, #div_CapSocial', {
       maxDate: date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear(),       
       language: 'pt-br',
    });	

}

function removeSpecialChars() {
	specialChars = function (e, $element) {
		var keys = [16, 17, 35, 36, 37, 38, 39, 40, 8, 46];
		if (e && keys.indexOf(e.keyCode) == -1) {
			if (/[Ã�Ã€ÃƒÃ‚Ã„Ã‰ÃˆÃŠÃ‹Ã�ÃŒÃŽÃ�Ã“Ã’Ã”Ã•Ã–ÃšÃ™Ã›ÃœÂ´`~Â¨^Ã‡]/i.test($element.val()) || e.type=="focusout") { //faz o replace somente quando for digitado caracter especial
				$element.val( $element.val().toUpperCase());
			}
		}
	};
	$(document).on('keyup', 'input[type=text]:not([readonly]),textarea:not([readonly])', function(e) { specialChars(e, $(this)) });
	$(document).on('blur', 'input[type=text]:not([readonly]),textarea:not([readonly])', function(e) { specialChars(e, $(this)) });
	$("input[type=text],textarea:not([readonly])").addClass("text-uppercase");
}


function activeMask(){
	//Fluig não disponibiliza o objeto Mask 
	
	if(FORM_MODE != 'VIEW'){
	
		setTimeout(function(){
			var tipoFornecedor = $('#nm_tipo_fornecedor').val();
			if(tipoFornecedor == 'F') $('#nm_cpf_cnpj').mask('000.000.000-00',{reverse: true});
			else $('#nm_cpf_cnpj').mask('00.000.000/0000-00',{reverse: true});
		}, 1000);		
		
	}	
	
}

/**
 * Seta dinamicamente a mascara dos campos.
 * 
 * @returns void.
 */
function activeDynamicType(){
	//validateDynamicState();	
	
	$('#nm_tipo_fornecedor').change(function(){
		if($('#nm_cpf_cnpj').val() == "")
		$('#nm_cpf_cnpj').val('');
		//cleanChilds(['tableSocio']);
		//validateDynamicState();
		habilitaDesabilitaCampos(this.value);

	});
	
	$('#text_DataInicioValidade').change(function(){
		
		if(this.val() != "" || $('#text_IdentificaoFiscalExterior').val() == ""){
			alertBox('Informe a Identificação Fiscal no Exterior!');
			this.val("");
		}
		
	});
	
	$('#text_DataFinalValidade').change(function(){
		
		if(validaDataIdentFiscalExt()){
			alertBox('Data final não pode ser menor que data inicial!');
			this.val("");
		}
		
	});			
	
	$(document).on('change', '.typeSocio', function(){	
		index = this.id.split("___")[1];			
		
		if(this.value == 'F'){
			$('#text_CPFCNPJ_socio___'+index).mask('000.000.000-00',{reverse: true});
			$('#text_sexo_socio___'+index).prev().addClass("required");		
			$('#text_sexo_socio___'+index).parent().show();
			
/*			if($('#text_CPFCNPJ_socio___'+index).val() == ""){
			
				$('#text_sexo_socio___'+index).val("");
				$('#text_CPFCNPJ_socio___'+index).val("");
				
			}*/
						
		}else{
			$('#text_CPFCNPJ_socio___'+index).mask('00.000.000/0000-00',{reverse: true});
			$('#text_sexo_socio___'+index).prev().removeClass("required");
			$('#text_sexo_socio___'+index).parent().hide();
			$('#text_sexo_socio___'+index).val("");
		}
	});
	
	$(document).on('blur', '.cpfCnpjSocio', function(){	
		index = this.id.split("___")[1];
		
		var isValid = false;
		
		if($('#text_CPFCNPJ_socio___'+index).val() == '') return;
		
		if($('#text_tipo_socio___'+index).val() == 'F') isValid = validateCpf($('#text_CPFCNPJ_socio___'+index).val());
		else if($('#text_tipo_socio___'+index).val() == 'J') isValid = validateCnpj($('#text_CPFCNPJ_socio___'+index).val());
		
		if(isValid == false){
			alertBox('O CPF/CNPJ informado é inválido!');
			$('#text_CPFCNPJ_socio___'+index).val("");
			return;
		}		
		
	});
	
	$(document).on('change', '.atuanteSocio', function(){	
		index = this.id.split("___")[1];
		
		if(this.value == 'S'){
			
			$('#text_CPFCNPJ_socio___'+index).prev().addClass("required");
			
			$('#dEstado___'+index).addClass("required");
			$('#di'+index).addClass("required");
			$('#dM'+index).addClass("required");
			$('#text_TipoLogradouro_socio___'+index).prev().addClass("required");
			$('#text_CEP_socio___'+index).prev().addClass("required");
			$('#text_Email_socio___'+index).prev().addClass("required");
			$('#text_Numero_socio___'+index).prev().addClass("required");
			$('#Text_ddd_socio___'+index).prev().addClass("required");
			$('#text_Telefone_socio___'+index).prev().addClass("required");
			
		}else{
			
			$('#text_CPFCNPJ_socio___'+index).prev().removeClass("required");
			
			$('#dEstado___'+index).removeClass("required");
			$('#di'+index).removeClass("required");
			$('#dM'+index).removeClass("required");
			$('#text_TipoLogradouro_socio___'+index).prev().removeClass("required");
			$('#text_CEP_socio___'+index).prev().removeClass("required");
			$('#text_Email_socio___'+index).prev().removeClass("required");
			$('#text_Numero_socio___'+index).prev().removeClass("required");
			$('#Text_ddd_socio___'+index).prev().removeClass("required");
			$('#text_Telefone_socio___'+index).prev().removeClass("required");
			
		}
	});	
	
	$(document).on('change', '.nmSocio', function(){
		console.log("change nome");
		var index = this.id.split("___")[1];	
		var nome_fornecedor = $("#text_NomeSocio___"+index).val();
		console.log(nome_fornecedor);
		//$("#nm_fornecedor_delete___"+index).val(nome_fornecedor);
		
	});
	
	$(document).on("mouseenter mouseleave",'.cepSocio', function(){
		$(this).mask('00000-000',{reverse: true});
	});
	
	$(document).on("mouseenter mouseleave",'.onlyNumber', function(){
		$(this).mask('0000000000',{reverse: true});
	});
	
	$(document).on('focus','.money',function(){
		$('.money').mask('#00.000.000.000,00',{reverse: true});
	});
	
	$(document).on('focus','.socioMask',function(){
		$(this).mask('000000',{reverse: true});
	});
	
}

function habilitaDesabilitaCampos(campo){
	
	if(campo == 'F'){	
		
		$('#id_ins_municipal').parent().hide();
		$('#id_insc_estadual').parent().hide();
		$('#text_NIRE').parent().hide();
		$('#div_CapSocial').hide();
		$('#text_ValorCapSocial').parent().hide();
		$('#div_text_ativEconomica').parent().hide();			
		$('#text_DocConstituicao').parent().hide();
		$('#text_sexo').parent().show();
		$('#div_tipoDoc').parent().show();
		$('#text_ID').parent().show();
		$('#text_ORGEmis').parent().show();
		$('#text_DtEmis').parent().show();
		$('#div_EstadoCivil').parent().show();
		$('#text_Conjuge').parent().show();
		$('#text_Mae').parent().show();
		$('#text_Pai').parent().show();
		$('#text_Naturalidade').parent().show();
		$('#text_Nacionalidade').parent().show();
		$('#text_INSS').parent().show();
		$('#div_DtNascimento').parent().show();			
		
		$('#panelSocio').hide();
		//$('#panelFiscal').hide();
		$('#headerFiscal,#fiscalPIS,#fiscalCONFIS,#fiscalCSLL').hide();
		
	}else if(campo == 'J') {
			
		$('#id_ins_municipal').parent().show();
		$('#id_insc_estadual').parent().show();
		$('#text_NIRE').parent().show();
		$('#div_CapSocial').show();
		$('#text_ValorCapSocial').parent().show();
		$('#div_text_ativEconomica').parent().show();	
		$('#text_DocConstituicao').parent().show();
		$('#text_sexo').parent().hide();
		$('#div_tipoDoc').parent().hide();
		$('#text_ID').parent().hide();	
		$('#text_ORGEmis').parent().hide();
		$('#text_DtEmis').parent().hide();
		$('#div_EstadoCivil').parent().hide();
		$('#text_Conjuge').parent().hide();
		$('#text_Mae').parent().hide();
		$('#text_Pai').parent().hide();
		$('#text_Naturalidade').parent().hide();
		$('#text_Nacionalidade').parent().hide();
		$('#text_INSS').parent().hide();
		$('#div_DtNascimento').parent().hide();		
		
		$('#panelSocio').show();
		//$('#panelFiscal').show();
		$('#headerFiscal,#fiscalPIS,#fiscalCONFIS,#fiscalCSLL').show();
		
	}else{
		
		$('#id_ins_municipal').parent().show();
		$('#id_insc_estadual').parent().show();
		$('#text_NIRE').parent().show();
		$('#div_CapSocial').show();
		$('#text_ValorCapSocial').parent().show();
		$('#div_text_ativEconomica').parent().show();			
		$('#text_sexo').parent().show();
		$('#div_tipoDoc').parent().show();
		$('#text_ID').parent().show();	
		$('#text_ORGEmis').parent().show();
		$('#text_DtEmis').parent().show();
		$('#div_EstadoCivil').parent().show();
		$('#text_Conjuge').parent().show();
		$('#text_Mae').parent().show();
		$('#text_Pai').parent().show();
		$('#text_Naturalidade').parent().show();
		$('#text_Nacionalidade').parent().show();
		$('#text_INSS').parent().show();
		$('#div_DtNascimento').parent().show();	
		$('#text_DocConstituicao').parent().show();		
		
		$('#panelSocio').show();
		$('#panelFiscal').show();
		
	}
	
	if($('#text_Atuacao_brasil').val() == "S"){
		
		$("#dtSerasa").addClass("required");
		$("#text_ObservaoSerasa").prev().addClass("required");	
		$("#divAtuanteExterior").hide();
	}else{
		
		$("#dtSerasa").removeClass("required");
		$("#text_ObservaoSerasa").prev().removeClass("required");			
		$("#divAtuanteExterior").show();
	}
		
	
}

function trataCamposSocios(campo, indice){
	
	if(campo == 'F') {
		
		$('#text_sexo_socio___'+indice).prev().addClass("required");		
		$('#div_sexo_socio___'+indice).show();
	}else{
		
		$('#text_sexo_socio___'+indice).prev().removeClass("required");
		$('#div_sexo_socio___'+indice).hide();
	}
	
}

function trataCampos(campo){

	if(campo == 'F') {
		$('#nm_cpf_cnpj').mask('000.000.000-00',{reverse: true});
		$("#text_NIRE").prev().removeClass("required");
		$("#text_sexo").prev().addClass("required");
		
		if($('#text_Atuacao_brasil').val() == "S"){
			
			$("#text_tipoDoc").prev().addClass("required");
			$("#text_ID").prev().addClass("required");			
			$("#text_ORGEmis").prev().addClass("required");
			$("#text_DtEmis").prev().addClass("required");
			$("#text_EstadoCivil").prev().addClass("required");					
			//$("#text_Naturalidade").prev().addClass("required");
			//$("#text_Nacionalidade").addClass("required");
			$("#text_DtNascimento").prev().addClass("required");
			$("#dtSerasa").addClass("required");
			$("#text_ObservaoSerasa").prev().addClass("required");	
						
			$("#div_CapSocial").addClass("required");
			$("#text_ValorCapSocial").prev().removeClass("required");
			$("#div_text_ativEconomica").removeClass("required");
			$("#Select_cooperativa").prev().removeClass("required");
			$("#Text_OptSimp").prev().removeClass("required");
			$("#id_insc_estadual").prev().removeClass("required");
			$("#id_ins_municipal").prev().removeClass("required");	
			$("#divAtuanteExterior").hide();	
			
			$("#text_CEP").prev().addClass("required");
			$("#text_DDD").prev().addClass("required");
			
			$("#text_isencaoIRRF").prev().addClass("required");
			$("#text_isencaoISS").prev().addClass("required");
			$("#text_isencaoINSS").prev().addClass("required");
			
		}else{			
			
			//$("#text_IdentificaoFiscalExterior").prev().addClass("required");
			$("#dtSerasa").removeClass("required");	
			$("#text_ObservaoSerasa").prev().removeClass("required");
			$("#divAtuanteExterior").show();
			$("#div_text_ativEconomica").removeClass("required");
			$("#id_insc_estadual").prev().removeClass("required");
			$("#id_ins_municipal").prev().removeClass("required");		
			$("#div_CapSocial").removeClass("required");
			
			$("#Text_OptSimp").prev().removeClass("required");
			
			$("#text_CEP").prev().removeClass("required");
			$("#text_DDD").prev().removeClass("required");
			
			//$("#text_isencaoIRRF").prev().removeClass("required");
			$("#text_isencaoISS").prev().removeClass("required");
			$("#text_isencaoINSS").prev().removeClass("required");			
		}
				
		$("#text_Nome").prev().addClass("required");
		$("#nm_nome_abreviado").prev().addClass("required");
		$("#nm_nome_fantasia").prev().addClass("required");
		
	}else if(campo == 'J') {
		
		$('#nm_cpf_cnpj').mask('00.000.000/0000-00',{reverse: true});
		$("#text_sexo").prev().removeClass("required");		
			$('#text_sexo').val('');
		
		$("#Select_cooperativa").prev().addClass("required");		
		$("#id_insc_estadual").prev().addClass("required");
		$("#id_ins_municipal").prev().addClass("required");				
		$("#div_text_ativEconomica").addClass("required");
		
		if($('#text_Atuacao_brasil').val() == "S"){
						
			$("#Select_cooperativa").prev().addClass("required");
			$("#Text_OptSimp").prev().addClass("required");
			$("#id_insc_estadual").prev().addClass("required");
			$("#id_ins_municipal").prev().addClass("required");
			$("#div_text_ativEconomica").addClass("required");
			$("#text_NIRE").prev().addClass("required");
			
			if($("#Select_tipo_cadastro").val() == "1"){
				$("#div_CapSocial").addClass("required");
				$("#text_ValorCapSocial").prev().addClass("required");
			}
			
			$("#text_ativEconomica").prev().addClass("required");
			$("#text_ativEconomica").prev().addClass("required");

			$("#text_tipoDoc").prev().removeClass("required");
			$('#text_tipoDoc').val('');
			$("#text_ID").prev().removeClass("required");		
			$('#text_ID').val('');
			$("#text_ORGEmis").prev().removeClass("required");
			$('#text_ORGEmis').val('');
			$("#text_DtEmis").prev().removeClass("required");
			$('#text_DtEmis').val('');
			$("#text_EstadoCivil").prev().removeClass("required");
			$('#text_EstadoCivil').val('');		
			$('#text_Conjuge').val('');
			//$("#text_Naturalidade").prev().removeClass("required");
			$('#text_Naturalidade').val('');
			//$("#text_Nacionalidade").removeClass("required");
			$('#text_Nacionalidade_for').val('');
			$("#text_INSS").prev().removeClass("required");
			$('#text_INSS').val('');
			$("#text_DtNascimento").prev().removeClass("required"); 
			$('#text_DtNascimento').val('');
			
			$("#text_CEP").prev().addClass("required");
			$("#text_DDD").prev().addClass("required");
			
			$("#text_isencaoPIS").prev().addClass("required");
			$("#text_isencaoCOFINS").prev().addClass("required");
			$("#text_isencaoCSLL").prev().addClass("required");		
			
			$("#text_isencaoIRRF").prev().addClass("required");
			$("#text_isencaoISS").prev().addClass("required");
			$("#text_isencaoINSS").prev().addClass("required");			
			
			$("#Text_OptSimp").prev().addClass("required");
			
			//$("#text_IdentificaoFiscalExterior").prev().removeClass("required");
	/*		$('#text_IdentificaoFiscalExterior').val('');
			$("#text_DataInicioValidade").prev().removeClass("required");
			$('#text_DataInicioValidade').val('');
			$("#text_DataFinalValidade").prev().removeClass("required");
			$('#text_DataFinalValidade').val('');*/	
			
		}else{			
			//$("#text_IdentificaoFiscalExterior").prev().addClass("required");		
			$("#text_NIRE").prev().removeClass("required");
			$("#div_CapSocial").removeClass("required");
			$("#text_ValorCapSocial").prev().removeClass("required");			
			$("#text_CEP").prev().removeClass("required");
			$("#text_DDD").prev().removeClass("required");
			
			$("#text_isencaoIRRF").prev().addClass("required");
			$("#text_isencaoISS").prev().addClass("required");
			$("#text_isencaoINSS").prev().removeClass("required");		
			
			$("#text_isencaoPIS").prev().addClass("required");
			$("#text_isencaoCOFINS").prev().addClass("required");
			$("#text_isencaoCSLL").prev().removeClass("required");	
			
			$("#Text_OptSimp").prev().removeClass("required");
			
		}
	
		$("#text_Nome").prev().addClass("required");
		$("#nm_nome_abreviado").prev().addClass("required");
		$("#nm_nome_fantasia").prev().addClass("required");
	
	}
}


function validateDynamicState(){
	if($('#nm_tipo_fornecedor').val() == "J"){
		if(CURRENT_STATE == "0") $('.buttonChild').show();
		else $('.buttonChild').hide();
	}else{
		if(CURRENT_STATE == "0") wdkAddChild('socioTable');
		$('.buttonChild').hide();
	}
}

function searchSupplier(cfornecedor,empresa,filial,tipo){
	
	var c1 = DatasetFactory.createConstraint("empresa", empresa, empresa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("filial", filial, filial, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CFORNECECOD", cfornecedor, cfornecedor, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CTIPO", tipo, tipo, ConstraintType.MUST);
	
	var supplier = DatasetFactory.getDataset("ds_protheus_consulta_fornecedor", null, [c1,c2,c3,c4], null);
	
	if(supplier.columns[0] == "erro"){
		alertBox(supplier.values[0].erro);
	}else{
		cleanChilds(['socioTable','produtoTable']);
		
		$("#text_codigo_pessoa").val(supplier.values[0].CCODIGOPESSOA);
		
		$("#text_EstadoCivil").val(supplier.values[0].CESTCIVIL);
		$("#text_ObservaoSerasa").val(supplier.values[0].COBSSER);
		$("#nm_estado").val(supplier.values[0].CESTADO);
		$("#text_DtNascimento").val(trataDataReturn(supplier.values[0].DDTNASC));
		$("#text_TelefoneAd1").val(supplier.values[0].CTELADIC1);
		$("#text_TelefoneAd2").val(supplier.values[0].CTELADIC2);
		$("#text_Nome").val(supplier.values[0].CRAZAOSOCIAL);
		$("#text_TelefoneAd3").val(supplier.values[0].CTELADIC3);
		$("#codDvAgenc").val(supplier.values[0].CDVAGE);
		$("#text_Telefone").val(supplier.values[0].CTELEFONE.trim());
		$("#text_isencaoCOFINS").val(supplier.values[0].CISENTOCOF);
		$("#text_isencaoCOFINS").change();
		
		$("#text_INSS").val(supplier.values[0].CINSS);
		$("#text_isencaoCSLL").val(supplier.values[0].CISENTOCSLL);
		$("#text_isencaoCSLL").change();
		
		$("#text_sexo").val(supplier.values[0].CSEXO);
		$("#id_ins_municipal").val(supplier.values[0].CINSMUNIC.trim());
		$("#Text_venc_inss_indeterminado").val(supplier.values[0].CTEMPLIMINARDTINSS);
		$("#Text_venc_inss_indeterminado").change();
		
		$("#text_venc_isencaoINSS").val(trataDataReturn(supplier.values[0].DVALIDLIMINARINSS));
		$("#text_venc_isencaoINSS").change();
		
		$("#nm_nome_fantasia").val(supplier.values[0].CNFANTASIA);
		$("#text_liminarisencaoCOFINS").val(supplier.values[0].CLIMINARCOF);
		$("#text_liminarisencaoCOFINS").change();
		
		$("#text_Bairro").val(supplier.values[0].CBAIRRO);
		$("#text_dv_conta").val(supplier.values[0].CDVCONTA.trim());
		$("#text_liminarisencaoINSS").val(supplier.values[0].CLIMINARINSS);
		$("#text_liminarisencaoINSS").change();

		$("#text_TpLogradouro").val(supplier.values[0].CTPLOG);
		
		$("#numAgenc").val(supplier.values[0].CAGENCIA.trim());	
		if(supplier.values[0].CAGENCIA.trim() != "" && supplier.values[0].CAGENCIA.trim() != "0"){
			$("#text_Agncia").val(getAgencia(supplier.values[0].CAGENCIA, supplier.values[0].CBANCO));
		}
		
		
		$("#text_ValorCapSocial").val(supplier.values[0].NVALCAPS);
		$("#Text_venc_cofins_indeterminado").val(supplier.values[0].CTEMPLIMINARDTCOF);
		$("#text_Numero").val(supplier.values[0].CNUMERO);
		$("#cloja").val(supplier.values[0].CLOJA);
		$("#text_DataFinalValidade").val(trataDataReturn(supplier.values[0].DFIMIDENTEXT));
		$("#text_isencaoIRRF").val(supplier.values[0].CISENTOIRFF);
		$("#text_isencaoIRRF").change();
		
		$("#text_liminarisencaoIRRF").val(supplier.values[0].CLIMINARIRFF);
		$("#text_liminarisencaoIRRF").change();		
		
		$("#text_Complemento").val(supplier.values[0].CCOMPLEMENTO);		
		$("#Text_venc_irrf_indeterminado").val(supplier.values[0].CTEMPLIMINARDTIRFF);
		$("#Text_venc_irrf_indeterminado").change();
		
		$("#text_Conta").val(supplier.values[0].CCONTA.replaceAll(" ",""));
		$("#text_DocConstituicao").val(supplier.values[0].CDOCCONSTITUICAO);
		$("#text_isencaoINSS").val(supplier.values[0].CISENTOINSS);
		$("#text_isencaoINSS").change();
		
		$("#text_Naturalidade").val(supplier.values[0].CNATURALIDADE);
		
		$("#text_isencaoISS").val(supplier.values[0].CISENTOISS);
		$("#text_isencaoISS").change();
		
		$("#nm_tipo_fornecedor").val(supplier.values[0].CTIPO).change();
		$("#text_EmailAd2").val(supplier.values[0].CEMAILADIC2);
		$("#text_EmailAd1").val(supplier.values[0].CEMAILADIC1);
		$("#text_Municipio").val(supplier.values[0].CMUNICIPIO);
		$("#text_NIRE").val(supplier.values[0].CNIRE);
		$("#text_Mae").val(supplier.values[0].CMAE);
		$("#ccodigo").val(supplier.values[0].CCODIGO);
		$("#Text_venc_csll_indeterminado").val(supplier.values[0].CTEMPLIMINARDTCSLL);
		$("#Text_venc_csll_indeterminado").change();
		
		$("#text_liminarisencaoPIS").val(supplier.values[0].CLIMINARPIS);
		$("#text_liminarisencaoPIS").change();
		
		$("#text_ID").val(supplier.values[0].CNUMDOC);
		
		$("#cod_nacionalidade").val(supplier.values[0].CNACIONALIDADE);
		
		$("#text_Nacionalidade_for").val(supplier.values[0].DNACIONALIDADE);
		
		$("#Text_venc_iss_indeterminado").val(supplier.values[0].CTEMPLIMINARDTISS);
		$("#Text_venc_iss_indeterminado").change();
		
		$("#text_Pais").val(supplier.values[0].CPAIS);
		$("#text_venc_isencaoPIS").val(trataDataReturn(supplier.values[0].DVALIDLIMINARPIS));
		$("#text_ORGEmis").val(supplier.values[0].CORGEMIS);
		$("#text_liminarisencaoCSLL").val(supplier.values[0].CLIMINARCSLL);
		$("#text_liminarisencaoCSLL").change();
		
		$("#text_Conjuge").val(supplier.values[0].CCONJUGE);
		$("#nm_nome_abreviado").val(supplier.values[0].CNOMEABREVIADO);
		$("#text_codPais").val(supplier.values[0].CCODPAIS);
		$("#text_venc_isencaoISS").val(trataDataReturn(supplier.values[0].DVALIDLIMINARINSS));
		$("#text_venc_isencaoISS").change();
		
		$("#text_DataSerasa").val(trataDataReturn(supplier.values[0].DDATASER));
		$("#text_DDI").val(supplier.values[0].CDDI);
		$("#text_NomeLogradouro").val(supplier.values[0].CENDERECO);
		$("#text_DDD").val(supplier.values[0].CDDD);
		$("#text_Email").val(supplier.values[0].CEMAIL);
		$("#text_venc_isencaoCOFINS").val(trataDataReturn(supplier.values[0].DVALIDLIMINARCOF));
		$("#text_venc_isencaoCOFINS").change();
		
		$("#text_venc_isencaoISS").val(trataDataReturn(supplier.values[0].DVALIDLIMINARISS));
		$("#text_venc_isencaoISS").change();
		
		$("#text_venc_isencaoCSLL").val(trataDataReturn(supplier.values[0].DVALIDLIMINARCSLL));
		$("#text_venc_isencaoCSLL").change();
		
		$("#text_CapSocial").val(trataDataReturn(supplier.values[0].DDATCAPS));
		$("#id_insc_estadual").val(supplier.values[0].CINSESTAD.trim());
		$("#Select_cooperativa").val(supplier.values[0].CCOOPERATIVA);
		$("#text_DataInicioValidade").val(trataDataReturn(supplier.values[0].DINICIDENTEXT));
		$("#text_JustDomicilio").val(supplier.values[0].CJUSTIFNCADBCO.rtrim());
		
		$("#text_isencaoPIS").val(supplier.values[0].CISENTOPIS);
		$("#text_isencaoPIS").change();
		
		$("#text_liminarisencaoISS").val(supplier.values[0].CLIMINARISS);
		$("#text_liminarisencaoISS").change();
		
		$("#text_DtEmis").val(trataDataReturn(supplier.values[0].DDTEMIS));
		$("#text_venc_isencaoIRRF").val(trataDataReturn(supplier.values[0].DVALIDLIMINARIRFF));
		$("#text_venc_isencaoIRRF").change();
		
		$("#text_IdentificaoFiscalExterior").val(supplier.values[0].CIDENTEXT.trim());
		$("#text_Pai").val(supplier.values[0].CPAI);
		$("#text_TelefoneFax").val(supplier.values[0].CFAX);
		$("#nm_cpf_cnpj").val(supplier.values[0].CCNPJCPF);
		activeMask();		
		$("#Text_venc_pis_indeterminado").val(supplier.values[0].CTEMPLIMINARDTPIS);
		$("#Text_venc_pis_indeterminado").change();
		
		$("#text_tipoDoc").val(supplier.values[0].CTIPODOC);
		
		$("#cod_ativEconomica").val(supplier.values[0].CATIVECO);
		$("#text_ativEconomica").val(getAtivEconomica(supplier.values[0].CATIVECO));
		
		$("#text_PaginaInternet").val(supplier.values[0].CHOMEPAGE);
		$("#Text_OptSimp").val(supplier.values[0].COPTSIMP);
		
		$("#cod_Banco").val(supplier.values[0].CBANCO);		
		if(supplier.values[0].CBANCO != "" && supplier.values[0].CBANCO != 0){
			$("#text_Banco").val(getBanco(supplier.values[0].CBANCO));
		}
		
		
		$("#text_CEP").val(supplier.values[0].CCEP);
		$("#text_Cod_Municipio").val(supplier.values[0].CCODMUNIC);
		
		var empresa = DatasetFactory.createConstraint("empresa", empresa, empresa, ConstraintType.MUST);
		var filial  = DatasetFactory.createConstraint("filial", filial, filial, ConstraintType.MUST);
		var pessoa  = DatasetFactory.createConstraint("pessoa", supplier.values[0].CCODIGOPESSOA, supplier.values[0].CCODIGOPESSOA, ConstraintType.MUST);		
		
		var datasetPasta = DatasetFactory.getDataset("consultaPastaForn", null, [empresa,filial,pessoa], null);
		
		$("#pastaForn").val(datasetPasta.values[0].PASTA);
		
		var produtos = jQuery.parseJSON(supplier.values[0].LISTAPROD);
		
		for(var i in produtos){			

			if(produtos[i].CGRUPO != ""){
			
				var index = wdkAddChild('tableProduto');			
				$("#Text_CodProdServico___"+index).val(produtos[i].CGRUPO);
				$("#Text_DescProdServico___"+index).val(produtos[i].CDESCGRUPO);			
				$("#text_cepom___"+index).val(produtos[i].CREGCEPOM);						
				$("#Text_CodSubItem___"+index).val(produtos[i].CCODIGO);
				$("#Text_DescSubItem___"+index).val(produtos[i].CDESCRICAO);				
				
			}
					
		}
		
		var socio = jQuery.parseJSON(supplier.values[0].LISTACONTA);
		
		for(var i in socio){
			
			if(socio[i].CTIPOSOC != ""){
				var index = wdkAddChild('socioTable');

				$("#text_tipo_socio___"+index).val(socio[i].CTIPOSOC);
				$("#text_tipo_socio___"+index).change();
				$("#text_NomeLogradouro_socio___"+index).val(socio[i].CENDERSOC);
				$("#text_TelefoneAd2_socio___"+index).val(socio[i].CTELADIC2SOC);
				$("#text_Abreviado_socio___"+index).val(socio[i].CNOMEABREVSOC);
				$("#text_Municipio_socio___"+index).val(socio[i].CMUNICIPIOSOC);
				$("#text_Complemento_socio___"+index).val(socio[i].CCOMPLEMSOC);
				$("#text_TipoLogradouro_socio___"+index).val(socio[i].CTPLOGSOC);
				$("#text_Bairro_socio___"+index).val(socio[i].CBAIRROSOC);
				$("#text_Estado_socio___"+index).val(socio[i].CESTADOSOC);
				$("#text_PaginaInternet_socio___"+index).val(socio[i].CHOMPAGESOC);
				$("#text_NomeSocio___"+index).val(socio[i].CNOMESOC);
				$("#text_Pessoa_socio___"+index).val(socio[i].CCODSOCIO);
				$("#text_Pais_socio_code___"+index).val(socio[i].CCODPAISSOC);
				$("#text_Pais_socio___"+index).val(socio[i].CPAISSOC);
				$("#text_Numero_socio___"+index).val(socio[i].CNUMEROSOC);
				$("#text_EmailAd2_socio___"+index).val(socio[i].CEMAILADIC2SOC);
				$("#text_TelefoneAd1_socio___"+index).val(socio[i].CTELADIC1SOC);
				$("#text_Telefone_socio___"+index).val(socio[i].CTELEFONESOC);
				$("#text_CEP_socio___"+index).val(socio[i].CCEPSOC);
				$("#text_Cod_MunicipioSocio___"+index).val(socio[i].CCODMUNICIOSOC);
				$("#text_EmailAd1_socio___"+index).val(socio[i].CEMAILADIC1SOC);
				$("#text_TelefoneAd3_socio___"+index).val(socio[i].CTELADIC3SOC);
				//alert("Dataset : "+socio[i].CSEXOSOC);
				$("#text_sexo_socio___"+index).val(socio[i].CSEXOSOC);
				//alert("Index : "+index);
				//alert("Campo : "+$("#text_sexo_socio___"+index).val());
				$("#Text_ddi_socio___"+index).val(socio[i].CDDI);
				$("#Text_ddd_socio___"+index).val(socio[i].CDDD);
				$("#text_TelefoneFax_socio___"+index).val(socio[i].CFAXSOC);
				$("#text_CPFCNPJ_socio___"+index).val(socio[i].CCNPJCPFSOC);
				$(".typeSocio").change();
				$("#text_Email_socio___"+index).val(socio[i].CEMAILSOC);			
				
			}

		}
	}
}

function formatDate(date){
	if(date != ""){
		var date = date.split("-");
		return date[2]+"/"+date[1]+"/"+date[0];
	}else{
		return "";
	}
}

/**
 * Faz validacoes em tempo de execucao.
 * 
 * @returns void.
 */
function validateFormOnRuntime(){
//Leandro - início - 08/03/2017	
	$('#Select_revalidacao').change(function(){
		
		if(this.value == "S"){
			enableField($("#id_empresafilial"), false);
			enableField($("#id_grupoempresa"), false);
			
			enableContainer("#panelDados", false);
			enableContainer("#panelCadastro", false);  
			enableField($("#Select_cooperativa"), false);
			enableContainer("#panelEndereco", false);
			enableContainer("#panelContatos", false);
			enableContainer("#panelBancarios", false);
			enableContainer2("#panelFiscal", false);
			//enableField($("#Select_cooperativa"), false);
			enableContainer("#panelProduto", false);
			enableContainer("#panelSocio", false);	

//			enableField($("#Select_revalidacao"), true);
//Leandro - início - 08/03/2017				
			enableField($("#text_DataSerasa"), true);
			enableField($("#text_ObservaoSerasa"), true);
			enableContainer($("#panelAnexo"), false);
	
//Leandro - fim - 08/03/2017			
		}else{
			enableContainer("#panelDados", true);
			enableContainer("#panelCadastro", true);  
			enableContainer("#panelEndereco", true);
			enableContainer("#panelContatos", true);
			enableContainer("#panelBancarios", true);
			enableContainer2("#panelFiscal", true);
			enableContainer("#panelProduto", true);
			enableContainer("#panelSocio", true);	
			enableField($("#Select_revalidacao"), true);			
		}
		
	});
	//Leandro - fim - 08/03/2017	
	$('#text_isencaoPIS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#text_liminarisencaoPIS").parent().hide();
			$("#text_liminarisencaoPIS").val("");
			
			$("#div_venc_pis_indeterminado").hide();
			$("#text_venc_isencaoPIS").val("");
			
			$("#dtVencIsencaoPIS").parent().hide();
			$("#Text_venc_pis_indeterminado").val("");			
			
		}else{
			$("#text_liminarisencaoPIS").parent().show();			
		}
	});
	
	$('#text_isencaoCOFINS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#text_liminarisencaoCOFINS").parent().hide();
			$("#text_liminarisencaoCOFINS").val("");
			
			$("#div_venc_cofins_indeterminado").hide();
			$("#Text_venc_cofins_indeterminado").val("");
			
			$("#dtVencIsencaoCONFIS").parent().hide();
			$("#text_venc_isencaoCOFINS").val("");		
			
		}else{
			$("#text_liminarisencaoCOFINS").parent().show();			
		}
	});	
	
	$('#text_isencaoCSLL').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#text_liminarisencaoCSLL").parent().hide();
			$("#text_liminarisencaoCSLL").val("");
			
			$("#div_venc_csll_indeterminado").hide();
			$("#Text_venc_csll_indeterminado").val("");		
			
			$("#dtVencIsencaoCSLL").parent().hide();
			$("#text_venc_isencaoCSLL").val("");			
		}else{
			$("#text_liminarisencaoCSLL").parent().show();			
		}
	});		
	
	$('#text_isencaoIRRF').change(function(){
		
		if(this.value == "N" || this.value == ""){
			
			$("#text_liminarisencaoIRRF").parent().hide();
			$("#text_liminarisencaoIRRF").val("");
			
			$("#div_venc_irrf_indeterminado").hide();
			$("#Text_venc_irrf_indeterminado").val("");	
			//voltar daqui
			$("#dtVencIsencaoIRRF").hide();
			$("#text_venc_isencaoIRRF").val("");				
		}else{
			$("#text_liminarisencaoIRRF").parent().show();			
		}
	});		
	
	$('#text_isencaoISS').change(function(){
		if(this.value == "N" || this.value == ""){
			
			$("#text_liminarisencaoISS").parent().hide();
			$("#text_liminarisencaoISS").val("");
			
			$("#div_venc_iss_indeterminado").hide();
			$("#Text_venc_iss_indeterminado").val("");	
			
			$("#dtVencIsencaoISS").parent().hide();
			$("#text_venc_isencaoISS").val("");					
		}else{
			$("#text_liminarisencaoISS").parent().show();			
		}
	});		
	
	$('#text_isencaoINSS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#text_liminarisencaoINSS").parent().hide();
			$("#text_liminarisencaoINSS").val("");
			
			$("#div_venc_inss_indeterminado").hide();
			$("#Text_venc_inss_indeterminado").val("");		
			
			$("#dtVencIsencaoINSS").parent().hide();
			$("#text_venc_isencaoINSS").val("");			
		}else{
			$("#text_liminarisencaoINSS").parent().show();			
		}
	});		
	
	//==================================================//	
	
	$('#text_liminarisencaoPIS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#div_venc_pis_indeterminado").hide();
			$("#text_venc_isencaoPIS").val("");
			
			$("#dtVencIsencaoPIS").parent().hide();
			$("#Text_venc_pis_indeterminado").val("");
		}else{
			$("#div_venc_pis_indeterminado").show();
			$("#Text_venc_pis_indeterminado").change();			
		}
	});
	
	$('#text_liminarisencaoCOFINS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#div_venc_cofins_indeterminado").hide();
			$("#Text_venc_cofins_indeterminado").val("");
			
			$("#dtVencIsencaoCONFIS").parent().hide();
			$("#text_venc_isencaoCOFINS").val("");
		}else{
			$("#div_venc_cofins_indeterminado").show();
			$("#Text_venc_cofins_indeterminado").change();
		}
	});	
	
	$('#text_liminarisencaoCSLL').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#div_venc_csll_indeterminado").hide();
			$("#Text_venc_csll_indeterminado").val("");
			
			$("#dtVencIsencaoCSLL").parent().hide();
			$("#text_venc_isencaoCSLL").val("");
		}else{
			$("#div_venc_csll_indeterminado").show();
			$("#Text_venc_csll_indeterminado").change();
		}
	});		
	
	$('#text_liminarisencaoIRRF').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#div_venc_irrf_indeterminado").hide();
			$("#Text_venc_irrf_indeterminado").val("");
			
			$("#dtVencIsencaoIRRF").hide();
			$("#text_venc_isencaoIRRF").val("");
				
		}else{
			$("#div_venc_irrf_indeterminado").show();
			$("#Text_venc_irrf_indeterminado").change();			
		}
	});		
	
	$('#text_liminarisencaoISS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#div_venc_iss_indeterminado").hide();
			$("#Text_venc_iss_indeterminado").val("");
			
			$("#dtVencIsencaoISS").parent().hide();
			$("#text_venc_isencaoISS").val("");
				
		}else{
			$("#div_venc_iss_indeterminado").show();
			$("#Text_venc_inss_indeterminado").change();
			
		}
	});		
	
	$('#text_liminarisencaoINSS').change(function(){
		if(this.value == "N" || this.value == ""){
			$("#div_venc_inss_indeterminado").hide();
			$("#Text_venc_inss_indeterminado").val("");
			
			$("#dtVencIsencaoINSS").parent().hide();
			$("#text_venc_isencaoINSS").val("");
					
		}else{
			$("#div_venc_inss_indeterminado").show();
			$("#Text_venc_inss_indeterminado").change();
			
		}
	});		
	
	//==================================================//
	
	$('#Text_venc_pis_indeterminado').change(function(){
		if(this.value == "S" || this.value == ""){
			$("#dtVencIsencaoPIS").parent().hide();
			$("#text_venc_isencaoPIS").val("");
		}else{
			$("#dtVencIsencaoPIS").parent().show();
		}
	});
	
	$('#Text_venc_cofins_indeterminado').change(function(){
		if(this.value == "S" || this.value == ""){
			$("#dtVencIsencaoCONFIS").parent().hide();
			$("#text_venc_isencaoCOFINS").val("");
		}else{
			$("#dtVencIsencaoCONFIS").parent().show();
		}
	});	
	
	$('#Text_venc_csll_indeterminado').change(function(){
		if(this.value == "S" || this.value == ""){
			$("#dtVencIsencaoCSLL").parent().hide();
			$("#text_venc_isencaoCSLL").val("");
		}else{
			$("#dtVencIsencaoCSLL").parent().show();
		}
	});		
	
	$('#Text_venc_irrf_indeterminado').change(function(){
		
		if(this.value == "S" || this.value == ""){
			$("#dtVencIsencaoIRRF").hide();
			$("#text_venc_isencaoIRRF").val("");
		}else{
			$("#dtVencIsencaoIRRF").show();
		}
	});		
	
	$('#Text_venc_iss_indeterminado').change(function(){
		if(this.value == "S" || this.value == ""){
			$("#dtVencIsencaoISS").parent().hide();
			$("#text_venc_isencaoISS").val("");
		}else{
			$("#dtVencIsencaoISS").parent().show();
		}
	});		
	
	$('#Text_venc_inss_indeterminado').change(function(){
		if(this.value == "S" || this.value == ""){
			$("#dtVencIsencaoINSS").parent().hide();
			$("#text_venc_isencaoINSS").val("");
		}else{
			$("#dtVencIsencaoINSS").parent().show();
		}
	});
	
	$('#nm_tipo_solicitacao').blur(function(){
		validateSupplier();
	});
	
	$('#nm_tipo_solicitacao').change(function(){
		if($('#nm_tipo_solicitacao').val() == "3"){
			enableField($("#text_codigo_pessoa"), false);
		}else{
			enableField($("#text_codigo_pessoa"), true);
		}
		
	});	
	
	$('#nm_cpf_cnpj').blur(function(){
		if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO || CURRENT_STATE == CORRIGIR_INFORMACOES){
			validateSupplier();
		}
		
	});
	
	$('#text_codigo_pessoa').change(function(){
		if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO || CURRENT_STATE == CORRIGIR_INFORMACOES){
			validaConsultaPessoa();
		}
		
	});
	
	$('#id_insc_estadual').blur(function(){
		var isValid = validateIe(this.value, $('#nm_estado').val().replace(/\ /g,""));
		if(isValid == false){
			alertBox('A Inscrição Estadual informada é inválida!');
			$('#id_insc_estadual').val("");
			return;
		}
		if(this.value != "" && this.value == $('#id_ins_municipal').val()){
			alertBox('A Inscrição Estadual não pode ser igual a Inscrição Municipal!');
			$('#id_insc_estadual').val("");
		}
	});
	
	$('#id_ins_municipal').blur(function(){
		if(this.value != "" && this.value == $('#id_insc_estadual').val()){
			alertBox('A Inscrição Municipal não pode ser igual a Inscrição Estadual!');
			$('#id_ins_municipal').val("");
		}
	});
	
	$('#nm_tipo_fornecedor').change(function(){

		habilitaDesabilitaCampos(this.value);
		trataCampos(this.value);
		
	});
	
	$('#Select_tipo_cadastro').change(function(){
		
		if($('#Select_tipo_cadastro').val() == "1"){
			if($('#text_Atuacao_brasil').val() == "S"){
				$("#text_NIRE").prev().addClass("required");
				$("#div_CapSocial").addClass("required");
				$("#text_ValorCapSocial").prev().addClass("required");
			}
		}else{
		
			$("#text_NIRE").prev().removeClass("required");
			$("#div_CapSocial").removeClass("required");
			$("#text_ValorCapSocial").prev().removeClass("required");			
			
		}
		
	});
	
	$('#text_Atuacao_brasil').change(function(){

		if($('#text_Atuacao_brasil').val() == "S"){	
			
			if($('#nm_tipo_fornecedor').val() == "F"){
				
				$("#text_isencaoIRRF").prev().addClass("required");
				$("#text_isencaoISS").prev().addClass("required");
				$("#text_isencaoINSS").prev().addClass("required");		
				
				$("#text_isencaoPIS").prev().removeClass("required");
				$("#text_isencaoCOFINS").prev().removeClass("required");
				$("#text_isencaoCSLL").prev().removeClass("required");	
				
				$("#Text_OptSimp").prev().removeClass("required");
				
			}else{
				$("#text_isencaoPIS").prev().addClass("required");
				$("#text_isencaoCOFINS").prev().addClass("required");
				$("#text_isencaoCSLL").prev().addClass("required");		
				
				$("#text_isencaoIRRF").prev().addClass("required");
				$("#text_isencaoISS").prev().addClass("required");
				$("#text_isencaoINSS").prev().addClass("required");
				
				$("#Text_OptSimp").prev().addClass("required");
			}
			
			$("#nm_cpf_cnpj").prev().addClass("required");
			$("#dtSerasa").addClass("required");	
			$("#text_ObservaoSerasa").prev().addClass("required");
			$("#text_INSS").prev().addClass("required");	
			$("#div_DtNascimento").addClass("required");
			$("#text_ObservaoSerasa").prev().addClass("required");
			$("#text_DtEmis").prev().addClass("required");			
			
			$("#text_TpLogradouro").prev().addClass("required");	
			$("#text_Numero").prev().addClass("required");
			$("#div_bairro").addClass("required");
			$("#div_estado").addClass("required");	
			$("#text_Municipio").prev().addClass("required");	
			
			$("#text_tipoDoc").prev().addClass("required");
			$("#text_ID").prev().addClass("required");
			
			$("#div_DtEmis").addClass("required");
			$("#text_ORGEmis").prev().addClass("required");
			//$("#text_Naturalidade").prev().addClass("required");
			
			$("#id_insc_estadual").prev().addClass("required");
			$("#id_ins_municipal").prev().addClass("required");		
			$("#div_text_ativEconomica").addClass("required");
			
			$("#text_NIRE").prev().addClass("required");	
			$("#div_CapSocial").addClass("required");
			$("#text_ValorCapSocial").prev().addClass("required");		
			
			$("#text_CEP").prev().addClass("required");
			$("#text_DDD").prev().addClass("required");
			
			//$("#text_IdentificaoFiscalExterior").prev().removeClass("required"); 
			
			$("#divAtuanteExterior").hide();	
			
		}else{
					
			$("#Text_OptSimp").prev().removeClass("required");
			
			$("#text_isencaoIRRF").prev().addClass("required");
			$("#text_isencaoISS").prev().addClass("required");
			$("#text_isencaoINSS").prev().removeClass("required");		
			
			$("#text_isencaoPIS").prev().addClass("required");
			$("#text_isencaoCOFINS").prev().addClass("required");
			$("#text_isencaoCSLL").prev().removeClass("required");						
			
			$("#nm_cpf_cnpj").prev().removeClass("required");
			if($("#nm_cpf_cnpj").val() == "")
			   $("#nm_cpf_cnpj").val("");
			$("#dtSerasa").removeClass("required");			
			$("#text_DataSerasa").val("");
			$("#text_ObservaoSerasa").prev().removeClass("required");			
			$("#text_ObservaoSerasa").val("");
			$("#text_INSS").prev().removeClass("required");
			$("#text_INSS").val("");
			
			$("#text_tipoDoc").prev().removeClass("required");
			
			$("#text_ID").prev().removeClass("required");
			$("#text_ID").val("");
			
			$("#text_ORGEmis").prev().removeClass("required");
			$("#text_ORGEmis").val("");
			
			$("#div_DtEmis").removeClass("required");
			$("#text_DtEmis").val("");			
			
			$("#div_DtNascimento").removeClass("required");
			
			$("#text_TpLogradouro").prev().removeClass("required");	
			$("#text_Numero").prev().removeClass("required");
			$("#div_bairro").removeClass("required");
			$("#div_estado").removeClass("required");	
			$("#text_Municipio").prev().removeClass("required");		
								
			//$("#text_Naturalidade").prev().removeClass("required");
			
			$("#id_insc_estadual").prev().removeClass("required");
			$("#id_ins_municipal").prev().removeClass("required");	
			$("#div_text_ativEconomica").removeClass("required");
			
			$("#text_NIRE").prev().removeClass("required");
			$("#div_CapSocial").removeClass("required");
			$("#text_ValorCapSocial").prev().removeClass("required");
			
			$("#text_CEP").prev().removeClass("required");
			$("#text_DDD").prev().removeClass("required");
			
			//$("#text_IdentificaoFiscalExterior").prev().addClass("required");
			
			$("#divAtuanteExterior").show();	
			
			if($('#nm_tipo_fornecedor').val() == "F"){
				$("#text_isencaoISS").prev().removeClass("required");
			}
			
		}		
	});
	
	habilitaDesabilitaCampos($('#nm_tipo_fornecedor').val());
	
	/*$("#text_Telefone").on("blur", function(){
		if(this.value.length < 13 && this.value != ""){
			this.value = "";
			alertBox('N\u00FAmero inv\u00E1lido.');
		}else{
			var fone = this.value.replace(/[^0-9\.]+/g, '');
			fone = "("+fone.substr(0,2) +")"+ fone.substr(2, (fone.length - 6)) + "-" + fone.substr((fone.length - 4));
			this.value = fone;
		}
	});*/
}

function validaConsultaPessoa(){
	
	var isValid = false;
	
	if($('#text_codigo_pessoa').val() == '') return;	
	
	if($("#nm_tipo_solicitacao").val() == "4"){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial para realizar a alteração de fornecedor.");
			return false;
		}else{
			searchSupplier($('#text_codigo_pessoa').val().replace(".","").replace("-","").replace("/","").replace(".",""), empresa, filial, "2");
		}
	}
	
}

/**
 * Valida o cadastro do fornecedor no Protheus.
 * 
 * @returns void.
 */
function validateSupplier(){
	var isValid = false;
	
	if($('#nm_cpf_cnpj').val() == '') return;
	
	if($('#nm_tipo_fornecedor').val() == 'F') isValid = validateCpf($('#nm_cpf_cnpj').val());
	else if($('#nm_tipo_fornecedor').val() == 'J') isValid = validateCnpj($('#nm_cpf_cnpj').val());
	
	if(isValid == false){
		alertBox('O CPF/CNPJ informado é inválido!');
		$('#nm_cpf_cnpj').val("");
		return;
	}
	
	if($("#nm_tipo_solicitacao").val() == "4"){
		var empresa = $("#id_grupoempresa").val();
		var filial = $("#id_empresafilial").val();
		if(empresa == "" || filial == ""){
			alertBox("É necessário informar a Empresa/Filial para realizar a alteração de fornecedor.");
			return false;
		}else{
			searchSupplier($('#nm_cpf_cnpj').val().replace(".","").replace("-","").replace("/","").replace(".",""), empresa, filial, "1");
		}
	}
}

function cleanChilds(tables){
	//alert("cleanChilds");
	for(var i in tables){
		
		$('#'+tables[i]).find('td').each(function(index) {
		
			if(index > 1) fnWdkRemoveChild(this);
		});
		
	}
}


function alertBox(msg){
	FLUIGC.message.alert({
	    message: msg,
	    title: 'Atenção!',
	    label: 'OK'
	});
}

function toastBox(type,msg){
	FLUIGC.toast({
	     title: '',
	     message: msg,
	     type: type
	 });
}

function bindings(){

	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO){
		getCompanyAndBranch();
	}
	
	if(CURRENT_STATE == 0 || CURRENT_STATE == INICIO || CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO || CURRENT_STATE == CORRIGIR_INFORMACOES){
		$('#nm_tipo_fornecedor').change();
		$('#text_Atuacao_brasil').change();
	}
	
	if(CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO){
		
/*		$(":input[name^='text_Atuacao_brasil_soc___']").each(function() {
			var index = this.id.split("___")[1];	
			$("#text_Atuacao_brasil_soc___"+index).change();
		});*/
		
		if($("#portal").val() == "true"){

			//retirando atribuição de vazio do campo atuação e atribuindo o valor s
			$("#text_Atuacao_brasil" +" option[value='']").removeAttr('selected');
			$("#text_Atuacao_brasil" +" option[value='S']").attr('selected', 'selected');
			
			console.log($("#text_Atuacao_brasil").val());
			$("#text_Atuacao_brasil").change();			
			$('#aprovaCorrecaoGesad').parent().hide();
			
//início - Leandro - 08/03/2017			
			if ($('#Select_revalidacao').val()=="S"){		
				$('#Select_revalidacao').change();		
			}
			
//fim - Leandro - 08/03/2017			
			
			$(":input[name^='text_Atuacao_brasil_soc___']").each(function() {
				var index = this.id.split("___")[1];						
					
					//$("#text_Atuacao_brasil_soc___"+index).val("S");
					
					//retirando atribuição de vazio do campo atuação e atribuindo o valor s
				
					$("#d_text_Atuacao_brasil_soc___"+index +" option[value='']").removeAttr('selected');
					$("#d_text_Atuacao_brasil_soc___"+index +" option[value='S']").attr('selected', 'selected');				
				
					$("#text_Atuacao_brasil_soc___"+index +" option[value='']").removeAttr('selected');
					$("#text_Atuacao_brasil_soc___"+index +" option[value='S']").attr('selected', 'selected');					
					
					$("#text_Atuacao_brasil_soc___"+index).change();
					
			});				
			
		}
		
	}	
	
	if(CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO){		
		$("[name='aprovaGsad']").prop('checked', false);	
		$("#obsAprovaGesad").val("");
	}	
	
	if(CURRENT_STATE == NOTIFICAR_GECON_PARA_COMPLEMENTO_DE_CADASTRO){		
		$("[name='aprovaConfere']").prop('checked', false);	
		$("#obsAprovaConferencia").val("");
	}	
	
	if(CURRENT_STATE == APROVACAO_GECON){		
		$("[name='aprovaGecond']").prop('checked', false);	
		$("#obsAprovaGecond").val("");
	}		
	
	if(CURRENT_STATE != 0 && CURRENT_STATE != INICIO && CURRENT_STATE != CORRIGIR_INFORMACOES){
		$('#panelAnexo').hide();				
		
		$(":input[name^='text_tipo_socio___']").each(function() {
			var index = this.id.split("___")[1];				
			if($("#text_tipo_socio___"+index).val() == "J"){				
				$("#text_sexo_socio___"+index).parent().hide();
				$("#text_sexo_socio___"+index).val("");
			}
		}); 		
				
		
	}	
	
	
	//Tratamento dos campos de impostos
	
	if($('#text_isencaoPIS').val() == "N" || $('#text_isencaoPIS').val() == ""){
		
		$("#text_liminarisencaoPIS").parent().hide();
		$("#text_liminarisencaoPIS").val("");
		
		$("#div_venc_pis_indeterminado").hide();
		$("#text_venc_isencaoPIS").val("");
		
		$("#dtVencIsencaoPIS").parent().hide();
		$("#Text_venc_pis_indeterminado").val("");	
	}else{
		$("#text_liminarisencaoPIS").parent().show();
	}

	if($('#text_isencaoCOFINS').val() == "N" || $('#text_isencaoCOFINS').val() == ""){
		$("#text_liminarisencaoCOFINS").parent().hide();
		$("#div_venc_cofins_indeterminado").hide();
	}else{
		$("#text_liminarisencaoCOFINS").parent().show();
	}

	if($('#text_isencaoCSLL').val() == "N" || $('#text_isencaoCSLL').val() == ""){
		$("#text_liminarisencaoCSLL").parent().hide();
		$("#div_venc_csll_indeterminado").hide();
	}else{
		$("#text_liminarisencaoCSLL").parent().show();
	}			

	if($('#text_isencaoIRRF').val() == "N" || $('#text_isencaoIRRF').val() == ""){
		
		$("#text_liminarisencaoIRRF").parent().hide();
		$("#text_liminarisencaoIRRF").val("");
		
		$("#text_liminarisencaoIRRF").parent().hide();
		$("#div_venc_irrf_indeterminado").hide();
		
		$("#dtVencIsencaoIRRF").hide();
		$("#Text_venc_irrf_indeterminado").val("");			
	}else{		
		$("#text_liminarisencaoIRRF").parent().show();
	}
		

	if($('#text_isencaoISS').val() == "N" || $('#text_isencaoISS').val() == ""){
		$("#text_liminarisencaoISS").parent().hide();
		$("#div_venc_iss_indeterminado").hide();
	}else{
		$("#text_liminarisencaoISS").parent().show();
	}
	
	if($('#text_isencaoINSS').val() == "N" || $('#text_isencaoINSS').val() == ""){
		$("#text_liminarisencaoINSS").parent().hide();
		$("#div_venc_inss_indeterminado").hide();
	}else{
		$("#text_liminarisencaoINSS").parent().show();
	}
	
	//==========================================================================================================//	
	
	if($('#text_liminarisencaoPIS').val() == "S"){
		$("#div_venc_pis_indeterminado").show();
	}else{
		$("#div_venc_pis_indeterminado").hide();
	}

	if($('#text_liminarisencaoCOFINS').val() == "S"){
		$("#div_venc_cofins_indeterminado").show();
	}else{
		$("#div_venc_cofins_indeterminado").hide();
	}

	if($('#text_liminarisencaoCSLL').val() == "S"){
		$("#div_venc_csll_indeterminado").show();
	}else{
		$("#div_venc_csll_indeterminado").hide();
	}			

	if($('#text_liminarisencaoIRRF').val() == "S"){
		$("#div_venc_irrf_indeterminado").show();
	}else{
		$("#div_venc_irrf_indeterminado").hide();
	}
		

	if($('#text_liminarisencaoISS').val() == "S"){
		$("#div_venc_iss_indeterminado").show();
	}else{
		$("#div_venc_iss_indeterminado").hide();
	}
	
	if($('#text_liminarisencaoINSS').val() == "S"){
		$("#div_venc_inss_indeterminado").show();
	}else{
		$("#div_venc_inss_indeterminado").hide();
	}
	
	//==========================================================================================================//
		
		if($('#Text_venc_pis_indeterminado').val() == "S" || $('#Text_venc_pis_indeterminado').val() == ""){
			$("#dtVencIsencaoPIS").parent().hide();
		}else{
			$("#dtVencIsencaoPIS").parent().show();
		}

		if($('#Text_venc_cofins_indeterminado').val() == "S" || $('#Text_venc_cofins_indeterminado').val() == ""){
			$("#dtVencIsencaoCONFIS").parent().hide();
		}else{
			$("#dtVencIsencaoCONFIS").parent().show();
		}

		if($('#Text_venc_csll_indeterminado').val() == "S" || $('#Text_venc_csll_indeterminado').val() == ""){
			$("#dtVencIsencaoCSLL").parent().hide();
		}else{
			$("#dtVencIsencaoCSLL").parent().show();
		}			
	
		if($('#Text_venc_irrf_indeterminado').val() == "S" || $('#Text_venc_irrf_indeterminado').val() == ""){
			$("#dtVencIsencaoIRRF").hide();
		}else{
			$("#dtVencIsencaoIRRF").show();
		}
			
	
		if($('#Text_venc_iss_indeterminado').val() == "S" || $('#Text_venc_iss_indeterminado').val() == ""){
			$("#dtVencIsencaoISS").parent().hide();
		}else{
			$("#dtVencIsencaoISS").parent().show();
		}
		
	if($('#Text_venc_inss_indeterminado').val() == "S" || $('#Text_venc_inss_indeterminado').val() == ""){
		$("#dtVencIsencaoINSS").parent().hide();
	}else{
		$("#dtVencIsencaoINSS").parent().show();
	}

}

function getCompanyAndBranch(){
	var dataset = DatasetFactory.getDataset("ds_protheus_empresa_filial", null, null, null);
	if(dataset != null && dataset.values.length > 0){
		$("#id_grupoempresa	").val(dataset.values[0].CODEMP);
		$("#txt_grupoempresa").val(dataset.values[0].EMP);
		$("#id_empresafilial").val(dataset.values[0].CODFIL);
		$("#txt_empresafilial").val(dataset.values[0].FIL);
	}
}

function validaDataIdentFiscalExt(){
	
	var status = false;
	
	var dataIni = $("#text_DataInicioValidade").val().split("/");
	var dataIniTratada = dataIni[2]+dataIni[1]+dataIni[0];
	
	var dataFim = $("#text_DataFinalValidade").val().split("/");
	var	dataFimTratada = dataFim[2]+dataFim[1]+dataFim[0];
		
		if(dataFimTratada < dataIniTratada){

			status = true;
			return status;
		}
			
		return status;
	
}

function SomenteNumero(e){
	var tecla=(window.event)?event.keyCode:e.which;
	if((tecla>47 && tecla<58)) return true;
	else{
		if (tecla==8 || tecla==0) return true;
		else  return false;
	}
}

function trataDataReturn(campo){
	if(campo == "31/12/1899"){
		
		return "";
		
	}else{
		return campo
	}
}

function getBanco(CODIGO){
	
	var codAgencBncria = DatasetFactory.createConstraint("codBanco", CODIGO, CODIGO, ConstraintType.MUST);
	var nomBanco       = DatasetFactory.createConstraint("nomBanco", "", "", ConstraintType.MUST);
	
	var dataset = DatasetFactory.getDataset("ds_pessoa_bancos", null, [codAgencBncria, nomBanco], null);			

			if(dataset.values[1]["codBanco"] == CODIGO.trim()){

				return dataset.values[1]["nomBanco"];
			}				
		
	return "Banco não encontrado no Pessoa";	

}

function getAgencia(NumAgencia, Banco){	
	
	var codAgencBncria = DatasetFactory.createConstraint("codAgencBncria", "", "", ConstraintType.MUST);
	var codBanco       = DatasetFactory.createConstraint("codBanco", Banco, Banco, ConstraintType.MUST);
	var codDvAgenc     = DatasetFactory.createConstraint("codDvAgenc", "", "", ConstraintType.MUST);
	var nomAgencBncria = DatasetFactory.createConstraint("nomAgencBncria", "", "", ConstraintType.MUST);
	var numAgenc       = DatasetFactory.createConstraint("numAgenc", NumAgencia, NumAgencia, ConstraintType.MUST);
	
	var dataset = DatasetFactory.getDataset("ds_pessoa_agencia", null, [codAgencBncria, codBanco, codDvAgenc, nomAgencBncria, numAgenc], null);

			if(dataset.values[1]["numAgenc"] == NumAgencia.trim()){

				return dataset.values[1]["nomAgencBncria"];
			}
				
		
	return "Ag. Não encontrada no Pessoa";	

}

function getAtivEconomica(codAtivEconomica){	
	
	var codCnae  = DatasetFactory.createConstraint("codCnae", codAtivEconomica, codAtivEconomica, ConstraintType.MUST);
	var dscCnae = DatasetFactory.createConstraint("dscCnae", "", "", ConstraintType.MUST);		
	
	var dataset = DatasetFactory.getDataset("ds_pessoa_atividades_economicas", null, [codCnae, dscCnae], null);

			if(dataset.values[0]["codCnae"] == codAtivEconomica.trim()){

				return dataset.values[0]["dscCnae"];
			}
				
		
	return "Ativ. Econômica Não encontrada no Pessoa";	

}

String.prototype.rtrim = function() {
    var trimmed = this.replace(/\s+$/g, '');
    return trimmed;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function taxionomiaAnexos(campo){
	console.log("campo "+campo);
    switch (campo) {
	case 'file_capacidade_tecnica':
		console.log("file_capacidade_tecnica "+campo);
		return "Capacidade_Tecnica";
		break;
	case 'file_inscricao_municipal':
		return "Inscricao_Municipal";		
		break;
	case 'file_inscricao_estadual':
		return "Inscricao_Estadual";		
		break;	
	case 'file_pis_pasep':
		return "PIS_PASEP";
		break;
	case 'file_cofins':
		return "COFINS";		
		break;
	case 'file_csll':
		return "CSLL";		
		break;		
	case 'file_irrf':
		return "IRRF";
		break;
	case 'file_iss':
		return "ISS";		
		break;
	case 'file_inss':
		return "INSS";		
		break;	
	case 'file_optante':
		return "Optate_Simples";
		break;
	case 'file_constituicao':
		return "DocConstituicao";		
		break;
	case 'file_tipo_doc':
		return "Tipo_Doc";		
		break;		
	case 'file_cpf_cnpj':
		if($("#nm_tipo_fornecedor").val() == "J"){
			return "Cartao_CNPJ";	
		}else{
			return "Cartao_CPF";	
		}		
		break;
	case 'file_endereco':
		return "Comprovante_Residencia";		
		break;	
/*	case 'file_cpf_cnpj_socio':
		var cic = $("#text_CPFCNPJ_socio___1").val().replace(".","").replace("-","").replace("/","").replace(".","");
		return cic"_Tipo_Doc";		
		break;		
	case 'file_endereco_socio':
		var cic = $("#text_CPFCNPJ_socio___1").val().replace(".","").replace("-","").replace("/","").replace(".","");
		return cic"_Tipo_Doc";		
		break;	*/	
    }
	
}