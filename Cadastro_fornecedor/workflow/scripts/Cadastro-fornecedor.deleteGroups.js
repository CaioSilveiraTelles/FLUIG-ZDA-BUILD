function deleteGroups(company){
	log.info("#INICIANDO A EXCLUSAO DOS GRUPOS DINAMICOS======");
	var groupList = new Array();
	
	if(hAPI.getCardValue("gesadGroup") != ""){
		groupList.push(hAPI.getCardValue("gesadGroup"));
	}
	
	if(hAPI.getCardValue("geconGroup") != ""){
		groupList.push(hAPI.getCardValue("geconGroup"));	
	}
	
	if(hAPI.getCardValue("geconAprovGroup") != ""){
		groupList.push(hAPI.getCardValue("geconAprovGroup"));
	}
	
	for(var i in groupList){
		var group = groupList[i];
		if(group){
			var c1 = DatasetFactory.createConstraint("group", group, group, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("company", company, company, ConstraintType.MUST);
			var dataset = DatasetFactory.getDataset("service_deleteGroupWS", new Array(), new Array(c1,c2), new Array());
			log.info("#DELETE GROUP RESULT: " + dataset.getValue(0, "message"));
		}
	}
}