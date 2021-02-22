function verificaGrupo(idGrupo){
	log.info("###verificaGrupo###");
	var groups = DatasetFactory.getDataset("dsGrupoDiretoria", null, null, null);	
	
	for(var i = 0; i < groups.rowsCount; i++){
		log.info("### GROUP_CODE : "+groups.getValue(i, "GROUP_CODE"));
		log.info("### GROUP_CODE : "+"D"+idGrupo);
		if(groups.getValue(i, "GROUP_CODE") == "D"+idGrupo){
			
			var diretoria = groups.getValue(i, "GROUP_CODE");
			
			var dsDiretor = DatasetFactory.getDataset("dsDiretoriaxDiretores", null, null, null);	
			
			var grupoDiretor = dsDiretor.getValue(0, diretoria);
			log.info("###codigoGrupoDiretoria ###"+diretoria);
			log.info("###codigoGrupoDiretor ###"+grupoDiretor);
			return {grupoDiretoria : true, codigoGrupoDiretoria : diretoria, codigoGrupoDiretor : grupoDiretor};
		}		
		
	}	
	log.info("###codigoGrupoDiretoria ### vazio");
	log.info("###codigoGrupoDiretor ### vazio");
	return {grupoDiretoria : false, codigoGrupoDiretoria : "", codigoGrupoDiretor : ""};
	
}