import React, {useState, useEffect} from 'react';
import HomeView from '../View/HomeView';
import { Keyboard } from 'react-native';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';
import { NavigationActions } from 'react-navigation';
import { format } from 'date-fns';
import HomeModel from '../Model/HomeModel';

const HomeController = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingMessageError, setShowingMessageError] = useState('');
  const [messageError, setMessageError] = useState('');

  let userInfosParam = JSON.parse(props.navigation.getParam('userInfos', '-1'));
  const [userInfos, setUserInfos] = useState({});

  const homeModel = new HomeModel();

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

    if(userInfosParam == -1) {
      ManageSharedPreferences.getUserInfos(setUserInfos); //Recebendo dados na home
    }else{
      setUserInfos(userInfosParam);
    }
  
    //Alterando Titulo da Pagina
    props.navigation.setParams({titlePage: "Home"});

    return

  }, []);

  const cadastraMedicao = (medicao) => {

    console.log("cadastraMedicao", medicao);

    const _userInfos = userInfos != {} && userInfos != null ? userInfos : userInfosParam;
    
    let payload = {
      isMedicaoDisposito: false,
      dataMedicao: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      kwhUltimaConta: medicao.kwhUltimaConta,
      kwhRelogio: medicao.kwhRelogio,
      fase: {
        cdFase: _userInfos.instalacao.fases[0].cdFase,
      },
      instalacao: {
        cdInstalacao: _userInfos.instalacao.cdInstalacao,
      }
    }

    Keyboard.dismiss();
    hideMessageError();

    if(!isLoading) {
      setIsLoading(true);
      homeModel.cadastrarMedicao(payload, calcularConsumo);
    }
  }

  const calcularConsumo = (status, medicao) => {

    let teste = {...medicao};
    
    if(status == 201) {

      console.log('rolou!');

      let payload = {
        mes: format(new Date(teste.dataMedicao), "MM"),
        ano: format(new Date(medicao.dataMedicao), "yyyy"),
        cdInstalacao: medicao.instalacao.cdInstalacao,
        isMedicaoDispositivo: false,
        dataMedicao: medicao.dataMedicao,
      }

      console.log(payload);
      homeModel.calculaConsumo(payload, callBackCadastraMedicao);

    }else{
      setIsLoading(false);
      showMessageError("Erro, por favor tente novamente.");
    }
    
  }

  const callBackCadastraMedicao = (status, consumo) => {

    console.log("callbackCadastraMedicao", status, consumo);
    
    setIsLoading(false);

    if(status == 200) {

      let _userInfos = {...userInfos};

      _userInfos.consumo = {
        kwh: consumo.kwh,
        custo: consumo.custo,
        ultimaMedicao: consumo.dataMedicao,
      };

      userInfosParam = {..._userInfos};

      if(ManageSharedPreferences.saveUserInfos(_userInfos)){
        setUserInfos(_userInfos);
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
  }
 
  return (
    //Chamando o View e passando o props count_info
      <HomeView
        userInfos={userInfos}
        goTo={goTo}
        navigation={props.navigation}

        cadastraMedicao={cadastraMedicao}

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
HomeController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default HomeController;
