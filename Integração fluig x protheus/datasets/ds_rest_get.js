function createDataset(fields, constraints, sortFields) {    
    
     
	var ccod="000029";
    
	var servicoURL = "http://spon10113294:8082/rest/PRODUTOS_SB1?ccod=" + ccod;    
    
    var myApiConsumer =  oauthUtil.getGenericConsumer("","", "", "");    
    var data = myApiConsumer.get(servicoURL);    
   
  
    var dataset = DatasetBuilder.newDataset();       
    
    var objdata = JSON.parse(data);    
   
    dataset.addColumn('Descrição');
	dataset.addColumn('Tipo');
	
	dataset.addRow([objdata['Descricao '], objdata['Tipo ']]);

    return dataset;    
}  