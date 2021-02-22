function addUsersGroup(listUsers,group){
	log.info("#addUsersGroup ========================> List:"+listUsers+" Group: " + group);
	var mountPoint = "/public/2.0/groups/addUsers/"+group;
	
	var stringfy = "[";
	for(var i in listUsers){
		if(listUsers.length-1 == i)
			stringfy += "\""+listUsers[i]+"\"]";
		else
			stringfy += "\""+listUsers[i]+"\",";
	}
	
	log.info("#ADD USERS STRINGHY: " + stringfy);
	
	var c1 = DatasetFactory.createConstraint("json",stringfy,stringfy, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("mountPoint", mountPoint, mountPoint, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("service_genericRest", new Array(), new Array(c1,c2), new Array());
	
	if(dataset == "ERRO") throw("Erro ao inserir os usuários no grupo: " + group);
}