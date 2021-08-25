import React, {useEffect} from 'react';
import BottomMenuView from '../View/BottomMenuView';
import { NavigationActions } from 'react-navigation';

const BottomMenuController = (props) => {

  //Chamando apos o carregamento do componente
  useEffect(() => {

  }, [props.userInfos]);

  const goTo = (activeBar, route) => {

    if(activeBar == route)
        return;
    
    switch(route){
        case "home":
            route = "Home";
        break;
        case "conta":

            if(props.userInfos.contaLuz == null) {
                route = "CadastroContaEnergia";
            }else {
                route = "VisualizacaoContaEnergia";
            }

        break;
        case "graficos":
            route = "Graficos";
        break;
        case "meta":
            route = "MetaConsumo";
        break;
        case "config":
            route = "Configuracoes";
        break;
    }

    const navigateAction = NavigationActions.navigate({
        routeName: route,
        params: {userInfos: JSON.stringify(props.userInfos)},
    });
    props.navigation.dispatch(navigateAction);
  }
 
  return (
    <BottomMenuView 
        userInfos={props.userInfos}
        activeBar={props.activeBar}
        goTo={goTo}
        />
  )
}
  
export default BottomMenuController;
