function createDataset(fields, constraints, sortFields) {
	
	
	
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;

	//verifyConstraints(serviceData.inputValues, constraints);
	
	if (constraints != null) {
		var vcod = constraints[0].initialValue;
		var vdesc = constraints[1].initialValue;
		var vtipo = constraints[2].initialValue;
		
	} else {
		var vcod  =  '000033';
		var vdesc = 'MOCHILA PETER';
		var vtipo = 'PA';
	
	}

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getWSPRODUTOSSOAP();
	var response = service.excMATA010(vcod, vdesc, vtipo);

	return response;
}

function defineStructure() {
		addColumn("INFO");
}

function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

/*function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}*/

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();
	
	

	result = result.getSTRUCTRET();

		dataset.addColumn("iNFO");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getINFO()]);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
	//verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('ccod');
	dataset.addColumn('cdescr');
	dataset.addColumn('ctipo');

	var ccod = isPrimitive(params.ccod) ? params.ccod : JSONUtil.toJSON(params.ccod);
	var cdescr = isPrimitive(params.cdescr) ? params.cdescr : JSONUtil.toJSON(params.cdescr);
	var ctipo = isPrimitive(params.ctipo) ? params.ctipo : JSONUtil.toJSON(params.ctipo);

	dataset.addRow([error.message, ccod, cdescr, ctipo]);

	return dataset;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.fluig.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "protheus_fluig",
  "operation" : "excMATA010",
  "soapService" : "WSPRODUTOS",
  "portType" : "WSPRODUTOSSOAP",
  "locatorClass" : "com.fluig.WSPRODUTOS",
  "portTypeMethod" : "getWSPRODUTOSSOAP",
  "parameters" : [ ],
  "inputValues" : {
    "ccod" : "",
    "cdescr" : "",
    "ctipo" : ""
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