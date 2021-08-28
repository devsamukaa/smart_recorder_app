import React, {useState, useEffect} from 'react';
import ConfiguracoesView from '../View/ConfiguracoesView';
import { NavigationActions } from 'react-navigation';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';

const ConfiguracoesController = (props) => {

  let userInfos = JSON.parse(props.navigation.getParam('userInfos', '-1'));

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");

    //Alterando Titulo da Pagina
    props.navigation.setParams({titlePage: "Configuracoes Tela"});
    return

  }, []);

  const goTo = (route, action = '') => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {userInfos: JSON.stringify(userInfos), action: action},
    });

    if(route == "Login") {
      ManageSharedPreferences.clearAllInfos();
    }

    props.navigation.dispatch(navigateAction);
  }
 
  return (
    //Chamando o View e passando o props count_info
      <ConfiguracoesView
        userInfos = {userInfos}
        navigation = {props.navigation}

        goTo = {goTo}
      />
  )
}

//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
ConfiguracoesController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default ConfiguracoesController;
