/**
 * Método para listar os filhos de um pai x filho
 * @param form: Referência da ficha
 * @param fields: Array dos campos que pertencem ao pai x filho
 * @returns {Array[][]} Array de String com as chaves e valores
 */
function getFilhosForm(form, fields){
	var cardData = new java.util.HashMap(); 
	
	cardData = form;
	
	var it = cardData.keySet().iterator();
	var listaFilho = new Array();

	while (it.hasNext()) {
		var key = it.next();
 		var campo = key.split("___");
 		
 		for (var i = 0; i < fields.length; i++){
 			
 			//log.info("#fields[i]: " + fields[i]+ " campo[0]: " + campo[0] + " key.indexOf('___'): " + key.indexOf('___'));
 			
 			if (key.indexOf('___') >= 0 && fields[i] == campo[0]) {
 				listaFilho.push([key, cardData.get(key)]);
	 			log.info("#GETFILHOS -------- Key = " + key + " - " + cardData.get(key));
	 		}
 		}
	}
	
	return listaFilho;
}