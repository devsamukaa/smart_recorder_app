import React from 'react';
import {
    View,
    TouchableOpacity,  
  } from 'react-native';
  import {Icon} from 'react-native-elements' //Importante React

DefaultHeader = (navigation) => {
        
    let navigationProps = null;

    //Customizando a navegação
    navigationProps = {            
        title: navigation.getParam('titlePage', 'Tela'), //Mudaremos o nome da tela conforme o parametro passado
        headerTintColor: '#ffffff', //Alterando as cores do botões 
        headerStyle: {
            backgroundColor: '#020C53', //Alterando a cor de fundo
        },
        headerShown: navigation.getParam('headerShown', true),
    };
    
    //Se não receber o parametro showBackButton ou se ele for false,
    // mostra botão de menu para mostrar Sidebar
    if(!navigation.getParam("showBackButton", false)){
        let view = (
            <TouchableOpacity onPress={ () => navigation.toggleDrawer()}>
            <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 10, paddingTop: 10}}>
                {/*Adicionando ícone FontAwesome*/} 
                <Icon
                    name='bars'
                    type='font-awesome'
                    color='#ffffff'/>                                     
            </View>  
            </TouchableOpacity>
        );
        //Adicionando botão menu na lateral esquerda
        navigationProps = {... navigationProps, headerLeft : () => view};
    }

    //Retornando as opções
    return navigationProps;
};

export default DefaultHeader;