function displayFields(form, customHTML){ 
	var state = getValue("WKNumState");

	customHTML.append("<script> var CURRENT_STATE = "+state+";</script>"); 
	
	if(state == 0 || state == INICIO){
		var user = getValue("WKUser");
		form.setValue('matriculaSolicitante', user);
		form.setValue('textLoginSolicit', getUser(user));
	}
	
}
