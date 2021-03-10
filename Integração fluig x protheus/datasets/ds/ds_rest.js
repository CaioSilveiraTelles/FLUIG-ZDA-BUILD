function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn('Descrição');
	dataset.addColumn('Tipo');
	
	
	log.info("INICIO======> ");
	
	var ccod = '000024';
	
	
	if(constraints != null){
        for (var i = 0; i < constraints.length; i++){               
               if(constraints[i].fieldName == 'ccod' && constraints[i].initialValue != ''){
                      log.info("ccod ===>>>" + constraints[i].initialValue);
                      ccod = constraints[i].initialValue;
               }
               
               
        }
	}
	
	
	var params ="{'ccod':'00050', 'Descr':'MOCHILA BRASIL','Tipo':'PA'}";
	
	
	
	var url = new java.net.URL("http://spon10113294:8082/rest/PRODUTOS_SB1?");
	var connection = url.openConnection();
	connection.setRequestMethod("GET");
	connection.setRequestProperty("Content-Type", "application/json");
	connection.setRequestProperty("Accept", "application/json");
	con.setFixedLengthStreamingMode(new java.lang.String(params).getBytes().length);
	
	if (connection.getResponseCode() != 200) {
		dataset.addRow([connection.getResponseCode(), "",""])
	    return dataset;
	}
	
	var br = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
	
	var jsonContent = "";
	
	while (true) {
		
		var linha = br.readLine();
		
		if (linha == null) {
			break;
		}
		
		jsonContent = linha;
		
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>" + jsonContent)
	}
	
	//Converte a string JSON em Objeto JSON
    var userData = JSON.parse(jsonContent);
	
    
  
    
    //console.log(">>>>>>>>>>>>>>>>>>>>>>" + userData.get('Descricao'));
   
    console.log(">>>>>>>>>>>>>>>>>>>>>>" + userData['Descricao']);
        	
    		dataset.addRow([userData['Descricao '], 
        	                userData['Tipo ']
    		]);
    	
   
    
	return dataset;
	
	

}