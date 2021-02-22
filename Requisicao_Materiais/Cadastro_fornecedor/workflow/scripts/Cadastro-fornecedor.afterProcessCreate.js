function afterProcessCreate(processId){
	log.info("#afterProcessCreate: " + processId);
	
    var data = new Date();
    var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
    hAPI.setCardValue("dtAbertura", formatoData.format(data));
}