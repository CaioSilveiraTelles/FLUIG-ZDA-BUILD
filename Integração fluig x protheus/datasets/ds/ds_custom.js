function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	
	
	log.info(vcod +">>>>>>>>>>>>>>>>");
	log.info(vdesc + ">>>>>>>>>>>>>>>>");
	log.info(vtipo + ">>>>>>>>>>>>>>>>>>>");
		
	var dataset = DatasetBuilder.newDataset();

	
		
	
	if (constraints != null) {
		var vcod = constraints[0].initialValue;
		var vdesc = constraints[1].initialValue;
		var vtipo = constraints[2].initialValue;
		
	} else {
		var vcod  =  '000033';
		var vdesc = 'MOCHILA PETER';
		var vtipo = 'PA';
	
	}
	
	
	dataset.addColumn("iNFO");
	
	var serviceData = data();
	var params = serviceData.inputValues;

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getWSPRODUTOSSOAP();
	
	var response = service.incMATA010(vcod, vdesc,vtipo );
	
	response = response.getSTRUCTRET();
	
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>" + response.toString());	
	
	//dataset.addRow([response.get(0).getINFO()]);
	return dataset;
	
}function onMobileSync(user) {

}


function data() {
	return {
  "fluigService" : "protheus_fluig",
  "operation" : "incMATA010",
  "soapService" : "WSPRODUTOS",
  "portType" : "WSPRODUTOSSOAP",
  "locatorClass" : "com.fluig.WSPRODUTOS",
  "portTypeMethod" : "getWSPRODUTOSSOAP",
  "parameters" : [ ],
  "inputValues" : {
    "ccod" : vcod,
    "cdescr" : vdesc,
    "ctipo" :vtipo,
  },
  "inputAssignments" : {
    "ccod" : "VALUE",
    "cdescr" : "VALUE",
    "ctipo" : "VALUE"
  },
  "outputValues" : {
    "iNFO" : ""
  },
  "outputAssignments" : {
    "iNFO" : "VALUE"
  },
  "extraParams" : {
    "enabled" : false
  }
}
}
