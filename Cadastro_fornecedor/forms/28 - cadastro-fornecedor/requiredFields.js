/**
 * Carrega regra de campos obrigatórios
 * @returns void.
 */
function requiredFieldsRule(){
	$("<style>").prop("type", "text/css")
		.html("\
			.required::before{\
				content: '*';\
				color: red;\
			}").appendTo("head");
	var fields = [];
	
	
	//requiredFields.addField("text_sexo_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("id_empresafilial",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("id_grupoempresa",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("nm_cpf_cnpj",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Nome",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("nm_nome_abreviado",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("nm_nome_fantasia",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_DataSerasa",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_ObservaoSerasa",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("nm_tipo_fornecedor",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Atuacao_brasil",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Atuacao",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("Select_tipo_cadastro",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("Select_revalidacao",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	
	requiredFields.addField("text_NomeLogradouro",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_Numero",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Telefone",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Email",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("obsAprovaGesad",[GESAD_CONFERIR_PRECADASTRO]);
	requiredFields.addField("text_TelefoneAd3_socio",[]);
	requiredFields.addField("text_DataInitValidade",[]);
	requiredFields.addField("Text_CodSubItem",[]);
	requiredFields.addField("text_ativEconomica",[]);
	requiredFields.addField("txt_empresafilial",[]);
	requiredFields.addField("text_TelefoneFax",[]);
	requiredFields.addField("text_SituaoFinanceira",[]);	
	requiredFields.addField("text_isencaoINSS",[]);
	requiredFields.addField("text_EmailAd2_socio",[]);
	requiredFields.addField("text_venc_isencaoINSS",[]);
	//requiredFields.addField("text_NomeLogradouro_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_JustDomicilio",[]);
	requiredFields.addField("text_TelefoneAd1",[]);
	requiredFields.addField("text_Agncia",[]);
	//requiredFields.addField("text_Cod_Municipio",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("deleteSocio",[]);
	
	if($("#text_Atuacao_brasil").val() == "S"){
		//requiredFields.addField("text_CPFCNPJ_socio",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	}
		
	requiredFields.addField("text_venc_isencaoCSLL",[]);
	requiredFields.addField("text_venc_isencaoCOFINS",[]);
	requiredFields.addField("text_DDI",[]);
	requiredFields.addField("text_venc_isencaoPIS",[]);
	requiredFields.addField("text_liminarisencaoCSLL",[]);
	requiredFields.addField("text_TelefoneFax_socio",[]);
	requiredFields.addField("text_DDD",[]);
	requiredFields.addField("text_descCEPOM",[]);
	requiredFields.addField("text_isencaoCOFINS",[]);
	requiredFields.addField("text_NomeSocio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Abreviado_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_NomeLogradouro_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Pais_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_Mae",[]);
	requiredFields.addField("nm_tipo_solicitacao",[]);
	//requiredFields.addField("text_venc_isencaoIRRF",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_RecCSLL",[]);
	requiredFields.addField("text_tipo_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_ID",[]);
	requiredFields.addField("text_Email_socio",[]);
	//requiredFields.addField("text_Pais_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Atuacao_brasil_soc___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_isencaoPIS",[]);
	//requiredFields.addField("text_Municipio_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("obsAprovaGecond",[APROVACAO_GECON]);
	requiredFields.addField("text_CdigoIdentidadeFiscal",[]);
	requiredFields.addField("text_TelefoneAd2_socio",[]);
	requiredFields.addField("id_ins_municipal",[]);
	//requiredFields.addField("nm_estado",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Pais",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_Conta",[]);
	requiredFields.addField("text_liminarisencaoIRRF",[]);
	requiredFields.addField("addSocio",[]);
	requiredFields.addField("text_Atuao",[]);
	//requiredFields.addField("text_ORGEmis",[]);
	//requiredFields.addField("text_tipoDoc",[]);
	//requiredFields.addField("text_CEP",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_PaginaInternet",[]);
	//requiredFields.addField("text_Bairro_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_Cod_MunicipioSocio",[]);
	requiredFields.addField("aprovaGecond",[]);
	requiredFields.addField("txt_grupoempresa",[]);
	requiredFields.addField("text_Conjuge",[]);
	requiredFields.addField("text_TelefoneAd1_socio",[]);
	requiredFields.addField("text_codPessoa",[]);
	requiredFields.addField("text_cepom",[]);
	requiredFields.addField("nm_tipo_fornecedor",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_liminarisencaoCOFINS",[]);
	requiredFields.addField("text_RecPis",[]);
	//requiredFields.addField("text_Estado_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_TipoLogradouro_socio",[]);
	//requiredFields.addField("text_DtNascimento",[]);
	requiredFields.addField("text_registro_cepom",[]);
	requiredFields.addField("text_INSS",[]);
	//requiredFields.addField("text_DtEmis",[]);
	//requiredFields.addField("select_sexo_socio___",[]);
	requiredFields.addField("Text_DescProdServico",[]);
	//requiredFields.addField("text_IdentificaoFiscalExterior",[]);
	requiredFields.addField("text_liminarisencaoINSS",[]);
	requiredFields.addField("text_RecCOFINS",[]);
	//requiredFields.addField("text_codPais",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("nm_nome_fantasia",[]);
	requiredFields.addField("text_EstadoCivil",[]);
	requiredFields.addField("text_CalcInss",[]);
	//requiredFields.addField("text_Pai",[]);
	
	requiredFields.addField("nm_endereco",[]);
	requiredFields.addField("text_InscrioFiscal",[]);
	requiredFields.addField("text_RecIss",[]);
	requiredFields.addField("text_isencaoCSLL",[]);
	requiredFields.addField("text_TpLogradouro",[]);
	requiredFields.addField("text_liminarisencaoISS",[]);
	requiredFields.addField("text_EmailAd1",[]);	
	requiredFields.addField("aprovaGsad",[]);
	requiredFields.addField("addProduto",[]);
	requiredFields.addField("text_DataFinalValidade",[]);
	//requiredFields.addField("text_Naturalidade",[]);
	requiredFields.addField("text_isencaoISS",[]);
	//requiredFields.addField("text_TipoEndereo",[]);
	requiredFields.addField("text_PaginaInternet_socio",[]);
	requiredFields.addField("text_EmailAd1_socio",[]);	
	requiredFields.addField("Text_DescSubItem",[]);
	requiredFields.addField("text_venc_isencaoISS",[]);
	requiredFields.addField("text_liminarisencaoPIS",[]);
	requiredFields.addField("text_TelefoneAd2",[]);
	//requiredFields.addField("text_CEP_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);	
	//requiredFields.addField("text_CodOcupacao",[]);
	requiredFields.addField("id_insc_estadual",[]);
	requiredFields.addField("Text_OptSimp",[]);
	requiredFields.addField("text_CapSocial",[]);
	//requiredFields.addField("text_Bairro",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_ValorCapSocial",[]);
	requiredFields.addField("text_TelefoneAd3",[]);
	//requiredFields.addField("text_Pessoa_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("text_isencaoIRRF",[]);
	requiredFields.addField("text_Banco",[]);
	requiredFields.addField("Text_CodProdServico",[]);
	//requiredFields.addField("text_Numero_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("Text_ddi_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("Text_ddd_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	//requiredFields.addField("text_Telefone_socio___",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);	
			
	requiredFields.addField("text_Email",[]);
	requiredFields.addField("text_CalIRFF",[]);
	requiredFields.addField("text_EmailAd2",[]);
	//requiredFields.addField("text_Municipio",[0,INICIO,GESAD_CONFERIR_PRECADASTRO,CORRIGIR_INFORMACOES]);
	requiredFields.addField("obsAprovaConferencia",[NOTIFICAR_GECON_PARA_COMPLEMENTO_DE_CADASTRO]);			
	
	fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		
		if(fields[i].activities.indexOf(CURRENT_STATE)>= 0)
			setRequired(fields[i].name, true);
	}
}
