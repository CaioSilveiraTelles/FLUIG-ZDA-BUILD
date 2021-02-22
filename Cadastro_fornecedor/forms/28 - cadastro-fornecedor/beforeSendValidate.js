var lineBreaker = "</br>";
var rules = [validateTable, validateField];
var beforeSendValidate = function(CURRENT_STATE, NEXT_STATE){
	var errorMsg = ""; 
	if(CURRENT_STATE == NEXT_STATE){
		return;
	}
	
	
	//VALIDAÇÃO CUSTOMIZADA DOS CAMPOS
	errorMsg += validateCustomField();

	var fields = requiredFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE) >= 0){
			var selector = (fields[i].name.indexOf("___") > 0) ? 
					'[name^="'+fields[i].name+'"]' 
					: '[name="'+fields[i].name+'"]';
			$(selector).each(function(){
				for(rule in rules){
					var validation = rules[rule](this, selector);
					if(validation.status != "success"){
						if(validation.status === "error"){
							errorMsg += validation.message;
						}
						break;
					}
				}
			});
		}
	}
	if(errorMsg != ""){
		throw errorMsg;
	}
}

function validateCustomField(){
	var errorMsg = "";
	var customFields = new Fields();
	
	if($('#text_Telefone').val().trim() == ""){
		errorMsg += "Deve ser informado o Telefone!"+lineBreaker;
	}		
		
	//anexos		
	if($("#portal").val() == "false"){
		
		$(":input[name^='Text_CodProdServico___']").each(function() {
			var index = this.id.split("___")[1];						
				
				if($("#Text_CodProdServico___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Produto / Serviço \n";
				}
				
				if($("#Text_CodSubItem___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Sub Item \n";
				}				
				
		});			
		
		$(":input[name^='text_NomeSocio___']").each(function() {
			var index = this.id.split("___")[1];
			
			if($("#text_tipo_socio___"+index).val() == "F"){
				
				if($("#text_sexo_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o sexo do sócio\n";
				}
				
			}
		});	
		
		$(":input[name^='text_Atuacao_brasil_soc___']").each(function() {
			var index = this.id.split("___")[1];	
			
			if($("#text_Atuacao_brasil_soc___"+index).val() == "S"){
				
				if($("#text_NomeSocio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Nome do sócio \n";
				}				
				
				if($("#text_Abreviado_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Nome Abreviado do sócio \n";
				}	
				
				if($("#text_CPFCNPJ_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o CPF/CNPJ do sócio \n";
				}					
				
				if($("#text_TipoLogradouro_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Tipo do logradouro do sócio \n";
				}
				
/*				if($("#text_NomeLogradouro_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Endereço do sócio \n";
				}*/	
				
				if($("#text_Numero_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Número do Endereço do sócio \n";
				}				
				
				if($("#text_Bairro_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Bairro do Sócio \n";
				}	
				
				if($("#text_Estado_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Estado do Sócio \n";
				}			
				
				if($("#text_Municipio_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Município do Sócio \n";
				}	
				
				if($("#text_CEP_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o CEP do Sócio \n";
				}	
				
				if($("#text_Pais_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o País do Sócio \n";
				}	
				
				if($("#text_Telefone_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o Telefone do Sócio \n";
				}				
				
				if($("#text_Email_socio___"+index).val() == ""){
					errorMsg += "É obrigatório informar o E-mail do Sócio \n";
				}					
				
			}
				
		});			
		//Atuante no Brasil		
		if($('#text_Atuacao_brasil').val() == "S" && $('#nm_tipo_solicitacao').val() == "3"){						
			
			//customFields.addField("text_capacidade_tecnica",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField("text_cpf_cnpj_file",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			if($("#nm_tipo_fornecedor").val() == "F"){
				customFields.addField("text_tipo_doc",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			//Dados Básicos
			if($("#id_ins_municipal").val() != ""){
				customFields.addField("text_inscricao_municipal",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			if($("#id_insc_estadual").val() != ""){
				customFields.addField("text_inscricao_estadual",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}	
			
			if($('#Select_tipo_cadastro').val() == "1"){
				customFields.addField("text_constituicao",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}			

			//Leandro - início - (Lógica anexo) - 24/02/2017	
		if($("#nm_tipo_solicitacao").val() == "3"){
			
			if($("#text_liminarisencaoPIS").val() == "S"){
				customFields.addField("text_liminar_pis_pased",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			
			if($("#text_liminarisencaoCOFINS").val() == "S"){
				customFields.addField("text_liminar_cofins",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}	
			
			
			if($("#text_liminarisencaoIRRF").val() == "S"){
				customFields.addField("text_irff",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			if($("#text_liminarisencaoISS").val() == "S"){
				customFields.addField("text_iss",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			if($("#text_liminarisencaoINSS").val() == "S"){
				customFields.addField("text_inss_file",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			
			if($("#text_liminarisencaoCSLL").val() == "S"){
				customFields.addField("text_liminar_csll",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
		}
		//Leandro - FIM - (Lógica anexo) - 24/02/2017
			

			if($("#Text_OptSimp").val() == "1"){
				customFields.addField("text_optante",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}			
			
			if($("#nm_tipo_fornecedor").val() == "F"){
				customFields.addField("text_endereco_file",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}				
			
		}				
		
	}

	
	if($("#text_Atuacao").val() == "D" || $("#text_Atuacao").val() == "I"){
		customFields.addField('text_justificativa', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
	}
	//fim da validação anexo inclusão
	
	
		
	// 4 = alteração
	if($('#nm_tipo_solicitacao').val() == "4"){
		customFields.addField('text_codigo_pessoa', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
	}
	
	customFields.addField('produtoTable', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
	
/*	if($('#text_Banco').val() == "" || $('#text_Agncia').val() == "" || $('#text_Conta').val() == "" ){
		customFields.addField('text_JustDomicilio', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
	}
	
	if($('#text_JustDomicilio').val() == ""){
		customFields.addField('text_Banco', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
		customFields.addField('text_Agncia', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
		customFields.addField('text_Conta', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
		customFields.addField('text_dv_conta', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
	}*/
	
	if($('#text_Banco').val() == "" && $('#text_Agncia').val() == "" && $('#text_Conta').val() == ""  && $('#text_dv_conta').val() == "" && $('#text_JustDomicilio').val() == ""){
		errorMsg += "Deve ser informada a Justificativa por Não Cadastrar Domicilio Bancário!"+lineBreaker;
	}	
	
	if($('#text_Banco').val() != "" && $('#text_Agncia').val() == ""){
		errorMsg += "Deve ser informada a Agência!"+lineBreaker;
	}	
	
	if($('#text_Banco').val() != "" && $('#text_Agncia').val() != "" && $('#text_Conta').val() == "" ){
		errorMsg += "Deve ser informada a Conta Corrente!"+lineBreaker;
	}		
	
	if($('#text_Banco').val() != "" && $('#text_Agncia').val() != "" && $('#text_Conta').val() != "" && $('#text_dv_conta').val() == ""){
		errorMsg += "Deve ser informado o Dígito Conta Corrente!"+lineBreaker;
	}		
	
	if($('#text_Banco').val() != "" && $('#text_Agncia').val() != "" && $('#text_Conta').val() != ""  && $('#text_dv_conta').val() != "" && $('#text_JustDomicilio').val() != ""){
		errorMsg += "Ao informar os dados de Banco, Agência, Conta e Dígito, não deve ser informada a Justificativa e vice e versa!"+lineBreaker;
	}	
	
	//FORNECEDOR JURÍDICO
	if($('#nm_tipo_fornecedor').val() == "J" && !$("#aprovaNaoGesad").is(':checked')){
		
		if($('#Select_cooperativa').val() == ""){
			errorMsg += "É necessário preencher o campo Cooperativa "+lineBreaker;
		}			
		
		if($('#text_Atuacao_brasil').val() == "S"){
					
			if($('#nm_cpf_cnpj').val() == ""){
				errorMsg += "CPF/CNPJ é obrigatório!"+lineBreaker;
			}			
			
			if($('#text_DataSerasa').val() == ""){
				errorMsg += "Data Serasa é obrigatório!"+lineBreaker;
			}				
			
			
			if($('#text_ObservaoSerasa').val() == ""){
				errorMsg += "Observação Serasa é obrigatório!"+lineBreaker;
			}				
			
			
			if($('#text_TpLogradouro').val() == ""){
				errorMsg += "Tipo Logradouro é obrigatório!"+lineBreaker;
			}				
			
			
			if($('#text_Numero').val() == ""){
				errorMsg += "Número é obrigatório!"+lineBreaker;
			}				
			
			if($('#text_Bairro').val() == ""){
				errorMsg += "Bairro é obrigatório!"+lineBreaker;
			}			
			
			if($('#nm_estado').val() == ""){
				errorMsg += "Estado é obrigatório!"+lineBreaker;
			}			
			
			if($('#text_Municipio').val() == ""){
				errorMsg += "Município é obrigatório!"+lineBreaker;
			}		
			
			if($('#text_CEP').val() == ""){
				errorMsg += "CEP é obrigatório!"+lineBreaker;
			}		
			
			if($('#text_DDD').val() == ""){
				errorMsg += "DDD é obrigatório!"+lineBreaker;
			}				
			
			if($('#text_isencaoPIS').val() == ""){
				errorMsg += "PIS/PASEP possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoCOFINS').val() == ""){
				errorMsg += "COFINS possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoCSLL').val() == ""){
				errorMsg += "CSLL possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoIRRF').val() == ""){
				errorMsg += "IRRF possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoISS').val() == ""){
				errorMsg += "ISS possui isenção ?"+lineBreaker;
			}		
			
			if($('#text_isencaoINSS').val() == ""){
				errorMsg += "INSS possui isenção ?"+lineBreaker;
			}				
		
			if($('#text_isencaoPIS').val() == "S"){			
				if($('#text_liminarisencaoPIS').val() == ""){
					errorMsg += "PIS/PASEP possui isenção por liminar ?"+lineBreaker;
				}
				
			}
		
			if($('#text_liminarisencaoPIS').val() == "S"){
				
				if($('#Text_venc_pis_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de PIS/PASEP é por tempo indeterminado!"+lineBreaker;
				}				
				
				if($('#Text_venc_pis_indeterminado').val() == "N"){
					if($('#text_venc_isencaoPIS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo PIS/PASEP!"+lineBreaker;
					}										
				}				
				
			}
			

			if($('#text_isencaoCOFINS').val() == "S"){
				
				if($('#text_liminarisencaoCOFINS').val() == ""){
					errorMsg += "COFINS possui isenção por liminar ?"+lineBreaker;
				}
				
			}		

			
			if($('#text_liminarisencaoCOFINS').val() == "S"){
				
				if($('#Text_venc_cofins_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de COFINS é por tempo indeterminado!"+lineBreaker;
				}				
				
				if($('#Text_venc_cofins_indeterminado').val() == "N"){
					if($('#text_venc_isencaoCOFINS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo COFINS!"+lineBreaker;
					}									
				}			
				
			}
			
	
			
			if($('#text_isencaoCSLL').val() == "S"){
				
				if($('#text_liminarisencaoCSLL').val() == ""){
					errorMsg += "CSLL possui isenção por liminar ?"+lineBreaker;
				}
				
			}		
			
			if($('#text_liminarisencaoCSLL').val() == "S"){
				
				if($('#Text_venc_csll_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de CSLL é por tempo indeterminado!"+lineBreaker;
				}				
			
				if($('#Text_venc_csll_indeterminado').val() == "N"){
					
					if($('#text_venc_isencaoCSLL').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo CSLL!"+lineBreaker;
					}					
				}				
				
			}

			
			if($('#text_isencaoIRRF').val() == "S"){
				
				if($('#text_liminarisencaoIRRF').val() == ""){
					errorMsg += "IRRF possui isenção por liminar ?"+lineBreaker;
				}
				
			}			
			
			if($('#text_liminarisencaoIRRF').val() == "S"){
				
				if($('#Text_venc_irrf_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de IRRF é por tempo indeterminado!"+lineBreaker;
				}				
			
				if($('#Text_venc_irrf_indeterminado').val() == "N"){
					if($('#text_venc_isencaoIRRF').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo IRRF!"+lineBreaker;
					}									
				}			
				
			}
			
			
			if($('#text_isencaoISS').val() == "S"){
				
				if($('#text_liminarisencaoISS').val() == ""){
					errorMsg += "ISS possui isenção por liminar ?"+lineBreaker;
				}
				
			}		
			
			if($('#text_liminarisencaoISS').val() == "S"){
				
				if($('#Text_venc_iss_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de ISS é por tempo indeterminado!"+lineBreaker;
				}			
				
				if($('#Text_venc_iss_indeterminado').val() == "N"){
					
					if($('#text_venc_isencaoISS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo ISS!"+lineBreaker;
					}				
					
				}				
				
			}		
			
			if($('#text_isencaoINSS').val() == "S"){
				
				if($('#text_liminarisencaoINSS').val() == ""){
					errorMsg += "INSS possui isenção por liminar ?"+lineBreaker;
				}
				
			}			
			
			if($('#text_liminarisencaoINSS').val() == "S"){
				
				if($('#Text_venc_inss_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de INSS é por tempo indeterminado!"+lineBreaker;
				}			
			
				if($('#Text_venc_inss_indeterminado').val() == "N"){
				
					if($('#text_venc_isencaoINSS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo INSS!"+lineBreaker;
					}
					
				}				
				
			}			
				
			//customFields.addField('text_DocConstituicao', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('text_ativEconomica', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);			
			
			if($('#id_insc_estadual').val() == "" && $('#id_ins_municipal').val() == ""){
				errorMsg += "É necessário preencher a inscrição municipal ou estadual!"+lineBreaker;
			}							
			
			if($('#Text_OptSimp').val() == ""){
				errorMsg += "É necessário preencher se Optante Simples Nacional!"+lineBreaker;
			}			
			
		}				
		
		if($('#Select_tipo_cadastro').val() == "1"){
			if($('#nm_tipo_fornecedor').val() == "J" && $('#text_Atuacao_brasil').val() == "S"){
				customFields.addField('tableSocio', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
		}		

		if($("#aprovaSimConfere").is(':checked')){		
			
			if($('#Select_cooperativa').val() == ""){
				errorMsg += "É necessário preencher o campo Cooperativa "+lineBreaker;
			}			
			
			if($('#text_isencaoPIS').val() == ""){
				errorMsg += "PIS/PASEP possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoCOFINS').val() == ""){
				errorMsg += "COFINS possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoCSLL').val() == ""){
				errorMsg += "CSLL possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoIRRF').val() == ""){
				errorMsg += "IRRF possui isenção ?"+lineBreaker;
			}
			
			if($('#text_isencaoISS').val() == ""){
				errorMsg += "ISS possui isenção ?"+lineBreaker;
			}		
			
			if($('#text_isencaoINSS').val() == ""){
				errorMsg += "INSS possui isenção ?"+lineBreaker;
			}				
			
			if($('#text_isencaoPIS').val() == "S"){			
				if($('#text_liminarisencaoPIS').val() == ""){
					errorMsg += "PIS/PASEP possui isenção por liminar ?"+lineBreaker;
				}
				
			}
		
			if($('#text_liminarisencaoPIS').val() == "S"){
				
				if($('#Text_venc_pis_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de PIS/PASEP é por tempo indeterminado!"+lineBreaker;
				}				
				
				if($('#Text_venc_pis_indeterminado').val() == "N"){
					if($('#text_venc_isencaoPIS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo PIS/PASEP!"+lineBreaker;
					}										
				}				
				
			}
			
			if($('#text_isencaoCOFINS').val() == "S"){
				
				if($('#text_liminarisencaoCOFINS').val() == ""){
					errorMsg += "COFINS possui isenção por liminar ?"+lineBreaker;
				}
				
			}		

			
			if($('#text_liminarisencaoCOFINS').val() == "S"){
				
				if($('#Text_venc_cofins_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de COFINS é por tempo indeterminado!"+lineBreaker;
				}				
				
				if($('#Text_venc_cofins_indeterminado').val() == "N"){
					if($('#text_venc_isencaoCOFINS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo COFINS!"+lineBreaker;
					}									
				}			
				
			}
			
			if($('#text_isencaoCSLL').val() == "S"){
				
				if($('#text_liminarisencaoCSLL').val() == ""){
					errorMsg += "CSLL possui isenção por liminar ?"+lineBreaker;
				}
				
			}		
			
			if($('#text_liminarisencaoCSLL').val() == "S"){
				
				if($('#Text_venc_csll_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de CSLL é por tempo indeterminado!"+lineBreaker;
				}				
			
				if($('#Text_venc_csll_indeterminado').val() == "N"){
					
					if($('#text_venc_isencaoCSLL').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo CSLL!"+lineBreaker;
					}					
				}				
				
			}
			
			if($('#text_isencaoIRRF').val() == "S"){
				
				if($('#text_liminarisencaoIRRF').val() == ""){
					errorMsg += "IRRF possui isenção por liminar ?"+lineBreaker;
				}
				
			}			
			
			if($('#text_liminarisencaoIRRF').val() == "S"){
				
				if($('#Text_venc_irrf_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de IRRF é por tempo indeterminado!"+lineBreaker;
				}				
			
				if($('#Text_venc_irrf_indeterminado').val() == "N"){
					if($('#text_venc_isencaoIRRF').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo IRRF!"+lineBreaker;
					}									
				}			
				
			}
			
			if($('#text_isencaoISS').val() == "S"){
				
				if($('#text_liminarisencaoISS').val() == ""){
					errorMsg += "ISS possui isenção por liminar ?"+lineBreaker;
				}
				
			}		
			
			if($('#text_liminarisencaoISS').val() == "S"){
				
				if($('#Text_venc_iss_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de ISS é por tempo indeterminado!"+lineBreaker;
				}			
				
				if($('#Text_venc_iss_indeterminado').val() == "N"){
					
					if($('#text_venc_isencaoISS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo ISS!"+lineBreaker;
					}				
					
				}				
				
			}		
			
			if($('#text_isencaoINSS').val() == "S"){
				
				if($('#text_liminarisencaoINSS').val() == ""){
					errorMsg += "INSS possui isenção por liminar ?"+lineBreaker;
				}
				
			}			
			
			if($('#text_liminarisencaoINSS').val() == "S"){
				
				if($('#Text_venc_inss_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de INSS é por tempo indeterminado!"+lineBreaker;
				}			
			
				if($('#Text_venc_inss_indeterminado').val() == "N"){
				
					if($('#text_venc_isencaoINSS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo INSS!"+lineBreaker;
					}
					
				}				
				
			}			
			
		}
		
	
		// CADASTRO COMPLETO
		if($('#Select_tipo_cadastro').val() == "1"){
			if($('#text_Atuacao_brasil').val() == "S"){
				
				if($('#text_NIRE').val() == ""){
					
					errorMsg += "É necessário preencher o campo NIRE! "+ lineBreaker;
					
				}					
				
				if($('#text_CapSocial').val() == ""){
					
					errorMsg += "É necessário preencher o campo Data Capital Social! "+ lineBreaker;
					
				}			
				
				if($('#text_ValorCapSocial').val() == ""){
					
					errorMsg += "É necessário preencher o campo Valor Capital Social! "+ lineBreaker;
					
				}								
				
			}

		}
							
		//Não atuante no Brasil
		if($('#text_Atuacao_brasil').val() == "N"){
			
			customFields.addField('#text_Numero', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);				
			customFields.addField('#text_NomeLogradouro', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);				

			
			if($('#text_isencaoPIS').val() == ""){
				
				errorMsg += "PIS/PASEP possui isenção ?"+lineBreaker;
				
			}	
			
			if($('#text_isencaoPIS').val() == "S"){			
				if($('#text_liminarisencaoPIS').val() == ""){
					errorMsg += "PIS/PASEP possui isenção por liminar ?"+lineBreaker;
				}
				
			}
			
						
			
		
			if($('#text_liminarisencaoPIS').val() == "S"){
				
				if($('#Text_venc_pis_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de PIS/PASEP é por tempo indeterminado!"+lineBreaker;
				}				
				
				if($('#Text_venc_pis_indeterminado').val() == "N"){
					if($('#text_venc_isencaoPIS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo PIS/PASEP!"+lineBreaker;
					}										
				}
				
				
				if($('#text_liminarisencaoPIS').val() == ""){
					
					errorMsg += "PIS possui isenção ?"+lineBreaker;
					
				}			
				
			}

				
				if($('#text_isencaoCOFINS').val() == ""){
					
					errorMsg += "COFINS possui isenção ?"+lineBreaker;
					
				}	
				
				if($('#text_isencaoCOFINS').val() == "S"){			
					if($('#text_liminarisencaoCOFINS').val() == ""){
						errorMsg += "COFINS possui isenção por liminar ?"+lineBreaker;
					}
					
				}
			
				if($('#text_liminarisencaoCOFINS').val() == "S"){
					
					if($('#Text_venc_cofins_indeterminado').val() == ""){
						errorMsg += "É necessário preencher se a liminar de COFINS é por tempo indeterminado!"+lineBreaker;
					}				
					
					if($('#Text_venc_cofins_indeterminado').val() == "N"){
						if($('#text_venc_isencaoCOFINS').val() == ""){
							errorMsg += "É necessário preencher a data de vencimento do tributo COFINS!"+lineBreaker;
						}										
					}
					
					
					if($('#text_isencaoCOFINS').val() == ""){
						
						errorMsg += "COFINS possui isenção ?"+lineBreaker;
						
					}
					
				}


				
				if($('#text_isencaoIRRF').val() == ""){
					
					errorMsg += "IRRF possui isenção ?"+lineBreaker;
					
				}	
				
				if($('#text_isencaoIRRF').val() == "S"){			
					if($('#text_liminarisencaoIRRF').val() == ""){
						errorMsg += "IRRF possui isenção por liminar ?"+lineBreaker;
					}
					
				}
			
				if($('#text_liminarisencaoIRRF').val() == "S"){
					
					if($('#Text_venc_irrf_indeterminado').val() == ""){
						errorMsg += "É necessário preencher se a liminar de IRRF é por tempo indeterminado!"+lineBreaker;
					}				
					
					if($('#Text_venc_irrf_indeterminado').val() == "N"){
						if($('#text_venc_isencaoIRRF').val() == ""){
							errorMsg += "É necessário preencher a data de vencimento do tributo IRRF!"+lineBreaker;
						}										
					}
					
					
					if($('#text_isencaoIRRF').val() == ""){
						
						errorMsg += "IRRF possui isenção ?"+lineBreaker;
						
					}
					
				}	
				
				
				if($('#text_isencaoISS').val() == ""){
					
					errorMsg += "ISS possui isenção ?"+lineBreaker;
					
				}	
				
				if($('#text_isencaoISS').val() == "S"){			
					if($('#text_liminarisencaoISS').val() == ""){
						errorMsg += "ISS possui isenção por liminar ?"+lineBreaker;
					}
					
				}
			
				if($('#text_liminarisencaoISS').val() == "S"){
					
					if($('#Text_venc_cofins_indeterminado').val() == ""){
						errorMsg += "É necessário preencher se a liminar de ISS é por tempo indeterminado!"+lineBreaker;
					}				
					
					if($('#Text_venc_iss_indeterminado').val() == "N"){
						if($('#text_venc_isencaoISS').val() == ""){
							errorMsg += "É necessário preencher a data de vencimento do tributo ISS!"+lineBreaker;
						}										
					}
					
					
					if($('#text_isencaoISS').val() == ""){
						
						errorMsg += "ISS possui isenção ?"+lineBreaker;
						
					}
					
				}	

				
				//validação PJ, atuante no Brasil
				if($('#text_isencaoINSS').val() == "S"){			
					if($('#text_liminarisencaoINSS').val() == ""){
						errorMsg += "INSS possui isenção por liminar ?"+lineBreaker;
					}
					
				}
			
				if($('#text_liminarisencaoINSS').val() == "S"){
					
					if($('#Text_venc_inss_indeterminado').val() == ""){
						errorMsg += "É necessário preencher se a liminar de INSS é por tempo indeterminado!"+lineBreaker;
					}				
					
					if($('#Text_venc_inss_indeterminado').val() == "N"){
						if($('#text_venc_isencaoINSS').val() == ""){
							errorMsg += "É necessário preencher a data de vencimento do tributo INSS!"+lineBreaker;
						}										
					}				
					
				}
				
				
				if($('#text_isencaoCSLL').val() == "S"){			
					if($('#text_liminarisencaoCSLL').val() == ""){
						errorMsg += "CSLL possui isenção por liminar ?"+lineBreaker;
					}
					
				}
			
				if($('#text_liminarisencaoCSLL').val() == "S"){
					
					if($('#Text_venc_csll_indeterminado').val() == ""){
						errorMsg += "É necessário preencher se a liminar de CSLL é por tempo indeterminado!"+lineBreaker;
					}				
					
					if($('#Text_venc_csll_indeterminado').val() == "N"){
						if($('#text_venc_isencaoCSLL').val() == ""){
							errorMsg += "É necessário preencher a data de vencimento do tributo CSLL!"+lineBreaker;
						}										
					}				
					
				}
				//Leandro - início - (Lógica anexo) - 24/02/2017
				if($("#nm_tipo_solicitacao").val() == "3"){
					
					//Tratamento Jurídico, Não atuante!
					if($("#text_liminarisencaoPIS").val() == "S"){
						customFields.addField("text_liminar_pis_pased",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
					}
					
					if($("#text_liminarisencaoCOFINS").val() == "S"){
						customFields.addField("text_liminar_cofins",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
					}
					
					if($("#text_liminarisencaoIRRF").val() == "S"){
						customFields.addField("text_irff",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
					}
					
					if($("#text_liminarisencaoISS").val() == "S"){
						customFields.addField("text_iss",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
					}
					
				}	
				//Leandro - FIM - (Lógica anexo) - 24/02/2017
		
/*			if($('#text_IdentificaoFiscalExterior').val() == "" && $('#nm_cpf_cnpj').val() == ""){
				
				errorMsg += "É necessário preencher o campo CPF/CNPJ ou o campo Identificação Fiscal no Exterior! "+ lineBreaker;
				
			}*/					
			
			if($('#text_IdentificaoFiscalExterior').val().trim() != "" && $('#nm_cpf_cnpj').val() != ""){
				
				errorMsg += "Somente o campo CPF/CNPJ ou o campo Identificação Fiscal no Exterior podem estar preenchidos! "+ lineBreaker;
				
			}				
			
			if($('#text_IdentificaoFiscalExterior').val().trim() == ""){
				
				if($('#text_DataInicioValidade').val() != "" || $('#text_DataFinalValidade').val() != ""){
					
					errorMsg += "Os campos de Data início e Fim validade somente devem ser preenchidos caso o campo Identificação Fiscal Exterior esteja preenchido! "+ lineBreaker;
					
				}
				
			}
			
			if($('#text_IdentificaoFiscalExterior').val().trim() != ""){
				
				
				if($('#text_DataInicioValidade').val() == ""){
					errorMsg += "É necessário preencher a Data início validade Identificação Fiscal Exterior! "+ lineBreaker;
				}
								
			}
			
			if($('#text_DataFinalValidade').val() != ""){			
				
				if(validaDataIdentFiscalExt()){
					errorMsg += "A Data fim validade Identificação Fiscal Exterior não pode ser menor qua a Data início! "+ lineBreaker;
				}
								
			}			
			
		}
		
		
	}else if($('#nm_tipo_fornecedor').val() == "F"){
			
		if($('#text_sexo').val() == ""){
			errorMsg += "Sexo é obrigatório!"+lineBreaker;
		}				
		
		if($('#text_NomeLogradouro').val() == ""){
			errorMsg += "Nome do Logradouro é obrigatório!"+lineBreaker;
		}		
		
		if($('#text_Atuacao_brasil').val() == "N"){	
			//Pessoa Física, Não Atuante no Brasil	
			
		//Leandro - Início - (Lógica anexo) 24/02/2017	
		if($("#nm_tipo_solicitacao").val() == "3"){			
			if($("#text_liminarisencaoIRRF").val() == "S"){
				customFields.addField("text_irff",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
		}
		//Leandro - FIM - (Lógica anexo) 24/02/2017	
			if($('#text_isencaoIRRF').val() == "S"){
				
				if($('#text_liminarisencaoIRRF').val() == ""){
					errorMsg += "IRRF possui isenção por liminar ?"+lineBreaker;
				}
				
			}			
			
			if($('#text_liminarisencaoIRRF').val() == "S"){
				
				if($('#Text_venc_irrf_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de IRRF é por tempo indeterminado!"+lineBreaker;
				}			
			
				if($('#Text_venc_irrf_indeterminado').val() == "N"){
				
					if($('#text_venc_isencaoIRRF').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo IRRF!"+lineBreaker;
					}
					
				}				
				
			}
			
			if($('#text_isencaoIRRF').val() == ""){
				
				errorMsg += "IRRF possui isenção ?"+lineBreaker;
				
			}				
			
	
/*			if($('#text_IdentificaoFiscalExterior').val() == "" && $('#nm_cpf_cnpj').val() == ""){
				
				errorMsg += "É necessário preencher o campo CPF/CNPJ ou o campo Identificação Fiscal no Exterior! "+ lineBreaker;
				
			}*/
			
			if($('#text_IdentificaoFiscalExterior').val() != "" && $('#nm_cpf_cnpj').val() != ""){
				
				errorMsg += "Somente o campo CPF/CNPJ ou o campo Identificação Fiscal no Exterior podem estar preenchidos! "+ lineBreaker;
				
			}
			
			//Tratamento PF, não atuante
			
			if($('#text_liminarisencaoIRRF').val() == "S"){
				
				if($('#Text_venc_irrf_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de IRRF é por tempo indeterminado!"+lineBreaker;
				}			
				
				if($('#Text_venc_irrf_indeterminado').val() == "N"){
					
					if($('#text_venc_isencaoIRRF').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo IRRF!"+lineBreaker;
					}				
					
				}				
				
			}						
			
			//Validação anexos
			//Marcelo Miguel
		    
			//Leandro - Início - (Lógica anexo) 24/02/2017
		if($("#nm_tipo_solicitacao").val() == "3"){
			if($("#text_liminarisencaoPIS").val() == "S"){
				customFields.addField("text_liminar_pis_pased",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
		
			if($("#text_liminarisencaoIRRF").val() == "S"){
				customFields.addField("text_liminar_irrf",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
			
			if($("#text_liminarisencaoISS").val() == "S"){
				customFields.addField("text_liminar_iss",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			}
		
			if($('#text_IdentificaoFiscalExterior').val() == ""){
				
				if($('#text_DataInicioValidade').val() != "" || $('#text_DataFinalValidade').val() != ""){
					
					errorMsg += "Os campos de Data início e Fim validade somente devem ser preenchidos caso o campo Identificação Fiscal Exterior esteja preenchido! "+ lineBreaker;
					
				}
				
			}	
		}
		//Leandro - Fim - (Lógica anexo) 24/02/2017
			
			if($('#text_IdentificaoFiscalExterior').val() != ""){
				if($('#text_DataInicioValidade').val() == ""){
					errorMsg += "É necessário preencher a Data início validade Identificação Fiscal Exterior! "+ lineBreaker;
				}
								
			}	
			
			if($('#text_DataFinalValidade').val() != ""){			
				
				if(validaDataIdentFiscalExt()){
					errorMsg += "A Data fim validade Identificação Fiscal Exterior não pode ser menor qua a Data início! "+ lineBreaker;
				}
								
			}										
			
		}else{
			
			if($('#text_CEP').val() == ""){
				errorMsg += "CEP é obrigatório!"+lineBreaker;
			}		
			
			if($('#text_DDD').val() == ""){
				errorMsg += "DDD é obrigatório!"+lineBreaker;
			}			
			
			if($('#text_DataSerasa').val() == ""){
				errorMsg += "Data Serasa é obrigatório!"+lineBreaker;
			}							1
			
			if($('#text_ObservaoSerasa').val() == ""){
				errorMsg += "Observação Serasa é obrigatório!"+lineBreaker;
			}									
			
			if($('#text_isencaoIRRF').val() == ""){
				errorMsg += "IRRF possui isenção ?"+lineBreaker;
			}
						
			
			if($('#text_Atuacao_brasil').val() == "S"){
				
			//Leandro - início - (Lógica anexo) - 24/02/2017	
			if($("#nm_tipo_solicitacao").val() == "3"){
				if($("#text_liminarisencaoPIS").val() == "S"){
				customFields.addField("text_liminar_pis_pased",[0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
				//errorMsg += "É obrigatório informar a Liminar do PIS \n";
				}
			}
			//Leandro - Fim - (Lógica anexo) - 24/02/2017
				if($('#text_isencaoISS').val() == ""){
					errorMsg += "ISS possui isenção ?"+lineBreaker;
				}		
				
				if($('#text_isencaoINSS').val() == ""){
					errorMsg += "INSS possui isenção ?"+lineBreaker;
				}					
				
			}					
			
			if($('#text_isencaoINSS').val() == "S"){
				
				if($('#text_liminarisencaoINSS').val() == ""){
					errorMsg += "INSS possui isenção por liminar ?"+lineBreaker;
				}
				
			}			
			
			if($('#text_liminarisencaoINSS').val() == "S"){
				
				if($('#Text_venc_inss_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de INSS é por tempo indeterminado!"+lineBreaker;
				}			
			
				if($('#Text_venc_inss_indeterminado').val() == "N"){
				
					if($('#text_venc_isencaoINSS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo INSS!"+lineBreaker;
					}
					
				}				
				
			}
			
			if($('#text_isencaoIRRF').val() == "S"){
				if($('#text_liminarisencaoIRRF').val() == ""){
					errorMsg += "IRRF possui isenção por liminar ?"+lineBreaker;
				}
				
			}			

			if($('#text_liminarisencaoIRRF').val() == "S"){
				
				if($('#Text_venc_irrf_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de IRRF é por tempo indeterminado!"+lineBreaker;
				}				
			
				if($('#Text_venc_irrf_indeterminado').val() == "N"){
					if($('#text_venc_isencaoIRRF').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo IRRF!"+lineBreaker;
					}									
				}			
	
		
			}	
			
			
			if($('#text_isencaoISS').val() == "S"){
				if($('#text_liminarisencaoISS').val() == ""){
					errorMsg += "ISS possui isenção por liminar ?"+lineBreaker;
				}
				
			}			

			if($('#text_liminarisencaoISS').val() == "S"){
				
				if($('#Text_venc_iss_indeterminado').val() == ""){
					errorMsg += "É necessário preencher se a liminar de ISS é por tempo indeterminado!"+lineBreaker;
				}				
			
				if($('#Text_venc_iss_indeterminado').val() == "N"){
					if($('#text_venc_isencaoISS').val() == ""){
						errorMsg += "É necessário preencher a data de vencimento do tributo ISS!"+lineBreaker;
					}									
				}			
	
		
			}		
			
			customFields.addField('#text_TpLogradouro', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_Numero', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_Municipio', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
						
			customFields.addField('#nm_cpf_cnpj', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			//customFields.addField('#text_Mae', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			
			//customFields.addField('#text_Pai', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			//customFields.addField('#text_DataSerasa', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_INSS', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			
			customFields.addField('#nm_estado', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_Bairro', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			
			customFields.addField('#text_DtNascimento', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			//customFields.addField('#text_ObservaoSerasa', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_ID', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_ORGEmis', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			
			customFields.addField('#text_DtEmis', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);
			customFields.addField('#text_DtNascimento', [0,INICIO,GESAD_CONFERIR_PRECADASTRO]);					
			
			if($('#text_IdentificaoFiscalExterior').val() != ""){

				errorMsg += "É necessário preencher a Data início validade Identificação Fiscal Exterior! "+ lineBreaker;

			}				
		}			
		
	}

	
	if(CURRENT_STATE == GESAD_CONFERIR_PRECADASTRO){
		if(!$("[name='aprovaGsad']").is(':checked')){
			errorMsg += "É necessário preencher a aprovação da solicitação! "+ lineBreaker;
		}
	}
	
	if(CURRENT_STATE == NOTIFICAR_GECON_PARA_COMPLEMENTO_DE_CADASTRO){
		if(!$("[name='aprovaConfere']").is(':checked')){
			errorMsg += "É necessário preencher a aprovação da solicitação! "+ lineBreaker;
		}
	}
	
	if(CURRENT_STATE == APROVACAO_GECON){
		if(!$("[name='aprovaGecond']").is(':checked')){
			errorMsg += "É necessário preencher a aprovação da solicitação! "+ lineBreaker;
		}
	}

	var fields = customFields.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].activities.indexOf(CURRENT_STATE) >= 0){
			var selector = (fields[i].name.indexOf("___") > 0) ? 
					'[name^="'+fields[i].name+'"]' 
					: '[name="'+fields[i].name+'"]';
			$(selector).each(function(){
				for(rule in rules){
					var validation = rules[rule](this, selector);
					if(validation.status != "success"){
						if(validation.status === "error"){
							errorMsg += validation.message;
						}
						break;
					}
				}
			});
		}
	}
	//console.log("return error message custom: " + errorMsg);
	
	return errorMsg;
}

/**
 * Regra de negócio: Valida se pai x filho tem ao menos um registros.
 * @param el: Elemento sendo avaliado.
 * @returns validation Validation.
 */
function validateTable(el){
	var validation = new Validation();
	if($(el).prop("tagName") === "TABLE" ){
		validation.status = "ignore";
		if($(el).find("tr").size() <= 2){
			validation.message = "Insira ao menos um : "
				+getLabel($(el).attr("name"))+lineBreaker;
			validation.status = "error";
		}
	}
	return validation;
}

/**
 * Regra de negócio: Valida campos, sejam radio, check, inputs mesmo que em pai x filho.
 * @param el: Elemento sendo avaliado.
 * @param selector: Seletor usado para pegar o elemento.
 * @returns validation Validation.
 */
function validateField(el, selector){
	var validation = new Validation();
	if((
			["radio","checkbox"].indexOf($(el).attr("type")) >= 0
			&& $(selector+':checked').size() <= 0
		) 
		|| (el.value == "" && el.tagName != "SPAN")){ 
		validation.message = "Campo "+getLabel($(el).attr("name"))+" é obrigatório!"+lineBreaker;
		validation.status = "error";
	}
	return validation;
}

/**
 * Classe validação.
 * @attribute status: success, ignore ou error.
 * @attribute messagem: Messagem de erro.
 */
function Validation(){
	this.status = "success";
	this.message = "";
}

var requiredFields = new Fields();
/**
 * Classe campos.
 * @attribute fields: success, ignore ou error.
 * @method addField: Adiciona objetos compostos por String name e Array activities.
 * @method getFields: Recupera campos.
 */
function Fields(){
	this.fields = [];
	this.addField = function(name, arrayActivities){
		this.fields.push({"name":name,"activities":arrayActivities});
	}
	this.getFields = function(){
		return this.fields;
	}
}

/**
 * Inclui o * indicativo de campo obrigatório nos labels a partir do nome do campo.
 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
 * @param isRequired: é obrigatório? booleano.
 * @returns void.
 */
function setRequired(name, isRequired){
	name = name.split("___")[0];
	(isRequired) ? $("[for='"+name+"']").addClass('required')
		: $("[for='"+name+"']").removeClass('required');
}

/**
 * Retorna label baseado no name do campo, verificando atributo "for" da label.
 * @param name: name do campo.
 * @returns label: texto do label.
 */
function getLabel(name) {
	name = name.split("___")[0];
	return $("[for='"+name+"']").html();
}