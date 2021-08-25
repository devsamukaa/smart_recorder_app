
import SharedPreferences from 'react-native-shared-preferences';

export class ManageSharedPreferences {

  static getUserInfos(callback) {

    try {
      SharedPreferences.getItem("userInfos", function(value){
        
        if(JSON.parse(value) != null){
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
      SharedPreferences.setItem("userInfos", JSON.stringify(userInfos));
      console.log("Gravou com sucesso!");
      return true;
    } catch (e) {
      console.log("Erro ao gravar");
      return false;
    }
  }

  static async clearAllInfos() {
    try {
      SharedPreferences.clear();
      console.log("Apagou tudo!");
      return true;
    }catch (e){
      console.log("Erro ao apagar");
      return false;
    }
  }
}