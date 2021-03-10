
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

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getWSPRODUTOSSOAP();
	var response = service.getMATA010(params.ccod);

	return response;
}

function defineStructure() {
		addColumn("dESCRICAO");
	addColumn("tIPO");
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

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	result = result.getSTRUCTPROD();

		dataset.addColumn("dESCRICAO");
	dataset.addColumn("tIPO");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getDESCRICAO(), result.get(i).getTIPO()]);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('ccod');

	var ccod = isPrimitive(params.ccod) ? params.ccod : JSONUtil.toJSON(params.ccod);

	dataset.addRow([error.message, ccod]);

	return dataset;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("spon10113294._8033.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "SOAP_PRODUTO",
  "operation" : "getMATA010",
  "soapService" : "WSPRODUTOS",
  "portType" : "WSPRODUTOSSOAP",
  "locatorClass" : "spon10113294._8033.WSPRODUTOS",
  "portTypeMethod" : "getWSPRODUTOSSOAP",
  "parameters" : [ ],
  "inputValues" : {
    "ccod" : ""
  },
  "inputAssignments" : {
    "ccod" : "VALUE"
  },
  "outputValues" : {
    "tIPO" : "",
    "dESCRICAO" : ""
  },
  "outputAssignments" : {
    "tIPO" : "VALUE",
    "dESCRICAO" : "VALUE"
  },
  "extraParams" : {
    "enabled" : false
  }
}
}