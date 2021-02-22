function sendMail(STATUS,TO, MOTIVO){
	log.info("#send email: " + STATUS);
	
	var gson = new com.google.gson.Gson();
	var mountPoint = "/public/alert/customEmailSender";
	var param = new Object();	
	param.STATUS = STATUS;
	
	if(MOTIVO != ""){
		param.MOTIVO = "Motivo : "+MOTIVO;
	}else{
		param.MOTIVO = "";
	}
		
	
	var data = new Date();
	
	dia = data.getDate();
	
	if(dia.toString().length == 1)
	param.dia = "0"+dia.toString();
	
	param.dia = dia.toString();
	
	var mes = data.getMonth().toString();
	param.mes = getMesExtenso(mes);	
	param.ano = data.getFullYear().toString();	
	
	var mail = new Object();
	mail.to = TO;
	mail.from = "naoresponda@previ.com.br";
	mail.templateId = "TPL_FORNECEDOR";
	mail.subject = "Solicitação de Cadastro: "+STATUS;
	mail.dialectId = "pt_BR";
	mail.param = param;
	mail = gson.toJson(mail);
	
	var c1 = DatasetFactory.createConstraint("json", mail, mail, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("mountPoint", mountPoint, mountPoint, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("service_genericRest", new Array(), new Array(c1,c2), new Array());

	log.info("#result send mail: " + dataset.getValue(0, "message"));
}

function getMesExtenso(mes){
	
	var mesExtenso;
	
	if(mes == "0"){
		mesExtenso = "Janeiro";
	}else if(mes == "1"){
		mesExtenso = "Fevereiro"
	}else if(mes == "2") {
		mesExtenso = "Março";
	}
	else if(mes == "3"){
		mesExtenso = "Abril";
	}
	else if(mes == "4"){ 
		mesExtenso = "Maio" ;
	}
	else if(mes == "5"){
		mesExtenso = "Junho";
	}
	else if(mes == "6"){ 
		mesExtenso = "Julho";
	}
	else if(mes == "7"){
		mesExtenso = "Agosto";
	}
	else if(mes == "8"){
		mesExtenso = "Setembro";
	}
	else if(mes == "9"){
		mesExtenso = "Outubro";
	}
	else if(mes == "10"){
		mesExtenso = "Novembro";
	}
	else if(mes == "11"){
		mesExtenso = "Dezembro";
	}
	return mesExtenso;
}