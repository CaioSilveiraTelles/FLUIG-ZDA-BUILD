//Modelo com serviço cadastrado como API = CXF - fluig: 

/**
 * Dataset generico de consulta ao Protheus.
 *
 * @param fields: Obrigatorio informar os campos que serao retornados pelo Protheus.
 * @param constraints: Obrigatorio a constraint alias que eh o nome da tabela no Protheus.
 *                     Opcional a constraint queryAddWhere (filtros da consulta) Ex: B1_COD = '003' AND B1_DESC = 'teste'.
 *                     Opcional a constraint branch que eh o numero da filial no Protheus.
 * @param sortFields: Nao implementado.
 * @returns Dataset.
 */
function createDataset(fields, constraints, sortFields) {
	
	log.info("---------------------------Inicio do dataset ds_consultaCFGTABLE_3");
	
    var dataset = DatasetBuilder.newDataset();
    var userCode = new String('MSALPHA');
    var map = getConstraints(constraints);
    var error = validateData(fields, map);
     
    if(error != ""){
        log.error(error);
        return null;
    }
    
    log.info("---------------------------Alias: " + map.get("alias"));
    log.info("---------------------------QueryAddWhere: " + map.get("queryAddWhere"));
    log.info("---------------------------Branch: " + map.get("branch"));
    log.info("---------------------------Campos: " + fields.join(","));
    
    var data = search(userCode, fields, map);
    var fieldStructList = data.get("fieldStructList");
    var fieldViewList = data.get("fieldViewList");
    var types = new Array();
     
    for(var i = 0; i < fieldStructList.size(); i++){
        dataset.addColumn(fieldStructList.get(i).getFLDNAME());
        types[i] = fieldStructList.get(i).getFLDTYPE();
        
        log.info("--------------------------- Campo: " + fieldStructList.get(i).getFLDNAME() + " do tipo " + types[i]);
    }
      
    for(var i = 0; i < fieldViewList.size(); i++){       
        var fieldView = fieldViewList.get(i);
        var arrayOfString = fieldView.getFLDTAG();
        var stringList = arrayOfString.getSTRING();
        var row = new Array();
         
        for(var j = 0; j < stringList.size(); j++){
          var value = stringList.get(j).trim();
          if (types[i] == "D" && value != "") {
              value = value.substr(6, 2) + "/" + value.substr(4, 2) + "/" + value.substr(0, 4); 
          }
          row.push(value);
        }
         
        dataset.addRow(row);
     }
     
    log.info("---------------------------Fim do dataset ds_consultaCFGTABLE_3");
    return dataset;
}
/**
 * Retorna as constraints enviadas ao Dataset.
 *
 * @param constraints: constraints enviadas ao Dataset.
 * @returns HashMap.
 */
function getConstraints(constraints){
	log.info("---------------------------Constraints:");
    var map = new java.util.HashMap();
     
    for (var i = 0; i < constraints.length; i++){       
        map.put(constraints[i].fieldName, constraints[i].initialValue);
        log.info("--------------------------- " + constraints[i].fieldName + ": " + constraints[i].initialValue); 
    }
     
    return map;
}
/**
 * Valida os parametros enviados ao Dataset.
 *
 * @param fields: Fields enviados ao Dataset.
 * @param map: Mapa das constraints enviadas ao Dataset.
 * @returns String.
 */
function validateData(fields, map){
    if(fields == null || fields.length == 0) return "Informe o fields";
    else if(map.get("alias") == null || map.get("alias") == "") return "Informe a constraint alias!";
     
    return "";
}
/**
 * Efetua a consulta no Protheus.
 *
 * @param userCode: Codigo do usuario no Protheus.
 * @param fields: Colunas a serem retornadas pela consulta.
 * @param map: Demais parametros como: alias, queryAddWhere e branch.
 * @returns HashMap.
 */
function search(userCode, fields, map){
    var service = ServiceManager.getService("CFGTABLE_2");//serviço cadastrado como API = CXF - fluig
    var bean = service.getBean();
    var instantiate = bean.instantiate("br.com.microsiga.webservices.cfgtable_apw.CFGTABLE");
    var ws = instantiate.getCFGTABLESOAP();
    var result = new java.util.HashMap();
    var queryAddWhere = (map.get("queryAddWhere") == null) ? "" : map.get("queryAddWhere");
    var branch = (map.get("branch") == null) ? "" : map.get("branch");
     
    try{
        var tableView = ws.gettable(userCode, map.get("alias"), queryAddWhere, branch, fields.join(","));
        var arrayOfFieldStruct = tableView.getTABLESTRUCT();
        var arrayOfFieldView = tableView.getTABLEDATA();
         
        result.put("fieldStructList", arrayOfFieldStruct.getFIELDSTRUCT());
        result.put("fieldViewList", arrayOfFieldView.getFIELDVIEW());
         
        return result;
    }catch(error){
        throw error;
    }
}