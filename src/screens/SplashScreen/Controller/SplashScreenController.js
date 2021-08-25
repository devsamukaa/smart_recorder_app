import React, {useState, useEffect} from 'react';
import SplashScreenView from '../View/SplashScreenView';
import { NavigationActions } from 'react-navigation';
import { ManageSharedPreferences } from '../../../utils/ManageSharedPreferences';

const SplashScreenController = (props) => {

  const [userInfos, setUserInfos] = useState({});

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");
    
    ManageSharedPreferences.getUserInfos(setUserInfos); //Recebendo dados na home
    // ManageSharedPreferences.clearAllInfos(); //Recebendo dados na home

    //Alterando Titulo da Pagina
    props.navigation.setParams({headerShown: false});
    
  },[]);


  useEffect(() => {

    if(userInfos.hasOwnProperty("password")){
        goTo('Home');
    }else if(userInfos.hasOwnProperty("notLogged")){
        goTo('Login');
    }    

  } , [userInfos]);
  
  const goTo = (route) => {
    
    setTimeout(() => {
        const navigateAction = NavigationActions.navigate({
          routeName: route,
          params: {userInfos: JSON.stringify(userInfos)}
        });
        props.navigation.dispatch(navigateAction);
    }, 7000)
  }

  return (
    //Chamando o View e passando o props count_info
      <SplashScreenView />
  )
}


//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
SplashScreenController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default SplashScreenController;
