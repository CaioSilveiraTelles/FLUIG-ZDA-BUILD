function servicetask56(attempt, message) {
	try {
		//if(hAPI.getCardValue("text_codigo_pessoa") == ""){
			log.info("#=============================== INICIO INTEGRACAO PESSOA ================================");
			var user = getValue("WKUser");
			var cardData = hAPI.getCardData(getValue("WKNumProces"));
			var serviceFluig = ServiceManager.getService('PESSOA-FORNECEDOR');
			var serviceHelper = serviceFluig.getBean();
			var serviceLocator = serviceHelper.instantiate('br.com.previ.coi.ws.pessoa.ManterFornecedor');
			var service = serviceLocator.getFornecedorWSPort();
			var fornecedor = serviceHelper.instantiate('br.com.previ.coi.ws.pessoa.InFornecedorWS');
			var socios = serviceHelper.instantiate('br.com.previ.coi.ws.pessoa.InFornecedorWS$Socios');
			var data = new Date();
			var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	
			var properties = {};
			properties["disable.chunking"] = "true";
			properties["log.soap.messages"] = "true";	
			
			var customClient = serviceFluig.getCustomClient(service, "br.com.previ.coi.ws.pessoa.FornecedorWS", properties);			
	
			var detail = getFilhosForm(cardData, new Array("TEXT_TIPO_SOCIO"));
	
			log.info("#Quantidade de socios: " + detail.length);
	
			for(var i = 0; i < detail.length; i++){
				var index = detail[i][0].split("___")[1];
				log.info("#indice pai-filho: " + index);								
	
				//var socio = serviceHelper.instantiate('br.com.previ.coi.ws.pessoa.InBaseFornecedorSocioWS');
				var socio = serviceHelper.instantiate('br.com.previ.coi.ws.pessoa.InSocioFornecedorWS');
	
	
/*				if(hAPI.getCardValue("text_Pessoa_socio___"+index) != ""){
					socio.setCodPessoa(new java.lang.Integer(hAPI.getCardValue("text_Pessoa_socio___"+index)));
				}*/
				socio.setCodUsuIncl(getLogin(user));
								
				if(hAPI.getCardValue("text_Estado_socio___"+index) != "EX"){
					socio.setSigUf(hAPI.getCardValue("text_Estado_socio___"+index));
				}else{
					socio.setSigUf("");
				}
				
				socio.setNomEmail(hAPI.getCardValue("text_Email_socio___"+index));
	
				if(hAPI.getCardValue("text_Numero_socio___"+index) != ""){
					socio.setNumLogrd(new java.lang.Integer(hAPI.getCardValue("text_Numero_socio___"+index)));
				}
	
				socio.setNomPessoa(hAPI.getCardValue("text_NomeSocio___"+index));
				socio.setNomBairro(hAPI.getCardValue("text_Bairro_socio___"+index));
				socio.setNomLogrd(hAPI.getCardValue("text_NomeLogradouro_socio___"+index));
				socio.setNomHomePage(hAPI.getCardValue("text_PaginaInternet_socio___"+index));
				socio.setIndSexo(hAPI.getCardValue("text_sexo_socio___"+index));
				socio.setIndTipoLogrd(hAPI.getCardValue("text_TipoLogradouro_socio___"+index));
				socio.setCodTipoPessoa(hAPI.getCardValue("text_tipo_socio___"+index)  == "F" ? "PF" : "PJ");
				socio.setCodPais(hAPI.getCardValue("text_Pais_socio_code___"+index));
				socio.setNomEmailAdic2(hAPI.getCardValue("text_EmailAd2_socio___"+index));
				socio.setNomEmailAdic1(hAPI.getCardValue("text_EmailAd1_socio___"+index));
				socio.setCodMunic(hAPI.getCardValue("text_Cod_MunicipioSocio___"+index));
				socio.setNomAbrevPessoa(hAPI.getCardValue("text_Abreviado_socio___"+index));
				socio.setDscComplLogrd(hAPI.getCardValue("text_Complemento_socio___"+index));
	
				if(hAPI.getCardValue("text_TelefoneAd2_socio___"+index) != ""){
					socio.setNumTelAdic2(new java.lang.Long(hAPI.getCardValue("text_TelefoneAd2_socio___"+index)));
				}
	
				if(hAPI.getCardValue("text_TelefoneAd3_socio___"+index) != ""){
					socio.setNumTelAdic3(new java.lang.Long(hAPI.getCardValue("text_TelefoneAd3_socio___"+index)));
				}
	
				if(hAPI.getCardValue("text_TelefoneAd1_socio___"+index) != ""){
					socio.setNumTelAdic1(new java.lang.Long(hAPI.getCardValue("text_TelefoneAd1_socio___"+index)));
				}
	
				if(hAPI.getCardValue("text_Telefone_socio___"+index) != ""){
					socio.setNumTelLogrd(new java.lang.Long(hAPI.getCardValue("text_Telefone_socio___"+index)));
				}
	
				if(hAPI.getCardValue("text_TelefoneFax_socio___"+index) != ""){
					socio.setNumFaxLogrd(new java.lang.Long(hAPI.getCardValue("text_TelefoneFax_socio___"+index)));
				}
	
				if(hAPI.getCardValue("text_CEP_socio___"+index) != ""){
					socio.setNumCepLogrd(new java.lang.Integer(hAPI.getCardValue("text_CEP_socio___"+index).replace("-","")));
				}
	
				socio.setNomUsuAnalisPessoa(hAPI.getCardValue("text_user_gesad"));
				
				if(hAPI.getCardValue("text_data_analise") == ""){
					socio.setDatAnalisPessoa(null);	
				}else{
					socio.setDatAnalisPessoa(getXmlDate(hAPI.getCardValue("text_data_analise")));
				}
				
				socio.setIndStatusAtuaPessoa("A");
				//socio.setIndPatroc(hAPI.getCardValue("text_patrocinio_socio___"+index));
				socio.setIndPessoaBras(hAPI.getCardValue("text_Atuacao_brasil_soc___"+index));
				socio.setDscMotivoAnalis(hAPI.getCardValue("text_just_analise_soc___"+index));
				
				if(hAPI.getCardValue("text_CPFCNPJ_socio___"+index) != ""){
					socio.setNumCic(new java.lang.Long(hAPI.getCardValue("text_CPFCNPJ_socio___"+index).replace(".","").replace("-","").replace("/","").replace(".","")));
				}	
	
				log.info("#===================== OBJETO SOCIO NR: " + index + " ================");
				log.info("#getNumCic: "+socio.getNumCic());
				log.info("#getCodTipoPessoa: "+socio.getCodTipoPessoa());
				log.info("#getCodUsuIncl: "+socio.getCodUsuIncl());
				log.info("#getNomBairro: "+socio.getNomBairro());
				log.info("#getCodMunic: "+socio.getCodMunic());
				log.info("#getSigUf: "+socio.getSigUf());
				log.info("#getIndPessoaBras: "+socio.getIndPessoaBras());
				log.info("#getNomLogrd: "+socio.getNomLogrd());
				log.info("#getIndStatusAtuaPessoa: "+socio.getIndStatusAtuaPessoa());
				log.info("#getClass: "+socio.getClass());
				log.info("#getDatAnalisPessoa: "+socio.getDatAnalisPessoa());
				log.info("#getNumTelLogrd: "+socio.getNumTelLogrd());
				log.info("#getNumLogrd: "+socio.getNumLogrd());
				log.info("#getCodPessoa: "+socio.getCodPessoa());
				log.info("#getNumCepLogrd: "+socio.getNumCepLogrd());
				log.info("#getCodPais: "+socio.getCodPais());
				log.info("#getNomUsuAnalisPessoa: "+socio.getNomUsuAnalisPessoa());
				log.info("#getNomPessoa: "+socio.getNomPessoa());
				log.info("#getIndSexo: "+socio.getIndSexo());
				log.info("#getIndTipoLogrd: "+socio.getIndTipoLogrd());
				log.info("#getNomAbrevPessoa: "+socio.getNomAbrevPessoa());
				log.info("#getDscMotivoAnalis: "+socio.getDscMotivoAnalis());
				log.info("#getNomEmailAdic1: "+socio.getNomEmailAdic1());
				log.info("#getNomEmailAdic2: "+socio.getNomEmailAdic2());
				log.info("#getNomHomePage: "+socio.getNomHomePage());
				log.info("#getNumTelAdic2: "+socio.getNumTelAdic2());
				log.info("#getNumTelAdic3: "+socio.getNumTelAdic3());
				log.info("#getNumTelAdic1: "+socio.getNumTelAdic1());
				log.info("#getIndPatroc: "+socio.getIndPatroc());
				log.info("#getDscComplLogrd: "+socio.getDscComplLogrd());
				log.info("#getNumFaxLogrd: "+socio.getNumFaxLogrd());
				log.info("#getNomEmail: "+socio.getNomEmail());
	
				//Adiciona o sócio na lista
				socios.getSocio().add(socio);
			}
	
			log.info("#Adiciona a lista de sócios ao objeto fornecedor");
			//Adiciona a lista de sócios ao objeto fornecedor
			fornecedor.setSocios(socios);
	
	
			if(hAPI.getCardValue("cod_ativEconomica") != "" && hAPI.getCardValue("nm_tipo_fornecedor") == "J"){
				fornecedor.setCodCnae(new java.lang.Integer(hAPI.getCardValue("cod_ativEconomica")));
			}
	
			if(hAPI.getCardValue("text_Conta") != ""){
				fornecedor.setNumContaCorren(new java.lang.Long(hAPI.getCardValue("text_Conta")));
			}
	
			fornecedor.setNumInscrMunic(hAPI.getCardValue("id_ins_municipal"));
	
			if(hAPI.getCardValue("text_tipoDoc") != "" && hAPI.getCardValue("nm_tipo_fornecedor") == "F"){
				fornecedor.setIndTipoDocIdent(new java.lang.Integer(hAPI.getCardValue("text_tipoDoc")));
			}
	
			fornecedor.setNomUsuAnalisPessoa(hAPI.getCardValue("text_user_gesad"));
			fornecedor.setNumRG(hAPI.getCardValue("text_ID"));
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "J"){
				fornecedor.setIndIsentoCofins(hAPI.getCardValue("text_isencaoCOFINS"));
			}
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "J"){
				fornecedor.setIndIsentoPisPasep(hAPI.getCardValue("text_isencaoPIS"));
			}
			fornecedor.setNomPessoa(hAPI.getCardValue("text_Nome"));
			fornecedor.setDscOrgaoEmiss(hAPI.getCardValue("text_ORGEmis"));
			fornecedor.setNomPai(hAPI.getCardValue("text_Pai"));
			fornecedor.setNomLogrd(hAPI.getCardValue("text_NomeLogradouro"));
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "F"){
				fornecedor.setIndEstadoCivil(hAPI.getCardValue("text_EstadoCivil"));
			}
			
			if(hAPI.getCardValue("text_DataFinalValidade") == ""){
				fornecedor.setDatFimValid(null);
			}else{
				fornecedor.setDatFimValid(getXmlDate(hAPI.getCardValue("text_DataFinalValidade")));	
			}
			
			if(hAPI.getCardValue("text_DataInicioValidade") == ""){
				fornecedor.setDatInicValid(null);
			}else{
				fornecedor.setDatInicValid(getXmlDate(hAPI.getCardValue("text_DataInicioValidade")));
			}
			
			fornecedor.setCodDvContaCorren(hAPI.getCardValue("text_dv_conta"));
			log.info("text_DataSerasa : "+hAPI.getCardValue("text_DataSerasa"));
			if(hAPI.getCardValue("text_DataSerasa") == ""){
				fornecedor.setDatPesquisaSerasa(null);
			}else{
				fornecedor.setDatPesquisaSerasa(getXmlDate(hAPI.getCardValue("text_DataSerasa")));	
			}
			
			if(hAPI.getCardValue("text_data_analise") == ""){
				fornecedor.setDatAnalisPessoa(null);
			}else{
				fornecedor.setDatAnalisPessoa(getXmlDate(hAPI.getCardValue("text_data_analise")));
			}			
	
			if(hAPI.getCardValue("text_TelefoneFax") != ""){
				fornecedor.setNumFaxLogrd(new java.lang.Long(hAPI.getCardValue("text_TelefoneFax")));
			}
	
			if(hAPI.getCardValue("text_CEP") != ""){
				fornecedor.setNumCepLogrd(new java.lang.Integer(hAPI.getCardValue("text_CEP").replace("-","")));
			}
	
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "F"){
				fornecedor.setIndSexo(hAPI.getCardValue("text_sexo"));
				fornecedor.setCodPais(hAPI.getCardValue("cod_nacionalidade"));
			}
	
			fornecedor.setCodTipoPessoa(hAPI.getCardValue("nm_tipo_fornecedor") == "F" ? "PF" : "PJ");			
			fornecedor.setNumInscrEstadu(hAPI.getCardValue("id_insc_estadual"));
			fornecedor.setNomEmailAdic2(hAPI.getCardValue("text_EmailAd2"));
			fornecedor.setNomEmailAdic1(hAPI.getCardValue("text_EmailAd1"));
			fornecedor.setCodMunic(hAPI.getCardValue("text_Cod_Municipio"));
	
			if(hAPI.getCardValue("numAgenc") != ""){
				fornecedor.setCodAgencBncria(new java.lang.Integer(hAPI.getCardValue("numAgenc")));
			}
	
			fornecedor.setCodUsuIncl(user);
			fornecedor.setSigUf(hAPI.getCardValue("nm_estado"));
			fornecedor.setNomEmail(hAPI.getCardValue("text_Email"));
	
	
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "J"){
				fornecedor.setIndCoopTrabal(hAPI.getCardValue("Select_cooperativa"));
				fornecedor.setNumNire(hAPI.getCardValue("text_NIRE"));
				fornecedor.setIndIsentoCsll(hAPI.getCardValue("text_isencaoCSLL"));
				fornecedor.setNomFantas(hAPI.getCardValue("nm_nome_fantasia"));
				if(hAPI.getCardValue("text_CapSocial") == ""){
					fornecedor.setDatAtualzCapitlSocial(null);
				}else{
					fornecedor.setDatAtualzCapitlSocial(getXmlDate(hAPI.getCardValue("text_CapSocial")));	
				}
				
			}
	
	
			if(hAPI.getCardValue("text_Numero") != ""){
				fornecedor.setNumLogrd(new java.lang.Integer(hAPI.getCardValue("text_Numero")));
			}
	
			fornecedor.setCodIdentFiscal(hAPI.getCardValue("text_IdentificaoFiscalExterior"));
			fornecedor.setNomBairro(hAPI.getCardValue("text_Bairro"));
			fornecedor.setDscNatur(hAPI.getCardValue("text_Naturalidade"));
	
			if(hAPI.getCardValue("text_TelefoneAd2") != ""){
				fornecedor.setNumTelAdic2(new java.lang.Long(hAPI.getCardValue("text_TelefoneAd2")));
			}
	
			if(hAPI.getCardValue("text_TelefoneAd3") != ""){
				fornecedor.setNumTelAdic3(new java.lang.Long(hAPI.getCardValue("text_TelefoneAd3")));
			}
	
			if(hAPI.getCardValue("text_TelefoneAd1") != ""){
				fornecedor.setNumTelAdic1(new java.lang.Long(hAPI.getCardValue("text_TelefoneAd1")));
			}
	
			if(hAPI.getCardValue("cod_Banco") != ""){
				fornecedor.setCodBanco(new java.lang.Integer(hAPI.getCardValue("cod_Banco")));
			}
	
			if(hAPI.getCardValue("text_Telefone") != ""){
				fornecedor.setNumTelLogrd(new java.lang.Long(hAPI.getCardValue("text_Telefone").replace("(","").replace(")","").replace("-","")));
			}
	
			fornecedor.setCodPaisLogrd(hAPI.getCardValue("text_codPais"));
			fornecedor.setDscObservSerasa(hAPI.getCardValue("text_ObservaoSerasa"));
			fornecedor.setNomConjug(hAPI.getCardValue("text_Conjuge"));
	
			if(hAPI.getCardValue("text_INSS") != ""){
				fornecedor.setNumInscrInss(new java.lang.Long(hAPI.getCardValue("text_INSS")));
			}
	
			fornecedor.setNomHomePage(hAPI.getCardValue("text_PaginaInternet"));
	
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "F" && hAPI.getCardValue("text_DtNascimento") != ""){
				fornecedor.setDatNasc(getXmlDate(hAPI.getCardValue("text_DtNascimento")));
			}
	
			fornecedor.setIndTipoLogrd(hAPI.getCardValue("text_TpLogradouro"));
			fornecedor.setNomMae(hAPI.getCardValue("text_Mae"));
			fornecedor.setNomAbrevPessoa(hAPI.getCardValue("nm_nome_abreviado"));
			fornecedor.setDscComplLogrd(hAPI.getCardValue("text_Complemento"));
	
			if(hAPI.getCardValue("text_DtEmis") != "" && hAPI.getCardValue("nm_tipo_fornecedor") == "F"){
				fornecedor.setDatEmissRG(getXmlDate(hAPI.getCardValue("text_DtEmis")));
			}
	
			if(hAPI.getCardValue("text_codigo_pessoa") != "" && hAPI.getCardValue("text_codigo_pessoa") != "0"){
				fornecedor.setCodPessoa(new java.lang.Integer(hAPI.getCardValue("text_codigo_pessoa")));
			}	
	
			fornecedor.setNumCic(hAPI.getCardValue("nm_cpf_cnpj").replace(".","").replace("-","").replace("/","").replace(".",""));
			fornecedor.setIndStatusAtuaPessoa("A"); 
			fornecedor.setIndPessoaBras(hAPI.getCardValue("text_Atuacao_brasil"));
			//fornecedor.setDscMotivoAnalis(hAPI.getCardValue("text_justificativa")); 
			if(hAPI.getCardValue("nm_tipo_fornecedor") == "J"){
				fornecedor.setDscInstrmAlterCadast(hAPI.getCardValue("text_DocConstituicao"));
				
				if(hAPI.getCardValue("text_ValorCapSocial") != ""){
					fornecedor.setValCapitlSocial(new java.lang.Double(hAPI.getCardValue("text_ValorCapSocial").replace(".","").replace(".","").replace(".","").replace(",",".")));
				}				
				
			}
			fornecedor.setDscContaCorrenNaoExist(hAPI.getCardValue("text_JustDomicilio"));
			//fornecedor.setIndPatroc(hAPI.getCardValue("text_patrocinio")); 
	
	
			log.info("#================ OBJETO FORNECEDOR ========================");
			log.info("#getCodTipoPessoa: " +fornecedor.getCodTipoPessoa());
			log.info("#getCodCnae: " +fornecedor.getCodCnae());
			log.info("#getDscInstrmAlterCadast: "+fornecedor.getDscInstrmAlterCadast());
			log.info("#getCodUsuIncl: "+fornecedor.getCodUsuIncl());
			log.info("#getNomBairro: "+fornecedor.getNomBairro());
			log.info("#getDatEmissRG: "+fornecedor.getDatEmissRG());
			log.info("#getSigUf: "+fornecedor.getSigUf());
			log.info("#getValCapitlSocial: "+fornecedor.getValCapitlSocial());
			log.info("#getCodBanco: "+fornecedor.getCodBanco());
			log.info("#getIndIsentoCsll: "+fornecedor.getIndIsentoCsll());
			log.info("#getIndStatusAtuaPessoa: "+fornecedor.getIndStatusAtuaPessoa());
			log.info("#getClass: "+fornecedor.getClass());
			log.info("#getNumContaCorren: "+fornecedor.getNumContaCorren());
			log.info("#getNumTelLogrd: "+fornecedor.getNumTelLogrd());
			log.info("#getNumLogrd: "+fornecedor.getNumLogrd());
			log.info("#getNumCepLogrd: "+fornecedor.getNumCepLogrd());
			log.info("#getNumNire: "+fornecedor.getNumNire());
			log.info("#getIndCoopTrabal: "+fornecedor.getIndCoopTrabal());
			log.info("#getNumInscrMunic: "+fornecedor.getNumInscrMunic());
			log.info("#getIndTipoLogrd: "+fornecedor.getIndTipoLogrd());
			log.info("#getIndEstadoCivil: "+fornecedor.getIndEstadoCivil());
			log.info("#getCodAgencBncria: "+fornecedor.getCodAgencBncria());
			log.info("#getNumCic: "+fornecedor.getNumCic());
			log.info("#getNomAbrevPessoa: "+fornecedor.getNomAbrevPessoa());
			log.info("#getSocios: "+fornecedor.getSocios());
			log.info("#getNumTelAdic2: "+fornecedor.getNumTelAdic2());
			log.info("#getNumTelAdic3: "+fornecedor.getNumTelAdic3());
			log.info("#getNumTelAdic1: "+fornecedor.getNumTelAdic1());
			log.info("#getCodPaisLogrd: "+fornecedor.getCodPaisLogrd());
			log.info("#getIndPatroc: "+fornecedor.getIndPatroc());
			log.info("#getDatPesquisaSerasa: "+fornecedor.getDatPesquisaSerasa());
			log.info("#getDscObservSerasa: "+fornecedor.getDscObservSerasa());
			log.info("#getIndTipoDocIdent: "+fornecedor.getIndTipoDocIdent());
			log.info("#getNumInscrEstadu: "+fornecedor.getNumInscrEstadu());
			log.info("#getDscNatur: "+fornecedor.getDscNatur());
			log.info("#getCodMunic: "+fornecedor.getCodMunic());
			log.info("#getIndPessoaBras: "+fornecedor.getIndPessoaBras());
			log.info("#getNomLogrd: "+fornecedor.getNomLogrd());
			log.info("#getDatNasc: "+fornecedor.getDatNasc());
			log.info("#getDatInicValid: "+fornecedor.getDatInicValid());
			log.info("#getDatAnalisPessoa: "+fornecedor.getDatAnalisPessoa());
			log.info("#getCodPessoa: "+fornecedor.getCodPessoa());
			log.info("#getCodIdentFiscal: "+fornecedor.getCodIdentFiscal());
			log.info("#getCodPais: "+fornecedor.getCodPais());
			log.info("#getDscOrgaoEmiss: "+fornecedor.getDscOrgaoEmiss());
			log.info("#getNomUsuAnalisPessoa: "+fornecedor.getNomUsuAnalisPessoa());
			log.info("#getNomPessoa: "+fornecedor.getNomPessoa());
			log.info("#getIndIsentoPisPasep: "+fornecedor.getIndIsentoPisPasep());
			log.info("#getNomMae: "+fornecedor.getNomMae());
			log.info("#getNumInscrInss: "+fornecedor.getNumInscrInss());
			log.info("#getIndSexo: "+fornecedor.getIndSexo());
			log.info("#getNomPai: "+fornecedor.getNomPai());
			log.info("#getDatAtualzCapitlSocial: "+fornecedor.getDatAtualzCapitlSocial());
			log.info("#getDatFimValid: "+fornecedor.getDatFimValid());
			log.info("#getCodDvContaCorren: "+fornecedor.getCodDvContaCorren());
			log.info("#getNomConjug: "+fornecedor.getNomConjug());
			log.info("#getNomEmailAdic1: "+fornecedor.getNomEmailAdic1());
			log.info("#getDscMotivoAnalis: "+fornecedor.getDscMotivoAnalis());
			log.info("#getNomEmailAdic2: "+fornecedor.getNomEmailAdic2());
			log.info("#getNomHomePage: "+fornecedor.getNomHomePage());
			log.info("#getNumRG: "+fornecedor.getNumRG());
			log.info("#getNomFantas: "+fornecedor.getNomFantas());
			log.info("#getDscContaCorrenNaoExist: "+fornecedor.getDscContaCorrenNaoExist());
			log.info("#getDscComplLogrd: "+fornecedor.getDscComplLogrd());
			log.info("#getNumFaxLogrd: "+fornecedor.getNumFaxLogrd());
			log.info("#getNomEmail: "+fornecedor.getNomEmail());
			log.info("#getIndIsentoCofins: "+fornecedor.getIndIsentoCofins());
	
	
	
	
			log.info("#call method service.manterFornecedor");
	
			//var result = service.manterFornecedor(fornecedor);
			var result = customClient.manterFornecedor(fornecedor);
	
			log.info("#=========================INTEGRACAO DE FORNECEDOR PESSOA RESULTS==========================");
			log.info("#STATUS: " +result.getCodigoRetorno() + " RESULT: "+result.getDescricaoRetorno());
	
	
			if(result.getCodigoRetorno() == 1){
				throw(result.getDescricaoRetorno());
			}else{
				hAPI.setCardValue("codPessoa", result.getCodPessoa());
				hAPI.setCardValue("text_codigo_pessoa", result.getCodPessoa());
				log.info("#Código do pessoa: " + hAPI.getCardValue("text_codigo_pessoa"));
			}
/*		}else{
			log.info("#Pessoa já integrado. Código: " + hAPI.getCardValue("codPessoa"));
		}*/
	} catch(error) { 
		log.error(error);
		throw error;
	}
}

function getLogin(IdUser){
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", IdUser, IdUser, ConstraintType.MUST);
	var user = DatasetFactory.getDataset("colleague", null, new Array(c1), null);
	return user.getValue(0, "login");
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


function getXmlDate(stringDate){
	var xmlGregorian = "";
	var date = new java.util.Date();
	
	if(stringDate != ""){
		stringDate = stringDate.split("/");
		date.setDate(stringDate[0]);
		date.setMonth(Number(stringDate[1])-1);
		date.setYear(Number(stringDate[2])-1900);
	}	
	
	var calendar = new java.util.GregorianCalendar();
	calendar.setTime(date); 
	xmlGregorian = javax.xml.datatype.DatatypeFactory.newInstance().newXMLGregorianCalendar(calendar);

	
	return xmlGregorian;
}