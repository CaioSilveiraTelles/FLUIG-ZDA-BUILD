function atualizaPastaForn(numPasta){
	
	try{
		
		var auth = getUserProtheus();
		var company = hAPI.getCardValue("id_grupoempresa");
		var branch  = hAPI.getCardValue("id_empresafilial");
		var cod_pessoa  = hAPI.getCardValue("codPessoa");
		
		var serviceManager = ServiceManager.getService('PREWS005');
		var serviceProvider = serviceManager.getBean();
		var serviceLocator = serviceProvider.instantiate('com.totvs.PREWS005');
		
		var service = serviceLocator.getPREWS005SOAP();
			
		var result = service.prews005J(company, branch, auth.user, auth.pass, cod_pessoa, numPasta);
		log.info("######retorno atualização da pasta : "+result);		
		
	}catch (e) {
		log.error("Erro ao atualizar pasta do Fluig no Protheus: "+e.toString());
	}
	

}

function getUserProtheus(){
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return {user : dataset.getValue(0, "usuario"), pass : dataset.getValue(0, "senha")}; 
}