function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	  	var dataset = DatasetBuilder.newDataset();
	    
	    var ccod = DatasetFactory.createConstraint("ccod", "000049", "000049", ConstraintType.MUST);
	    var descr = DatasetFactory.createConstraint("cdescr", "MOUSE", "MOUSE", ConstraintType.MUST);
	    var tipo = DatasetFactory.createConstraint("ctipo", "PA", "PA", ConstraintType.MUST);
	    
	    var dataset = DatasetFactory.getDataset("ds_Create_Product",null, new Array (ccod,descr,tipo), null);
	    
		return dataset;
	
	
	

}function onMobileSync(user) {

}