import React, {useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import { Encrypt } from '../../../utils/Encrypt';
import CadastroView from '../View/CadastroView';
import CadastroModel from '../Model/CadastroModel';
import { NavigationActions } from 'react-navigation';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';

const CadastroController = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessageError, setShowingMessageError] = useState('');
  const [messageError, setMessageError] = useState('');

  const cadastroModel = new CadastroModel();

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

  const cadastraPessoa = (pessoa) => {
    
    let payload = {
      nome: pessoa.nome,
      email: pessoa.email,
      cpf: pessoa.cpf,
      cnpj: null,
      metaConsumo: null,
      tipoPessoa: "PF",
      password: Encrypt.toSHA1(pessoa.senha),
      plano: {
          cdPlano: 1
      }
    }

    Keyboard.dismiss();
    hideMessageError();

    if(!isLoading) {
      setIsLoading(true);

      cadastroModel.cadastrarPessoa(payload, callbackCadastraPessoa);
    }
  }

  const callbackCadastraPessoa = (status, userInfos) => {
    
    console.log(status, userInfos);
    setIsLoading(false);

    if(status == 201) {
      //goToHome(userInfos);
      if(ManageSharedPreferences.saveUserInfos(userInfos)){
        goToHome(userInfos);
      }else{
        showMessageError("Erro, por favor tente novamente.");
      }
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
 
  return (
    //Chamando o View e passando o props count_info
      <CadastroView
        navigation = {props.navigation}

        cadastraPessoa = {cadastraPessoa}

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
CadastroController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default CadastroController;
