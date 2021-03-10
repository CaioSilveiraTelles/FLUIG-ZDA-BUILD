function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();
    
    var ccod = DatasetFactory.createConstraint("ccod", "000030", "000030", ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("ds_Get_Product",null, new Array (ccod), null);
    
	return dataset;
	
	
	
}function onMobileSync(user) {

}