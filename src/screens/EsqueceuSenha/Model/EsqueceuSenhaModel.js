export default class EsqueceuSenhaModel {

    constructor() {
       
    }
    
    enviaEmail(payload, callback){

        //Monta URL
        const stringURL = 'https://smartrecorder-api.herokuapp.com/pessoa/esqueceu_senha_send_mail';

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
        .then(([status, pessoa]) => {
            //Trata a resposta em Json
            callback(status, pessoa);
        }).catch(function(error) {
            //Trata o erro
            console.log(error);
            callback(0, {});			
        });
    }
}
