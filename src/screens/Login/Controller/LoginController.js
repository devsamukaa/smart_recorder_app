import React, {useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import LoginView from '../View/LoginView';
import LoginModel from '../Model/LoginModel';
import { NavigationActions } from 'react-navigation';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';
import { Encrypt } from '../../../utils/Encrypt';

const LoginController = (props) => {

  //States de Comportamento
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessageError, setShowingMessageError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const loginModel = new LoginModel();

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");


    //Alterando Titulo da Pagina
    props.navigation.setParams({headerShown: false});
    
  }, []);

  const showMessageError = (message) => {
    setMessageError(message);
    setShowingMessageError(true);
  }

  const hideMessageError = () => {
    setShowingMessageError(false);
  }

  const login = (userInfos) => {
    Keyboard.dismiss();
    hideMessageError();

    if(!isLoading){
      setIsLoading(true);
      loginModel.login(userInfos.email, Encrypt.toSHA1(userInfos.senha), callbackLogin);
    }
    
  }

  const callbackLogin = (status, userInfos) => {
    
    console.log(status, userInfos);
    setIsLoading(false);

    if(status == 200) {
      //goToHome(userInfos);
      if(ManageSharedPreferences.saveUserInfos(userInfos)){
        goToHome(userInfos);
      }else{
        showMessageError("Erro, por favor tente novamente.");
      }
    }else if(status == 403){
      showMessageError("Email ou senha inválidos");
    }else {
      showMessageError("Erro, por favor tente novamente.");
    }

  }

  const goToHome = (userInfos) => {
    const navigateAction = NavigationActions.navigate({
      routeName: "Home",
      params: {userInfos: JSON.stringify(userInfos)}
    });
    props.navigation.dispatch(navigateAction);
  }

  const goToCadastro = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "Cadastro",
    });
    props.navigation.dispatch(navigateAction);
  }

  const callbackOnFocus = () => {
    hideMessageError();
  }

  return (
    //Chamando o View e passando o props count_info
      <LoginView
        login = {login}

        isLoading = {isLoading}
        messageError = {messageError}
        isShowingMessageError = {isShowingMessageError}
        
        callbackOnFocus = {callbackOnFocus}
        hideMessageError = {hideMessageError}

        goToCadastro = {goToCadastro}
      />
  )
}


//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
LoginController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default LoginController;
