function verificaCorrelato(idGrupo){
	log.info("###verificaCorrelato###");		
	
	var groups = DatasetFactory.getDataset("ds_cargos_correlato", null, null, null);	
	log.info("###ds_cargos_correlato ### "+groups.rowsCount);	
		
		for(var i = 0; i < groups.rowsCount; i++){
			
			if(groups.getValue(i, "CodGer") == idGrupo){
			
				return {grupoCorrelato : true, codigoNucleo : groups.getValue(i, "NUCLEO"), codigoExecutivo : groups.getValue(i, "EXECUTIVO")};
				
			}						
				
		}				
		return {grupoCorrelato : false, codigoNucleo : "", codigoExecutivo : ""};
		
}