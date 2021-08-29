import React, {useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import { Encrypt } from '../../../utils/Encrypt';
import EsqueceuSenhaView from '../View/EsqueceuSenhaView';
import EsqueceuSenhaModel from '../Model/EsqueceuSenhaModel';
import { NavigationActions } from 'react-navigation';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';

const EsqueceuSenhaController = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessageError, setShowingMessageError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [isShowingSuccessMessage, setShowingSuccessMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const esqueceuSenhaModel = new EsqueceuSenhaModel();

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");

    //Alterando Titulo da Pagina
    props.navigation.setParams({headerShown: false});
    return

  }, []);

  const showMessageError = (message) => {
    setMessageError(message);
    setShowingMessageError(true);
    console.log(message);
  }

  const hideMessageError = () => {
    setShowingMessageError(false);
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowingSuccessMessage(true);
    console.log(message);
  }

  const hideSuccessMessage = () => {
    setShowingSuccessMessage(false);
  }

  const enviaEmail = (pessoa) => {
    
    let payload = {
      email: pessoa.email,
    }

    Keyboard.dismiss();
    hideMessageError();

    if(!isLoading) {
      setIsLoading(true);

      esqueceuSenhaModel.enviaEmail(payload, callbackEnviaEmail);
    }
  }

  const callbackEnviaEmail = (status, userInfos) => {
    
    console.log(status, userInfos);
    setIsLoading(false);

    if(status == 200) {
      showSuccessMessage("E-mail enviado com sucesso!");
      setTimeout(() => {
        goToLogin();
      }, 7000)
    } else if(status == 403){
      showMessageError("E-mail não cadastrado.");
    } else {
      showMessageError("Erro, por favor tente novamente.");
    }

  }

  const goToLogin = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "Login",
    });
    props.navigation.dispatch(navigateAction);
  }

  return (
    //Chamando o View e passando o props count_info
      <EsqueceuSenhaView
        navigation = {props.navigation}

        enviaEmail = {enviaEmail}

        goToLogin = {goToLogin}

        isLoading = {isLoading}
        messageError = {messageError}
        isShowingMessageError = {isShowingMessageError}

        isShowingSuccessMessage = {isShowingSuccessMessage}
        successMessage = {successMessage}

        hideSuccessMessage = {hideSuccessMessage}
        hideMessageError = {hideMessageError}
      />
  )
}

//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
EsqueceuSenhaController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default EsqueceuSenhaController;
