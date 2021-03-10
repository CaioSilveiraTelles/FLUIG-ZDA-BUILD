function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    
	//log.info(">>>>>>>>>>>>>>>>>>>" + fields[0].toString());
	//log.info(">>>>>>>>>>>>>>>>>>>" + constraints[0].initialValue);
		
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn('LOGIN');
	//dataset.addColumn('DESC');
	
	
	var arrayObj = []; 
	
	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				if (constraints[i].fieldName == "COD"){
					log.info(">>>>>>>>>>>>>>>>>>>" + constraints[i].initialValue);
					
					var c1 = DatasetFactory.createConstraint('login',constraints[i].initialValue,constraints[i].initialValue,ConstraintType.MUST);
					
					log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>> TESTETETSTETET" + c1.toString());
					arrayObj.push(c1);
				} ;
				
			} catch(e) {
					log.info(">>>>>>>>>>>>>>>>>>>" + constraints[i].initialValue);
			}
		}
	}
	
	log.info(">>>>>>>>>>>>>>>>>>>" + arrayObj.toString());

	
	var users = DatasetFactory.getDataset('colleague', null,arrayObj,null);
	
	
	for(var i = 0; i < users.rowsCount; i++) {
		dataset.addRow([users.getValue(i, "login")]);
    }
	
	
	//dataset.addRow(['00024','MOCHILA']);
	//dataset.addRow(['00024','MOCHILA']);
	
	return dataset;
	
	
	
	
}function onMobileSync(user) {

}