import React, {useState, useEffect} from 'react';
import TemplateView from '../View/EntendaSuaContaView';

const EntendaSuaContaController = (props) => {

  let userInfos = JSON.parse(props.navigation.getParam('userInfos', '-1'));

  //Chamando apos o carregamento do componente
  useEffect(() => {
    console.log("Component Did Mount");

    //Alterando Titulo da Pagina
    props.navigation.setParams({titlePage: "Entenda sua conta", showBackButton: true});
    return

  }, []);
 
  return (
    //Chamando o View e passando o props count_info
      <EntendaSuaContaView
        userInfos = {userInfos}
        navigation = {props.navigation}
      />
  )
}

//Aqui a grande mudança: Agora customizamos nosso header
//diretamente no componente. E usamos um novo componente chamado
//DefaultHeader para utilizarmos o mesmo código em todas os componentes
EntendaSuaContaController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};
  
export default EntendaSuaContaController;
