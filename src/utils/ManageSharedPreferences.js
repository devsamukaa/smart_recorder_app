
// import SharedPreferences from 'react-native-shared-preferences';

import DefautPreference from 'react-native-default-preference';

export class ManageSharedPreferences {

  static getUserInfos(callback) {

    try {
      // SharedPreferences.getItem("userInfos", function(value){
        
      //   if(JSON.parse(value) != null){
      //     callback(JSON.parse(value));
      //   }else{
      //     callback({notLogged: true});
      //   }
      // });

      DefautPreference.get('userInfos').then(function(value) {
        if(JSON.parse(value) != null && JSON.parse(value) != ""){
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
      // SharedPreferences.setItem("userInfos", JSON.stringify(userInfos));
      DefautPreference.set('userInfos', JSON.stringify(userInfos)).then(function() {
        console.log("Gravou com sucesso!");
      })
      // console.log("Gravou com sucesso!");
      return true;
    } catch (e) {
      console.log("Erro ao gravar");
      return false;
    }
  }

  static async clearAllInfos() {
    try {
      // SharedPreferences.clear();
      DefautPreference.clearAll();
      console.log("Apagou tudo!");
      return true;
    }catch (e){
      console.log("Erro ao apagar");
      return false;
    }
  }
}