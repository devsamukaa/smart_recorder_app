export default class HomeModel {

    constructor() {
       
    }
    
    //Buscando informações no FourSquare
    cadastrarMedicao(payload, callback){

        console.log(payload);

        //Monta URL
        const stringURL = 'https://smartrecorder-api.herokuapp.com/medicao_fase';

        //Realiza a conexão URL
        fetch(stringURL, {
            method: 'POST',
            //Passando os headers da conexão
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            body: JSON.stringify(payload)
        })
        .then((response) => {

            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then(([status, payload]) => {
            //Trata a resposta em Json
            callback(status, payload);
        }).catch(function(error) {
            //Trata o erro
            console.log(error);
            callback(0, {});			
        });
    }

    calculaConsumo(payload, callback) {
        console.log("calculaConsumoModel", payload);
        //Monta URL
        const stringURL = 'https://smartrecorder-api.herokuapp.com/calculo_consumo/mensal?'
                            + 'mes=' + payload.mes
                            + '&ano=' + payload.ano
                            + '&cdInstalacao=' + payload.cdInstalacao.toString()
                            + '&isMedicaoDispositivo=' + payload.isMedicaoDispositivo;

        console.log(stringURL);

        //Realiza a conexão URL
        fetch(stringURL, {
            method: 'GET',
            //Passando os headers da conexão
            headers: new Headers({
                'Content-type': 'application/json',
            }),
        })
        .then((response) => {
            const statusCode = response.status;
            const data = response.json();
            // data.ultimaMedicao = payload.dataMedicao;
            return Promise.all([statusCode, data]);
        })
        .then(([status, consumo]) => {
            consumo.dataMedicao = payload.dataMedicao;
            consumo.kwhUltimaConta = payload.kwhUltimaConta;
            consumo.kwhRelogio = payload.kwhRelogio;
            //Trata a resposta em Json
            callback(status, consumo);
        }).catch(function(error) {
            //Trata o erro
            console.log(error);
            callback(0, {});			
        });
    }
}
