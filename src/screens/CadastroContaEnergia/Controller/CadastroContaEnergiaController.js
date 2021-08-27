import React, {useState, useEffect} from 'react';
import { Keyboard } from 'react-native';
import CadastroContaEnergiaView from '../View/CadastroContaEnergiaView';
import ContaModel from '../Model/ContaModel';
import { format, addDays } from "date-fns"
import { CustomParses } from '../../../utils/CustomParses';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';
import { NavigationActions } from 'react-navigation';

const CadastroContaEnergiaController = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessageError, setShowingMessageError] = useState('');
  const [messageError, setMessageError] = useState('');

  const contaModel = new ContaModel();
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
    
    if(action == 'editar'){
      props.navigation.setParams({titlePage: "Atualização da C. de Energia"});
    }else{
      props.navigation.setParams({titlePage: "Cadastro da C. de Energia"});
    } 
    
    return

  }, []);

  const cadastraConta = (conta) => {
    
    let payload = {
      kwhConta: conta.consumoMes,
      valorPago: CustomParses.parseCurrencyString(0, conta.totalPago),
      valorTributos: CustomParses.parseCurrencyString(0, conta.totalTributos),
      valorCip: CustomParses.parseCurrencyString(0, conta.valorCip),
      dataValidade: conta.vencimentoConta,
      dataRegistro: format(new Date(), "dd/MM/yyyy"),
      instalacao: {
        cdInstalacao: userInfos.instalacao.cdInstalacao,
      }
    }

    Keyboard.dismiss();
    hideMessageError();

    if(!isLoading) {
      setIsLoading(true);

      if(userInfos.contaLuz == null) {
        contaModel.cadastrarConta(payload, callBackCadastraConta);
      }else{
        payload.cdContaLuz = userInfos.contaLuz.cdContaLuz;
        contaModel.atualizarConta(payload, callBackCadastraConta);
      }
    }
  }

  const callBackCadastraConta = (status, conta) => {
    
    userInfos.contaLuz = conta;
    setIsLoading(false);

    if(status == 201 || status == 200) {
      
      if(ManageSharedPreferences.saveUserInfos(userInfos)){
        goTo('VisualizacaoContaEnergia')
      }else{
        showMessageError("Erro, por favor tente novamente.");
      }
    }else {
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
      <CadastroContaEnergiaView
        userInfos = {userInfos}
        navigation = {props.navigation}

        cadastraConta = {cadastraConta}
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
CadastroContaEnergiaController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default CadastroContaEnergiaController;
