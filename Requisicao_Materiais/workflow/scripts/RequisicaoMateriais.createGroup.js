function createGroup(code, description, isInternal,fieldForm){
	log.info("#createGroup: " + code);
	
	var mountPoint = "/public/2.0/groups/create";
	var group = new Object();
	group.code = code;
	group.description = description;
	group.isInternal = isInternal;
	group = JSON.stringify(group);
	
	var c1 = DatasetFactory.createConstraint("json", group, group, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("mountPoint", mountPoint, mountPoint, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("service_genericRest", new Array(), new Array(c1,c2), new Array());
	
	try {
		var result = JSON.parse(dataset.getValue(0, "message"));
		log.info("#result createGroup: " + result);
		
		if(result != "ERRO"){
			log.info("#groupId " + result.content.id);
			log.info("#result: " + result.message.message);
			log.info("#type: " + result.message.type);
			hAPI.setCardValue(fieldForm, code);
			return result.message.message;
		}else throw("Erro ao criar o grupo. Contate o administrador.");
		
	} catch (e) {
		throw("Erro ao criar o grupo. " + e.toString());
	}
	return "NOK";
}