function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
    var dataset = DatasetBuilder.newDataset();
    
    dataset.addColumn('Retorno_post');

    var clientService = fluigAPI.getAuthorizeClientService();
    
    var data = {
            companyId: 1 + '',
            serviceCode: 'API_PRODUTO',
            endpoint: '/rest/PRODUTOS_SB1',
            method: 'delete',
            timeoutService: '100',
            params: {
                Cod: '000028',
                Descr: 'BORRACHA BRANCA',
                TIPO: 'PA'
            },

    }
    
    var vo = clientService.invoke(JSON.stringify(data));

    if (vo.getResult() == null || vo.getResult().isEmpty()) {
        dataset.addRow(new Array("Retorno esta vazio"))
    } else {
        dataset.addRow(new Array(vo.getResult()))
    }

    
	return dataset; 
	
	
	

}function onMobileSync(user) {

}