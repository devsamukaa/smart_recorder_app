export default class CadastroContaenergiaModel {

    constructor() {
       
    }

    //Buscando informações no FourSquare
    cadastrarConta(payload, callback){

        //Monta URL
        const stringURL = 'https://smartrecorder-api.herokuapp.com/conta_luz';


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
        .then(([status, conta]) => {
            //Trata a resposta em Json
            callback(status, conta);
        }).catch(function(error) {
            //Trata o erro
            console.log(error);
            callback(0, {});			
        });
    }

    atualizarConta(payload, callback){

        //Monta URL
        const stringURL = 'https://smartrecorder-api.herokuapp.com/conta_luz/'+payload.cdContaLuz;

        //Realiza a conexão URL
        fetch(stringURL, {
            method: 'PUT',
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
        .then(([status, conta]) => {
            //Trata a resposta em Json
            callback(status, conta);
        }).catch(function(error) {
            //Trata o erro
            console.log(error);
            callback(0, {});			
        });
    }
    
}
