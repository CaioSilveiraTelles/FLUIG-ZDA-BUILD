function createDataset(fields, constraints, sortFields) {    
    

	/*
     * Exemplo de PK e Filtro  
     * var pk = "/"+"";  
     * Filtro que será aplicado no método SetFilter() 
     * var filter = "?"+"filter=A1_LOJA=01 AND A1_NOME=CLI FELIPE";  
     * Ao passar filtro, a estrutura de retorno muda e deve ser eliminado a raiz resources[0]  
    */    
    

	var ccod ="000024"
	
    var servicoURL = "http://spon10113294:8082/rest/PRODUTOS_SB1?ccod=" + ccod;    
    
    var myApiConsumer =  oauthUtil.getGenericConsumer("","", "", "");    
    var data = myApiConsumer.get(servicoURL);    
    /* Folha de Exemplo Json 
        "{'id':'MATA090','operation':1,'pk':'ICAyNC8wMy8xNg==','models':[{'id':'SM2MASTER','modeltype':'FIELDS','fields':[{'id':'M2_DATA','order':1,'value':'20160324'},{'id':'M2_MOEDA2','order':1,'value': '4.20'}]}]}"        
    */      
  
    var dataset = DatasetBuilder.newDataset();     
	dataset.addColumn('Descrição');
	dataset.addColumn('Tipo');
	
    
    var objdata = JSON.parse(data);    
    
    
    
    dataset.addRow([objdata['Descricao '], objdata['Tipo ']]);
    	
    
    
    /*
    for (var i = 0; i < objdata.resources[0].models[0].fields.length; i++)   {    
       dataset.addColumn(objdata.resources[0].models[0].fields[i].id);  };    
        
    for (var i = 0; i < objdata.count; i++)  {    
        var data =new Array();    
        for(var j=0; j<objdata.resources[0].models[0].fields.length; j++)  {    
          data[j] = objdata.resources[i].models[0].fields[j].value;          }    
      
            
         */   
            
          
          
    
    return dataset;    
}  