import React, {useEffect} from 'react';
import VisualizacaoContaEnergiaView from '../View/VisualizacaoContaEnergiaView';
import { NavigationActions } from 'react-navigation';

const VisualizacaoContaEnergiaController = (props) => {

  const userInfos = JSON.parse(props.navigation.getParam('userInfos', '-1'));

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");

    //Alterando Titulo da Pagina
    props.navigation.setParams({titlePage: "Conta de Energia"});
    return

  }, []);

  const goTo = (route, action) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {userInfos: JSON.stringify(userInfos), action: action},
    });
    props.navigation.dispatch(navigateAction);
    console.log(JSON.stringify(userInfos))
  }
 
  return (
    //Chamando o View e passando o props count_info
      <VisualizacaoContaEnergiaView
        userInfos = {userInfos}
        navigation = {props.navigation}

        goTo = {goTo}
      />
  )
}

//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
VisualizacaoContaEnergiaController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default VisualizacaoContaEnergiaController;
