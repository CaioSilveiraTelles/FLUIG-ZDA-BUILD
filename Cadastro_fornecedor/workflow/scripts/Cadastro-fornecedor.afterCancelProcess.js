function afterCancelProcess(colleagueId,processId){
	log.info("#afterCancelProcess processId: "+processId);
	var company = getValue("WKCompany");
	deleteGroups(company);
}