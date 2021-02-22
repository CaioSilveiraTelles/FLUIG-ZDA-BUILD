function displayFields(form, customHTML){
	var CURRENT_STATE = getValue("WKNumState");
	var WKUSER = getValue("WKUser");
	var FORM_MODE = form.getFormMode() ;
	customHTML.append("<script> var CURRENT_STATE = "+CURRENT_STATE+";</script>");
	customHTML.append("<script> var FORM_MODE = '"+FORM_MODE+"';</script>"); 
	
	

	/*
	 * Seta se o usuário pertence ao grupo GESAD 
	 */
	form.setValue('hdnUserGesad',gesadUser(WKUSER));
	
	if(CURRENT_STATE == 0){
		form.setValue('portal', 'false');
	}
	
	if(CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO){
		var grupo = "Pool:Group:"+form.getValue("gesadGroup");
		form.setValue('poolGesad', grupo);
	}
	
	if(CURRENT_STATE == NOTIFICAR_GECON_PARA_COMPLEMENTO_DE_CADASTRO){
		var grupo = "Pool:Group:"+form.getValue("geconGroup");
		form.setValue('poolGecon', grupo);
	}
	
	if(CURRENT_STATE == APROVACAO_GECON){
		var grupo = "Pool:Group:"+form.getValue("geconAprovGroup");
		form.setValue('poolGeconAprov', grupo);
	}
	
	
	
	
	
}

function gesadUser(user){
	var configs = DatasetFactory.getDataset("ds_config",null,null,null);
	if(configs != null){
		var groupGesad = configs.getValue(0, "gesad");
		
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupGesad, groupGesad, ConstraintType.MUST);
		var colleagueGroup = DatasetFactory.getDataset("colleagueGroup",null,new Array(c1,c2),null);
		
		if(colleagueGroup.rowsCount > 0) return true
		else return false;
	}
}
