$(document).ready(function(){
	
	$('#enviar_contato').click(function(){
		
		
		
		 var myDateRequest = new Date(Date.now());
		 var dt        = myDateRequest.toLocaleString();
		 
		  var name     = $("#fname").val();
	      var email    = $("#fmail").val();
	      var sexo     = $("#sexo").val();
	      var estado   = $("#estado").val();
	      var pergunta = $("#pergunta").val();
	      var mensagem = $("#message").val();
	 
	      
	     if(email!='' && name!=''){
	      
		    //template envelope XML
				var _xml = null;
				$.ajax({
					url : '/template/resources/css/assets/js/xmls/ECMWFEngineService_simpleStartProcess.xml',
					async : false,
					type : "get",
					datatype : "xml",
					success : function(xml) {
						_xml = $(xml)
					}
	
				});
		      console.log(_xml)
		      
		      console.log(name+'-'+email+'-'+pergunta)
		      
		      
		      //Alterar os valores recuperados na variavel _xml
			_xml.find("companyId").text(4);
			_xml.find("username").text("paula.lopes");
			_xml.find("password").text("paula.lopes");
			_xml.find("processId").text("webinar_atendimento");
			_xml.find("comments").text('Processo inicializado atraves do Portal de Atendimento');
	
			//descricao do chamado 
			
			_xml.find("[name='fname']").text(name);
			_xml.find("[name='fmail']").text(email);
			_xml.find("[name='sexo']").text(sexo);
			_xml.find("[name='estado']").text(estado);
			_xml.find("[name='pergunta']").text(pergunta);
			_xml.find("[name='dtRequest']").text(dt);
			_xml.find("[name='mensagem']").text(mensagem);
			
			
			console.log(_xml[0]);

			
			//Usar o metodo WCMAPI.Create para chamar o webservice
			WCMAPI.Create({
				url : "/webdesk/ECMWorkflowEngineService?wsdl",
				contentType : "text/xml",
				dataType : "xml",
				data : _xml[0],
				success : function(data) {
					
					 $('#messageRet').html('Muito obrigado por participar,  <span class="destaque">'+name+'  ;)</span> ');
					
				}
			})
			
			
			 $('#enviar_contato').hide();
			
	     }else{
	    	 $('#messageRet').html('<span class="destaque">Ops :(</span> informe os dados antes de enviar ');
	    	 $('#btnSaiba').remove();
				
	     }
	      
	      
	   
		
	})
	
	
});

		
	