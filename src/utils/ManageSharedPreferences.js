
import DefautPreference from 'react-native-default-preference';

export class ManageSharedPreferences {

  static getUserInfos(callback) {

    try {

      DefautPreference.get('userInfos').then(function(value) {

        console.log(value);
        if(value != null && value != "" && value != undefined){
          callback(JSON.parse(value));
        }else{
          callback({notLogged: true});
        }
      });

    } catch(e) {
      console.log("Erro ao obter usuário");
      callback(null);
    }

  }
  
  static async saveUserInfos(userInfos) {
    console.log(userInfos);
    try {
      DefautPreference.set('userInfos', JSON.stringify(userInfos)).then(function() {
        console.log("Gravou com sucesso!");
      })
      return true;
    } catch (e) {
      console.log("Erro ao gravar");
      return false;
    }
  }

  static async clearAllInfos() {
    try {
      DefautPreference.clearAll();
      console.log("Apagou tudo!");
      return true;
    }catch (e){
      console.log("Erro ao apagar");
      return false;
    }
  }
}