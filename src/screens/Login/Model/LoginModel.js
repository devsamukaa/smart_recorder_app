export default class LoginModel {

    constructor() {

    }

    login(email, password, callback){

        //Monta URL
        const stringURL = 'https://smartrecorder-api.herokuapp.com/pessoa/login';

        console.log(email);
        console.log(password);

        //Realiza a conexão URL
        fetch(stringURL, {
            method: 'POST',
            //Passando os headers da conexão
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response) => {

            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then(([status, userInfos]) => {
            //Trata a resposta em Json
            callback(status, userInfos);
        }).catch(function() {
            //Trata o erro
            console.log("error");
            callback(0, {});			
        });
    }

} 