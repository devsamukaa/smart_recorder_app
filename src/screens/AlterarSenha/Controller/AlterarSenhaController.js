import React, {useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import AlterarSenhaView from '../View/AlterarSenhaView';
import AlterarSenhaModel from '../Model/AlterarSenhaModel';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';
import { NavigationActions } from 'react-navigation';
import { Encrypt } from '../../../utils/Encrypt';

const AlterarSenhaController = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessageError, setShowingMessageError] = useState('');
  const [messageError, setMessageError] = useState('');

  const alterarSenhaModel = new AlterarSenhaModel();
  let userInfos = JSON.parse(props.navigation.getParam('userInfos', '-1'));
  let action = props.navigation.getParam('action', '-1');

  const showMessageError = (message) => {
    setMessageError(message);
    setShowingMessageError(true);
    console.log(message);
  }

  const hideMessageError = () => {
    setShowingMessageError(false);
  }

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");
    
    props.navigation.setParams({titlePage: "Atualização da senha"});
    
    return

  }, []);

  const alterarSenha = (dadosSenha) => {
    
    let payload = {
      email: userInfos.email,
      password: Encrypt.toSHA1(dadosSenha.senha),
      newPassword: Encrypt.toSHA1(dadosSenha.novaSenha),
    }

    Keyboard.dismiss();
    hideMessageError();

    if(!isLoading) {
      setIsLoading(true);
      alterarSenhaModel.atualizarSenha(payload, callbackAlterarSenha);
    }
  }

  const callbackAlterarSenha = (status, pessoa) => {
    
    userInfos.password = pessoa.password;
    setIsLoading(false);

    if(status == 200) {
      
      if(ManageSharedPreferences.saveUserInfos(userInfos)) {
        goTo('Configuracoes');
      }else{
        showMessageError("Erro, por favor tente novamente.");
      }

    }else if(status == 403) {
      showMessageError("A senha atual informada está incorreta");
    } else {
      showMessageError("Erro, por favor tente novamente.");
    }

  }

  const goTo = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {userInfos: JSON.stringify(userInfos)},
    });
    props.navigation.dispatch(navigateAction);
    console.log(JSON.stringify(userInfos))
  }
 
  return (
    //Chamando o View e passando o props count_info
      <AlterarSenhaView
        userInfos = {userInfos}
        navigation = {props.navigation}

        alterarSenha = {alterarSenha}
        action = {action}

        isLoading = {isLoading}
        messageError = {messageError}
        isShowingMessageError = {isShowingMessageError}
        hideMessageError = {hideMessageError}
      />
  )
}

//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
AlterarSenhaController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default AlterarSenhaController;
