function servicetask63(attempt, message) {
	try {
		log.info("#=============================== INICIO INTEGRACAO PROTHEUS ================================");
		
		var user = getValue("WKUser");
		var processId = getValue("WKNumProces");
		var cardData = hAPI.getCardData(processId);
		var auth = getUserProtheus();
		var serviceFluig = ServiceManager.getService('PREWS005AXIS');
		var serviceHelper = serviceFluig.getBean();
		var serviceLocator = serviceHelper.instantiate('com.totvs.PREWS005Locator');			        
		var service = serviceLocator.getPREWS005SOAP();
		var fornecedor = serviceHelper.instantiate('com.totvs.TFORNECEDOR');
		var arrayProdutos = serviceHelper.instantiate('com.totvs.ARRAYOFOPRODUTOS');
		var produtos = [];
		var arrayContatos = serviceHelper.instantiate('com.totvs.ARRAYOFOCONTATO');
		var contatos = [];
		log.info("#===============================  INTEGRACAO PROTHEUS ================================");
		
		var properties = {};
		properties["disable.chunking"] = "true";
		properties["log.soap.messages"] = "true";	
		
		//var customClient = serviceFluig.getCustomClient(service, "com.totvs.PREWS005", properties);			
		
		/**
		 * LISTA DE PRODUTOS
		 */
		var detailProduto = getFilhosForm(cardData, new Array("TEXT_CODPRODSERVICO"));
		
		
		for(var i = 0; i < detailProduto.length; i++){
			var index = detailProduto[i][0].split("___")[1];
		
			var produto = serviceHelper.instantiate('com.totvs.OPRODUTOS');
			produto.setCDESCRICAO(hAPI.getCardValue("Text_DescSubItem___"+index));
			produto.setCCODIGO(hAPI.getCardValue("Text_CodSubItem___"+index));
			produto.setCREGCEPOM(hAPI.getCardValue("text_cepom___"+index));
	
			produtos.push(produto)
		}
		log.info("#===============================  INTEGRACAO PROTHEUS 2================================");
		arrayProdutos.setOPRODUTOS(produtos);
		fornecedor.setAPRODUTOS(arrayProdutos);
		
		/**
		 * LISTA DE SÓCIO
		 */
		log.info("###################### OCONTATO ################");
		var detailSocio = getFilhosForm(cardData, new Array("TEXT_TIPO_SOCIO"));
		log.info("detailSocio : "+detailSocio);
/*		if(detailSocio.length == 0){
			var contato = serviceHelper.instantiate('com.totvs.OCONTATO');
			contatos.push(contato);
		}	*/				
		
		for(var i = 0; i < detailSocio.length; i++){
			var index = detailSocio[i][0].split("___")[1];	
			log.info("#===================== OBJETO OCONTATO NR: " + index + " ================");
			var contato = serviceHelper.instantiate('com.totvs.OCONTATO');
			contato.setCTIPOSOC(hAPI.getCardValue("text_tipo_socio___"+index));
			contato.setCENDERSOC(hAPI.getCardValue("text_NomeLogradouro_socio___"+index));
			contato.setCTELADIC2SOC(hAPI.getCardValue("text_TelefoneAd2_socio___"+index));
			contato.setCNOMEABREVSOC(hAPI.getCardValue("text_Abreviado_socio___"+index));
			contato.setCMUNICIPIOSOC(hAPI.getCardValue("text_Municipio_socio___"+index));
			contato.setCCOMPLEMSOC(hAPI.getCardValue("text_Complemento_socio___"+index));
			contato.setCTPLOGSOC(hAPI.getCardValue("text_TipoLogradouro_socio___"+index));
			contato.setCBAIRROSOC(hAPI.getCardValue("text_Bairro_socio___"+index));
			//contato.setCESTADOSOC(hAPI.getCardValue("text_Estado_socio___"+index));
			contato.setCESTADOSOC(hAPI.getCardValue("text_Estado_socio___"+index) == "" ? "EX" : hAPI.getCardValue("text_Estado_socio___"+index));
			contato.setCHOMPAGESOC(hAPI.getCardValue("text_PaginaInternet_socio___"+index));
			contato.setCNOMESOC(hAPI.getCardValue("text_NomeSocio___"+index));
			contato.setCCODSOCIO(hAPI.getCardValue("text_Pessoa_socio___"+index));
			contato.setCCODPAISSOC(hAPI.getCardValue("text_Pais_socio_code___"+index));
			contato.setCPAISSOC(hAPI.getCardValue("text_Pais_socio___"+index));
			contato.setCNUMEROSOC(hAPI.getCardValue("text_Numero_socio___"+index));
			contato.setCEMAILADIC2SOC(hAPI.getCardValue("text_EmailAd2_socio___"+index));
			contato.setCTELADIC1SOC(hAPI.getCardValue("text_TelefoneAd1_socio___"+index));
			contato.setCTELEFONESOC(hAPI.getCardValue("text_Telefone_socio___"+index));
			contato.setCCEPSOC(hAPI.getCardValue("text_CEP_socio___"+index).replace("-",""));
			contato.setCCODMUNICIOSOC(hAPI.getCardValue("text_Cod_MunicipioSocio___"+index));
			contato.setCEMAILADIC1SOC(hAPI.getCardValue("text_EmailAd1_socio___"+index));
			contato.setCTELADIC3SOC(hAPI.getCardValue("text_TelefoneAd3_socio___"+index));
			contato.setCSEXOSOC(hAPI.getCardValue("text_sexo_socio___"+index));
			contato.setCDDI(hAPI.getCardValue("Text_ddi_socio___"+index).replace("&nbsp;",""));
			contato.setCDDD(hAPI.getCardValue("Text_ddd_socio___"+index));
			contato.setCFAXSOC(hAPI.getCardValue("text_TelefoneFax_socio___"+index));
			contato.setCCNPJCPFSOC(hAPI.getCardValue("text_CPFCNPJ_socio___"+index).replace(".","").replace("-","").replace("/","").replace(".",""));
			contato.setCEMAILSOC(hAPI.getCardValue("text_Email_socio___"+index));
			log.info("contato : "+contato);
			contatos.push(contato);
			log.info("contatos : "+contatos);
		}		
		arrayContatos.setOCONTATO(contatos);
		log.info("arrayContatos : "+arrayContatos);
		fornecedor.setACONTATOS(arrayContatos);
		
		/**
		 * CADASTRO GERAL
		 */
		
		fornecedor.setCPASSWORD(hAPI.getCardValue("Text_Senha_Fornecedor_Portal"));
		fornecedor.setCBAIRRO(hAPI.getCardValue("text_Bairro"));
		//fornecedor.setDDATCAPS2(getJavaDate("17/08/2016"));
		fornecedor.setCISENTOISS(hAPI.getCardValue("text_isencaoISS"));
		fornecedor.setCINSMUNIC(hAPI.getCardValue("id_ins_municipal"));
		fornecedor.setCINSESTAD(hAPI.getCardValue("id_insc_estadual"));
		fornecedor.setCCODMUNIC(hAPI.getCardValue("text_Cod_Municipio"));
		fornecedor.setCTELADIC1(hAPI.getCardValue("text_TelefoneAd1"));
		fornecedor.setCTELADIC2(hAPI.getCardValue("text_TelefoneAd2"));
		fornecedor.setCTELADIC3(hAPI.getCardValue("text_TelefoneAd3"));		
		fornecedor.setDVALIDLIMINARINSS(hAPI.getCardValue("text_venc_isencaoISS"));
		fornecedor.setCCOOPERATIVA(hAPI.getCardValue("Select_cooperativa"));
		//fornecedor.setCINSESTAD2("");
		fornecedor.setDVALIDLIMINARPIS(hAPI.getCardValue("text_venc_isencaoPIS"));
		fornecedor.setCCEP(hAPI.getCardValue("text_CEP").replace("-",""));
		fornecedor.setCNOMEABREVIADO(hAPI.getCardValue("nm_nome_abreviado"));
		fornecedor.setCORGEMIS(hAPI.getCardValue("text_ORGEmis"));
		fornecedor.setCLIMINARCSLL(hAPI.getCardValue("text_liminarisencaoCSLL"));
		fornecedor.setCMUNICIPIO(hAPI.getCardValue("text_Municipio")== "" ? "EX" : hAPI.getCardValue("text_Municipio"));
		fornecedor.setCESTADO(hAPI.getCardValue("nm_estado") == "" ? "EX" : hAPI.getCardValue("nm_estado"));
		fornecedor.setCLIMINARISS(hAPI.getCardValue("text_liminarisencaoISS"));
		fornecedor.setCRAZAOSOCIAL(hAPI.getCardValue("text_Nome"));
		fornecedor.setCOPTSIMP(hAPI.getCardValue("Text_OptSimp") == "" ? "2" : hAPI.getCardValue("Text_OptSimp"));
		//fornecedor.setCOBSSER2("");
		fornecedor.setCPAIS(hAPI.getCardValue("text_Pais"));
		fornecedor.setDVALIDLIMINARIRFF(hAPI.getCardValue("text_venc_isencaoIRRF"));
		fornecedor.setCSEXO(hAPI.getCardValue("text_sexo"));
		fornecedor.setCLIMINARCSLLINDETERMINADO(hAPI.getCardValue("Text_venc_csll_indeterminado"));
		fornecedor.setCISENTOINSS(hAPI.getCardValue("text_isencaoINSS"));
		log.info("#####text_ValorCapSocial"+hAPI.getCardValue("text_ValorCapSocial"));
		if(hAPI.getCardValue("text_ValorCapSocial") != "" && hAPI.getCardValue("text_ValorCapSocial") != null){
			log.info("### text_ValorCapSocial"+hAPI.getCardValue("text_ValorCapSocial").replace(".","").replace(".","").replace(".","").replace(",","."));
			fornecedor.setNVALCAPS(hAPI.getCardValue("text_ValorCapSocial").replace(".","").replace(".","").replace(".","").replace(",","."));
		}else{
			fornecedor.setNVALCAPS("");
		}
		fornecedor.setCLIMINARIRFF(hAPI.getCardValue("text_liminarisencaoIRRF"));
		fornecedor.setCEMAIL(hAPI.getCardValue("text_Email"));
		fornecedor.setCHOMEPAGE(hAPI.getCardValue("text_PaginaInternet"));
		fornecedor.setCLIMINARCOF(hAPI.getCardValue("text_liminarisencaoCOFINS"));
		fornecedor.setCISENTOCOF(hAPI.getCardValue("text_isencaoCOFINS"));
		fornecedor.setCNFANTASIA(hAPI.getCardValue("nm_nome_fantasia"));
		fornecedor.setCDDI(hAPI.getCardValue("text_DDI").replace("&nbsp;",""));
		fornecedor.setDDATASER(hAPI.getCardValue("text_DataSerasa"));
		//fornecedor.setCNIRE2("");
		fornecedor.setCDDD(hAPI.getCardValue("text_DDD"));
		fornecedor.setCEMAILADIC1(hAPI.getCardValue("text_EmailAd1"));
		fornecedor.setCEMAILADIC2(hAPI.getCardValue("text_EmailAd2"));
		//fornecedor.setCINSMUNIC2("");
		fornecedor.setCLIMINARINSS(hAPI.getCardValue("text_liminarisencaoINSS"));
		fornecedor.setDDATCAPS(hAPI.getCardValue("text_CapSocial"));
		//fornecedor.setNVALCAPS2(new java.lang.Float("10.00"));
		fornecedor.setDVALIDLIMINARCOF(hAPI.getCardValue("text_venc_isencaoCOFINS"));
		fornecedor.setCISENTOIRFF(hAPI.getCardValue("text_isencaoIRRF"));
		fornecedor.setCTIPO(hAPI.getCardValue("nm_tipo_fornecedor"));
		fornecedor.setCCODPAIS(hAPI.getCardValue("text_codPais"));
		fornecedor.setCNIRE(hAPI.getCardValue("text_NIRE"));
		fornecedor.setCTIPODOC(hAPI.getCardValue("text_tipoDoc"));
		fornecedor.setCISENTOPIS(hAPI.getCardValue("text_isencaoPIS"));
		fornecedor.setCLIMINARPIS(hAPI.getCardValue("text_liminarisencaoPIS"));
		fornecedor.setCTELEFONE(hAPI.getCardValue("text_Telefone"));
		fornecedor.setCISENTOCSLL(hAPI.getCardValue("text_isencaoCSLL"));
		fornecedor.setCCODIGOPESSOA(hAPI.getCardValue("codPessoa"));
		fornecedor.setDVALIDLIMINARCSLL(hAPI.getCardValue("text_venc_isencaoCSLL"));
		fornecedor.setDDTEMIS(hAPI.getCardValue("text_DtEmis"));
		fornecedor.setCLIMINARINSSINDETERMINADO(hAPI.getCardValue("Text_venc_inss_indeterminado"));
		fornecedor.setCLIMINARISSINDETERMINADO(hAPI.getCardValue("Text_venc_iss_indeterminado"));
		fornecedor.setCOBSSER(hAPI.getCardValue("text_ObservaoSerasa"));
		//fornecedor.setDDATASER2("");
		fornecedor.setCDOCCONSTITUICAO(hAPI.getCardValue("text_DocConstituicao"));
		fornecedor.setCLIMINARCOFINSINDETERMINADO(hAPI.getCardValue("Text_venc_cofins_indeterminado"));
		fornecedor.setDVALIDLIMINARISS(hAPI.getCardValue("text_venc_isencaoISS"));
		fornecedor.setCFAX(hAPI.getCardValue("text_TelefoneFax"));
		fornecedor.setCLIMINARPISINDETERMINADO(hAPI.getCardValue("Text_venc_pis_indeterminado"));
		fornecedor.setCATIVECO(hAPI.getCardValue("cod_ativEconomica"));
		fornecedor.setCNUMDOC(hAPI.getCardValue("text_ID"));
		fornecedor.setCLIMINARIRFFINDETERMINADO(hAPI.getCardValue("Text_venc_irrf_indeterminado"));
		fornecedor.setCCNPJCPF(hAPI.getCardValue("nm_cpf_cnpj").replace(".","").replace("-","").replace("/","").replace(".",""));
		
		fornecedor.setCESTCIVIL(hAPI.getCardValue("text_EstadoCivil"));		
		fornecedor.setCCONJUGE(hAPI.getCardValue("text_Conjuge"));
		fornecedor.setCPAI(hAPI.getCardValue("text_Pai"));
		fornecedor.setCMAE(hAPI.getCardValue("text_Mae"));
		//if(hAPI.getCardValue("nm_tipo_fornecedor") == "F"){
			fornecedor.setCNACIONALIDADE(hAPI.getCardValue("cod_nacionalidade"));
			fornecedor.setCNATURALIDADE(hAPI.getCardValue("text_Naturalidade"));			
		//}
		fornecedor.setCINSS(hAPI.getCardValue("text_INSS"));
		fornecedor.setDDTNASC(hAPI.getCardValue("text_DtNascimento"));
		fornecedor.setCIDENTEXT(hAPI.getCardValue("text_IdentificaoFiscalExterior"));
		fornecedor.setDINICIDENTEXT(hAPI.getCardValue("text_DataInicioValidade"));
		fornecedor.setDFIMIDENTEXT(hAPI.getCardValue("text_DataFinalValidade"));
		fornecedor.setCBANCO(hAPI.getCardValue("cod_Banco"));
		fornecedor.setCAGENCIA(hAPI.getCardValue("numAgenc"));
		fornecedor.setCCONTA(hAPI.getCardValue("text_Conta"));
		fornecedor.setCDVAGE(hAPI.getCardValue("codDvAgenc"));
		fornecedor.setCDVCONTA(hAPI.getCardValue("text_dv_conta"));
		fornecedor.setCJUSTIFNCADBCO(hAPI.getCardValue("text_JustDomicilio"));
		fornecedor.setCTPLOG(hAPI.getCardValue("text_TpLogradouro"));
		fornecedor.setCENDERECO(hAPI.getCardValue("text_NomeLogradouro"));
		fornecedor.setCNUMERO(hAPI.getCardValue("text_Numero"));
		fornecedor.setCCOMPLEMENTO(hAPI.getCardValue("text_Complemento"));
		fornecedor.setLPORTAL(hAPI.getCardValue("portal") == "true" ? true : false);
		
		log.info("#=================== FORNECEDOR VALUES ========================");
		log.info("#getCESTCIVIL: "+fornecedor.getCESTCIVIL());
		log.info("#getCOBSSER: "+fornecedor.getCOBSSER());
		log.info("#getCESTADO: "+fornecedor.getCESTADO());
		log.info("#getDDTNASC: "+fornecedor.getDDTNASC());
		log.info("#getCTELADIC1: "+fornecedor.getCTELADIC1());
		log.info("#getCTELADIC2: "+fornecedor.getCTELADIC2());
		log.info("#getCRAZAOSOCIAL: "+fornecedor.getCRAZAOSOCIAL());
		log.info("#getCTELADIC3: "+fornecedor.getCTELADIC3());
		log.info("#getCDVAGE: "+fornecedor.getCDVAGE());
		log.info("#getCTELEFONE: "+fornecedor.getCTELEFONE());
		log.info("#getCISENTOCOF: "+fornecedor.getCISENTOCOF());
		log.info("#getCINSS: "+fornecedor.getCINSS());
		log.info("#getCISENTOCSLL: "+fornecedor.getCISENTOCSLL());
		log.info("#getCSEXO: "+fornecedor.getCSEXO());
		//log.info("#getCNIRE2: "+fornecedor.getCNIRE2());
		log.info("#getClass: "+fornecedor.getClass());
		log.info("#getCINSMUNIC: "+fornecedor.getCINSMUNIC());
		log.info("#getCNFANTASIA: "+fornecedor.getCNFANTASIA());
		log.info("#getCLIMINARCOF: "+fornecedor.getCLIMINARCOF());
		log.info("#getCBAIRRO: "+fornecedor.getCBAIRRO());
		log.info("#getCLIMINARISSINDETERMINADO: "+fornecedor.getCLIMINARISSINDETERMINADO());
		log.info("#getCDVCONTA: "+fornecedor.getCDVCONTA());
		log.info("#getCLIMINARINSS: "+fornecedor.getCLIMINARINSS());
		log.info("#getAPRODUTOS: "+fornecedor.getAPRODUTOS());
		log.info("#getCTPLOG: "+fornecedor.getCTPLOG());
		log.info("#getCAGENCIA: "+fornecedor.getCAGENCIA());
		log.info("#getNVALCAPS: "+fornecedor.getNVALCAPS());
		log.info("#getCNUMERO: "+fornecedor.getCNUMERO());
		//log.info("#getNVALCAPS2: "+fornecedor.getNVALCAPS2());
		//log.info("#getDDATASER2: "+fornecedor.getDDATASER2());
		log.info("#getDFIMIDENTEXT: "+fornecedor.getDFIMIDENTEXT());
		log.info("#getCISENTOIRFF: "+fornecedor.getCISENTOIRFF());
		log.info("#getCCOMPLEMENTO: "+fornecedor.getCCOMPLEMENTO());
		log.info("#getCCONTA: "+fornecedor.getCCONTA());
		//log.info("#getCOBSSER2: "+fornecedor.getCOBSSER2());
		log.info("#getCDOCCONSTITUICAO: "+fornecedor.getCDOCCONSTITUICAO());
		log.info("#getCISENTOINSS: "+fornecedor.getCISENTOINSS());
		log.info("#getCNATURALIDADE: "+fornecedor.getCNATURALIDADE());
		log.info("#getCLIMINARIRFF: "+fornecedor.getCLIMINARIRFF());
		log.info("#getCISENTOISS: "+fornecedor.getCISENTOISS());
		log.info("#getCTIPO: "+fornecedor.getCTIPO());
		log.info("#getCEMAILADIC2: "+fornecedor.getCEMAILADIC2());
		log.info("#getCEMAILADIC1: "+fornecedor.getCEMAILADIC1());
		log.info("#getCMUNICIPIO: "+fornecedor.getCMUNICIPIO());
		log.info("#getCNIRE: "+fornecedor.getCNIRE());
		log.info("#getCMAE: "+fornecedor.getCMAE());
		log.info("#getCLIMINARIRFFINDETERMINADO: "+fornecedor.getCLIMINARIRFFINDETERMINADO());
		log.info("#getACONTATOS: "+fornecedor.getACONTATOS());
		log.info("#getCLIMINARCSLLINDETERMINADO: "+fornecedor.getCLIMINARCSLLINDETERMINADO());
		log.info("#getCLIMINARPIS: "+fornecedor.getCLIMINARPIS());
		log.info("#getCNUMDOC: "+fornecedor.getCNUMDOC());
		log.info("#getCNACIONALIDADE: "+fornecedor.getCNACIONALIDADE());
		log.info("#getCPAIS: "+fornecedor.getCPAIS());
		log.info("#getDVALIDLIMINARPIS: "+fornecedor.getDVALIDLIMINARPIS());
		log.info("#getCORGEMIS: "+fornecedor.getCORGEMIS());
		log.info("#getCCODIGOPESSOA: "+fornecedor.getCCODIGOPESSOA());
		log.info("#getCLIMINARCSLL: "+fornecedor.getCLIMINARCSLL());
		log.info("#getCCONJUGE: "+fornecedor.getCCONJUGE());
		log.info("#getCNOMEABREVIADO: "+fornecedor.getCNOMEABREVIADO());
		log.info("#getCCODPAIS: "+fornecedor.getCCODPAIS());
		log.info("#getDVALIDLIMINARINSS: "+fornecedor.getDVALIDLIMINARINSS());
		log.info("#getDDATASER: "+fornecedor.getDDATASER());
		log.info("#getCDDI: "+fornecedor.getCDDI());
		log.info("#getCENDERECO: "+fornecedor.getCENDERECO());
		log.info("#getCDDD: "+fornecedor.getCDDD());
		log.info("#getCEMAIL: "+fornecedor.getCEMAIL());
		log.info("#getDVALIDLIMINARCOF: "+fornecedor.getDVALIDLIMINARCOF());
		log.info("#getCLIMINARCOFINSINDETERMINADO: "+fornecedor.getCLIMINARCOFINSINDETERMINADO());
		log.info("#getDVALIDLIMINARISS: "+fornecedor.getDVALIDLIMINARISS());
		log.info("#getDVALIDLIMINARCSLL: "+fornecedor.getDVALIDLIMINARCSLL());
		log.info("#getDDATCAPS: "+fornecedor.getDDATCAPS());
		log.info("#getCINSESTAD: "+fornecedor.getCINSESTAD());
		//log.info("#getCINSMUNIC2: "+fornecedor.getCINSMUNIC2());
		log.info("#getCCOOPERATIVA: "+fornecedor.getCCOOPERATIVA());
		log.info("#getDINICIDENTEXT: "+fornecedor.getDINICIDENTEXT());
		log.info("#getCISENTOPIS: "+fornecedor.getCISENTOPIS());
		log.info("#getCJUSTIFNCADBCO: "+fornecedor.getCJUSTIFNCADBCO());
		log.info("#getCLIMINARISS: "+fornecedor.getCLIMINARISS());
		log.info("#getDDTEMIS: "+fornecedor.getDDTEMIS());
		log.info("#getDVALIDLIMINARIRFF: "+fornecedor.getDVALIDLIMINARIRFF());
		//log.info("#getCINSESTAD2: "+fornecedor.getCINSESTAD2());
		log.info("#getCIDENTEXT: "+fornecedor.getCIDENTEXT());
		log.info("#getCPAI: "+fornecedor.getCPAI());
		log.info("#getCFAX: "+fornecedor.getCFAX());
		//log.info("#getDDATCAPS2: "+fornecedor.getDDATCAPS2());
		log.info("#getCCNPJCPF: "+fornecedor.getCCNPJCPF());
		log.info("#getCLIMINARPISINDETERMINADO: "+fornecedor.getCLIMINARPISINDETERMINADO());
		log.info("#getCTIPODOC: "+fornecedor.getCTIPODOC());
		log.info("#getCATIVECO: "+fornecedor.getCATIVECO());
		log.info("#getCHOMEPAGE: "+fornecedor.getCHOMEPAGE());
		log.info("#getCOPTSIMP: "+fornecedor.getCOPTSIMP());
		log.info("#getCBANCO: "+fornecedor.getCBANCO());
		log.info("#getCCEP: "+fornecedor.getCCEP());
		log.info("#getCLIMINARINSSINDETERMINADO: "+fornecedor.getCLIMINARINSSINDETERMINADO());
		log.info("#getCCODMUNIC: "+fornecedor.getCCODMUNIC());
		
		
		log.info("#objects ok, go call method");
		var result = service.PREWS005H(hAPI.getCardValue("id_grupoempresa"),hAPI.getCardValue("id_empresafilial"),auth.user, auth.pass,fornecedor);
		//var result = customClient.PREWS005H(hAPI.getCardValue("id_grupoempresa"),hAPI.getCardValue("id_empresafilial"),auth.user, auth.pass,fornecedor);
		log.info("#=========================INTEGRACAO DE FORNECEDOR PROTHEUS RESULTS==========================");
		log.info("#webservice message: " + result);
		
		if(result.substring(0,3).trim() == "NOK"){
			throw(result);
		}
		
	} catch(error) { 
		log.error(error);
		throw error;
	}
}


function getUserProtheus(){
	var dataset = DatasetFactory.getDataset("ds_config", null, null, null);
	return {user : dataset.getValue(0, "usuario"), pass : dataset.getValue(0, "senha")}; 
}

function getJavaDate(stringDate){
	log.info("#### getJavaDate ####");
	var date = new java.util.Date();
	var retorno = "";
	if(stringDate == ""){
		log.info("#### stringDate vazio : "+stringDate);
		date.setDate("00");
		date.setMonth("00");
		date.setYear("0000");		
		retorno = date;
	}else{
		log.info("#### stringDate preenchido : "+stringDate);
		stringDate = stringDate.split("/");
		date.setDate(stringDate[0]);
		date.setMonth(Number(stringDate[1])-1);
		date.setYear(Number(stringDate[2])-1900);
		
		retorno = date;
	}
	log.info("###retorno : "+retorno);
	return retorno;
}

/**
 * Método para listar os filhos de um pai x filho
 * @param form: Referência da ficha
 * @param fields: Array dos campos que pertencem ao pai x filho
 * @returns {Array[][]} Array de String com as chaves e valores
 */
function getFilhosForm(form, fields){
	var cardData = new java.util.HashMap(); 
	
	//cardData = form.getCardData();
	
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