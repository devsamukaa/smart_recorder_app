import KeysInfo from '../../../utils/KeysInfo'
export default class DetailsPlaceModel {

    //Buscando informações da foto no FourSquare
    getPhotosFoursquare(id, callback){

        //Monta URL
        const stringURL = 'https://api.foursquare.com/v2/venues/'+id+'/photos?client_id='+KeysInfo.getFourSquareClientID() +
        '&client_secret='+KeysInfo.getFourSquareClientSecret()+'&v=20180323';

        //Realiza a conexão URL
        fetch(stringURL, {
            method: 'GET',
            //Passando os headers da conexão
            headers: new Headers({
                    'Accept': 'application/json',
                    'Accept-Language': 'pt',
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            //Trata a resposta em Json
            let photo = require('../../../assets/images/noPhoto.jpg');
            //Se response === 200 e tem foto, monta URL de foto e retorno Uri
            if(json.meta.code === 200){
                if(json.response.photos.count > 0){
                    //Monta info do endereco da foto
                    const strPhoto = json.response.photos.items[0].prefix + "height200" +
                    json.response.photos.items[0].suffix;
                    console.log("Photo = " + strPhoto);
                    photo = {uri: strPhoto}
                }
                callback(1, photo);
            } else {
                callback(json.meta.code, photo);
            }            
        }).catch(function() {
            //Trata o erro
            console.log("error");
            callback(0, {});			
        });
    }
}
