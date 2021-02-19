$("#cep").blur(function(){
	$.getJSON("//viacep.com.br/ws/"+$("#cep").val()+"/json/",function(dados){
		$("#Logradouro").val(dados.Logradouro);
		$("#Bairro").val(dados.Bairro);
		$("#cidade").val(dados.cidade);
		$("#Estado").val(dados.Estado);		
	})
});