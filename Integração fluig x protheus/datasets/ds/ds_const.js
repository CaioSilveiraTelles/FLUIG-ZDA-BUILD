function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	
    var dataset = DatasetBuilder.newDataset();
	
	var c1 = DatasetFactory.createConstraint('ccod', '000028', '000028', ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('cdescr', 'MOCHILA ROSA', 'MOCHILA ROSA', ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('ctipo', 'PA', 'PA', ConstraintType.MUST);
	
	var dataset = DatasetFactory.getDataset('ds_update', null, new Array(c1,c2,c3), null);
	
	return dataset;

	
	
	

}function onMobileSync(user) {

}