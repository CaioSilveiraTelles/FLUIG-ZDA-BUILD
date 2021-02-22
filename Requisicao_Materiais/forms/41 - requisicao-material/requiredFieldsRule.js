/**
 * Carrega regra de campos obrigatórios
 * @returns void.
 */
function requiredFieldsRule(){
	$("<style>").prop("type", "text/css")
		.html("\
			.required::before{\
				content: '*';\
				color: red;\
			}").appendTo("head");
	var fields = [];

	requiredFields.addField("text_area_demandante",[0, INICIO, ALTERAR_REQUISICAO]);
	requiredFields.addField("text_dt_emissao",[0, INICIO, ALTERAR_REQUISICAO]);
	requiredFields.addField("id_empresafilial",[0, INICIO, ALTERAR_REQUISICAO]);
	//requiredFields.addField("motivoAprova",[APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE]);
	requiredFields.addField("txt_empresafilial",[0, INICIO, ALTERAR_REQUISICAO]);
	requiredFields.addField("text_obsProd",[]);
	requiredFields.addField("deleteProduto",[]);
	requiredFields.addField("addProduto",[]);
	requiredFields.addField("tableProduto",[0, INICIO, ALTERAR_REQUISICAO]);
	requiredFields.addField("txt_grupoempresa",[0, INICIO, ALTERAR_REQUISICAO]);
	requiredFields.addField("textLoginSolicit",[0, INICIO, ALTERAR_REQUISICAO]);
	//requiredFields.addField("aprovaRadio",[APROVACAO_DO_GERENTE_DA_AREA_DEMANDANTE]);
	requiredFields.addField("id_grupoempresa",[0, INICIO, ALTERAR_REQUISICAO]);
	
	fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE)>= 0)
			setRequired(fields[i].name, true);
	}
}