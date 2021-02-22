function createUserList(area, listGroup, currentUser){
	var list = new Array();
	
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", area, area, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", currentUser, currentUser, ConstraintType.MUST_NOT);
	var area = DatasetFactory.getDataset("colleagueGroup", null, new Array(c1,c2), null);
	
	for(var i = 0; i < area.rowsCount; i++){
		var user = area.getValue(i,"colleagueGroupPK.colleagueId");
		
		for(var x in listGroup){
			var c1Temp = DatasetFactory.createConstraint("colleagueGroupPK.groupId", listGroup[x], listGroup[x], ConstraintType.MUST);
			var groupTemp = DatasetFactory.getDataset("colleagueGroup", null, new Array(c1Temp), null);
			
			for(var j = 0; j < groupTemp.rowsCount; j++){
				if(user == groupTemp.getValue(j,"colleagueGroupPK.colleagueId")){
					
					var c1Temp3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
					var colleagueTemp2 = DatasetFactory.getDataset("colleague", null, new Array(c1Temp3), null);
					
					var login = colleagueTemp2.getValue(0,"login");					
					
					list.push(login);
				}
			}
		}
	}
	return list;
}