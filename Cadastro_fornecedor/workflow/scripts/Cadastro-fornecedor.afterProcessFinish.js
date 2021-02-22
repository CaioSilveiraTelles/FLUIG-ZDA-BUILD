function afterProcessFinish(processId){
	log.info("#afterProcessFinish processId: "+processId);
	var company = getValue("WKCompany");
	deleteGroups(company);
}