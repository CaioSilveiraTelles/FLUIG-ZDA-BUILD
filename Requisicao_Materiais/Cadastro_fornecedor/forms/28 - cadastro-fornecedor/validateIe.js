/**
 * Valida se o numero da inscricao estadual e valido.
 * 
 * @author http://mtfsantos.blogspot.com.br/2011/09/verificando-inscricao-estadual-em.html.
 * @param theField: Objeto html (nao JQuery) do campo que contem a IE.
 * @param estado: sigla do estado.
 * @returns bollean.
 */
function validateIe(inscEst, estado) {
	var primDigito=0;
	var seguDigito=0;
	var pesos = 0;
	var soma = 0;
	
    inscEst = normalizeIe(inscEst, estado);
    
    if(inscEst.replace('0','') == '') return false;
    
    if (inscEst!="") {
        if (estado=="AC") {
            pesos="43298765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            
            pesos="543298765432";
            soma=customSum(pesos, inscEst, 0);
            seguDigito=11-(soma%11);
            
            if (seguDigito>9) seguDigito=0;
                
            if ((parseInt(inscEst.substr(11,1))!=primDigito) || (parseInt(inscEst.substr(12,1))!=seguDigito)) return false;
            else return true;
        }
        else if (estado=="AL") {            
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            soma=soma*10;
            primDigito=soma%11;
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="AP") {
            var p = 0;
            var d = 0;
            
        	if(inscEst.substr(0,2) != "03") return false;
            
            if (parseFloat(inscEst.substr(0,8))<3017000) {
            	p=5;
                d=0;
            }
            else if (parseFloat(inscEst.substr(0,8))<3019022) {
                p=9;
                d=1;
            }
             
            pesos="98765432";
            soma=customSum(pesos, inscEst, p);
            primDigito=11-(soma%11);
            
            if (primDigito==10) primDigito=0;
            else if (primDigito==11) primDigito=d;
                
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="AM") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            
            if (soma<11) primDigito=11-soma;
            else {
                primDigito=soma%11;
                
                if(primDigito<2) primDigito=0;
                else primDigito=11-primDigito;
            }
            
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="BA") {
            if ((parseInt(inscEst.substr(0,1))<6) || (parseInt(inscEst.substr(0,1))==8)) modulo=10;
            else modulo=11;
            
            pesos="765432";
            soma=customSum(pesos, inscEst, 0);
            seguDigito=modulo-(soma%modulo);
            
            if (seguDigito>9) seguDigito=0;
            
            inscEst=inscEst.substr(0,6) + "" + inscEst.substr(7,1) + "" + inscEst.substr(6,1);
            pesos="8765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=modulo-(soma%modulo);
            
            if (primDigito>9) primDigito=0;
            
            inscEst=inscEst.substr(0,6) + "" + inscEst.substr(7,1) + "" + inscEst.substr(6,1);
            
            if ((parseInt(inscEst.substr(6,1))!=primDigito) || (parseInt(inscEst.substr(7,1))!=seguDigito)) return false;
            else return true;
        }
        else if (estado=="CE") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="DF") {
            if (inscEst.substr(0,2) != "07") return false;

            pesos="43298765432";
            soma=0;
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            
            pesos="543298765432";
            soma=customSum(pesos, inscEst, 0);
            seguDigito=11-(soma%11);
            
            if (seguDigito>9) seguDigito=0;
            
            if ((parseInt(inscEst.substr(11,1))!=primDigito) || (parseInt(inscEst.substr(12,1))!=seguDigito)) return false;
            else return true;

        }
        else if (estado=="ES") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="GO") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (inscEst.substr(0,8)=="11094402") {
                if ((parseInt(inscEst.substr(8,1))!="0") && (parseInt(inscEst.substr(8,1))!="1")) return false;
            }
            else {
                if (primDigito==11) primDigito=0;
                else if (primDigito==10) {
                    if ((parseFloat(inscEst.substr(0,8))>=10103105) && (parseFloat(inscEst.substr(0,8))<=10119997)) primDigito=1;
                    else primDigito=0;
                }
                if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
                else return true;
            }
        }
        else if (estado=="MA") {            
            if (inscEst.substr(0,2) != "12") return false;
            
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;            
        }
        else if (estado=="MT") {
            pesos="3298765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(10,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="MS") {            
            if (inscEst.substr(0,2) != "28") return false;

            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="MG") {            
            var resultado=0;
            var somaAux = 0;
            
        	inscEst=inscEst.substr(0,3)+"0"+inscEst.substr(3);
            pesos="121212121212";
            
            for(i=0;i<pesos.length;i++) {
                resultado=parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1));
                resultado=resultado+"";
                for(j=0;j<resultado.length;j++) {
                    soma=soma+(parseInt(resultado.substr(j,1)));
                }
            }
            
            somaAux=soma+"";
            primDigito=parseInt((parseInt(somaAux.substr(0,1))+1)+"0")-soma;
            
            if (primDigito>9) primDigito=0;
            
            inscEst=inscEst.substr(0,3)+inscEst.substr(4);
            pesos="321098765432";
            soma=0;
            
            for(i=0;i<pesos.length;i++) {
                mult=parseInt(pesos.substr(i,1));
                if ((i>1) && (i<4)) mult=parseInt(pesos.substr(i,1))+10;
                
                soma=soma+(parseInt(inscEst.substr(i,1))*mult);
            }
            
            seguDigito=11-(soma%11);
            
            if (seguDigito>9) seguDigito=0;
                
            if ((parseInt(inscEst.substr(11,1))!=primDigito) || (parseInt(inscEst.substr(12,1))!=seguDigito)) return false;
            else return true;
        }
        else if (estado=="PA") {            
            if (inscEst.substr(0,2) != "15") return false;

            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;

        }
        else if (estado=="PB") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="PR") {
            pesos="32765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            
            pesos="432765432";
            soma=customSum(pesos, inscEst, 0);
            seguDigito=11-(soma%11);
            
            if (seguDigito>9) seguDigito=0;
                
            if ((parseInt(inscEst.substr(8,1))!=primDigito) || (parseInt(inscEst.substr(9,1))!=seguDigito)) return false;
            else return true;
        }
        else if (estado=="PE") {
            pesos="5432198765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=primDigito-10;
            
            if (parseInt(inscEst.substr(13,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="PI") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="RJ") {
            pesos="2765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(7,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="RN") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            soma=soma*10;
            primDigito=soma%11;
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="RS") {
            pesos="298765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito=0;
            if (parseInt(inscEst.substr(9,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="RO") {
            pesos="6543298765432";
            soma=customSum(pesos, inscEst, 0);
            primDigito=11-(soma%11);
            
            if (primDigito>9) primDigito-=10;
            
            if (parseInt(inscEst.substr(13,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="RR") {
            pesos="12345678";
            soma=customSum(pesos, inscEst, 0);
            soma=soma*10;
            primDigito=soma%9;
            
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="SC") {
            pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            soma=soma*10;
            primDigito=soma%11;
            
            if (primDigito>9) primDigito=0;
            
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        }
        else if (estado=="SP") {
            pesos="13456780";
            
            for(i=0;i<pesos.length;i++) {
                mult=parseInt(pesos.substr(i,1));
                if (i==7) mult=10;
                soma=soma+(parseInt(inscEst.substr(i,1))*mult);
            }
            
            primDigito=soma%11;
            
            if (primDigito>9) primDigito=0;
            
            pesos="32098765432";
            soma=0;
            
            for(i=0;i<pesos.length;i++) {
                mult=parseInt(pesos.substr(i,1));
                if (i==2) mult=10;
                soma=soma+(parseInt(inscEst.substr(i,1))*mult);
            }
            
            seguDigito=soma%11;
            
            if (seguDigito>9) seguDigito=0;
                
            if ((parseInt(inscEst.substr(8,1))!=primDigito) || (parseInt(inscEst.substr(11,1))!=seguDigito)) return false;
            else return true;
        }
        else if (estado=="SE") {
        	pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            soma=soma*10;
            primDigito=soma%11;
            
            if (primDigito>9) primDigito=0;
            
            if (parseInt(inscEst.substr(8,1))!=primDigito) return false;
            else return true;
        } 
        else if (estado=="TO") {
        	pesos="98765432";
            soma=customSum(pesos, inscEst, 0);
            seguDigito=soma%11;
            
            if(seguDigito<2) seguDigito=0;
            else seguDigito=11-seguDigito;
            
            if((parseInt(inscEst.substr(8,1))!=seguDigito)) return false;
            else return true;
        }
    }
}

function normalizeIe(ie, state){
	var dig8 = 'BA,RJ';
    var dig9 = 'AL,AP,AM,CE,ES,GO,MA,MS,PA,PB,PI,RN,RR,SC,SE,TO';
    var dig10 ='PR,RS';
    var dig11 ='MT';
    var dig12 ='SP';
    var dig13 ='AC,MG,DF';
    var dig14 ='PE,RO';
    var size = 0
 
    ie = ie.replace(/[^\d]+/g,'');
    
    if (dig8.indexOf(state) >= 0) size = 8;
    else if (dig9.indexOf(state) >= 0) size = 9;
    else if (dig10.indexOf(state) >= 0) size = 10;
    else if (dig11.indexOf(state) >= 0) size = 11;
    else if (dig12.indexOf(state) >= 0) size = 12;
    else if (dig13.indexOf(state) >= 0) size = 13;
    else if (dig14.indexOf(state) >= 0) size = 14;
    else return '';
    
    ie = ie.substr(0, size);
    while(ie.length < size) ie = '0'+ie;
    
    return ie;
    
}

function customSum(weight, ie, start){
	var sum = start;
	
	for(i=0; i<weight.length; i++) {
		sum=sum+(parseInt(ie.substr(i,1))*parseInt(weight.substr(i,1)));
	}
	
	return sum;
}