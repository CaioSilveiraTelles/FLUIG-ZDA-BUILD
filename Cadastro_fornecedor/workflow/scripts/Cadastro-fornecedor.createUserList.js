function createUserList(gesad, listGroup, currentUser){
	var list = new Array();
	
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", gesad, gesad, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", currentUser, currentUser, ConstraintType.MUST_NOT);
	var gesad = DatasetFactory.getDataset("colleagueGroup", null, new Array(c1,c2), null);
	
	for(var i = 0; i < gesad.rowsCount; i++){
		var user = gesad.getValue(i,"colleagueGroupPK.colleagueId");
		
		for(var x in listGroup){
			var c1Temp = DatasetFactory.createConstraint("colleagueGroupPK.groupId", listGroup[x], listGroup[x], ConstraintType.MUST);
			var groupTemp = DatasetFactory.getDataset("colleagueGroup", null, new Array(c1Temp), null);
			for(var j = 0; j < groupTemp.rowsCount; j++){
				if(user == groupTemp.getValue(j,"colleagueGroupPK.colleagueId")) list.push(getLogin(user));
			}
		}
	}
	return list;
}

function getLogin(IdUser){
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", IdUser, IdUser, ConstraintType.MUST);
	var user = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
	return user.getValue(0, "login");
}