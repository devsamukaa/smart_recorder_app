//Importamos as bibliotecas do react-navigation e react-navigation-stack
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from '../screens/SideMenu/Controller/SideMenuController';
import LoginController from '../screens/Login/Controller/LoginController';
import NewPlaceController from '../screens/z-deprecated/Controller/NewPlaceController';
import firebase from 'react-native-firebase';
import ManageToken from '../utils/ManageToken';
import HomeController from '../screens/Home/Controller/HomeController';
import SplashScreenController from '../screens/SplashScreen/Controller/SplashScreenController';
import CadastroContaEnergiaController from '../screens/CadastroContaEnergia/Controller/CadastroContaEnergiaController';
import VisualizacaoContaEnergiaController from '../screens/VisualizacaoContaEnergia/Controller/VisualizacaoContaEnergiaController';
import CadastroController from '../screens/Cadastro/Controller/CadastroController';
import EntendaSuaContaController from '../screens/EntendaSuaConta/Controller/EntendaSuaContaController';
import ConfiguracoesController from '../screens/Configuracoes/Controller/ConfiguracoesController'
import AlterarSenhaController from '../screens/AlterarSenha/Controller/AlterarSenhaController';
import AtualizarPerfilController from '../screens/AtualizarPerfil/Controller/AtualizarPerfilController';

//Aqui criamos o DrawerNavigator. Ele é um objeto que criará o header
const AppLogged = createDrawerNavigator(
  {       
    //Aqui criamos um StackNavigator que fara o fluxo de navegacao entre essas telas
    UnLogedArea: createStackNavigator({
      SplashScreen: SplashScreenController,
      Login: LoginController,
      Cadastro: CadastroController,
      NewPlace: NewPlaceController,
    }),
    LogedArea: createStackNavigator({    
      Home: HomeController,
      CadastroContaEnergia : CadastroContaEnergiaController,
      VisualizacaoContaEnergia : VisualizacaoContaEnergiaController,
      EntendaSuaConta: EntendaSuaContaController,
      Configuracoes: ConfiguracoesController,
      AlterarSenha: AlterarSenhaController,
      AtualizarPerfil: AtualizarPerfilController,
    }),
  },
  {
    initialRouteName: 'UnLogedArea',
    contentComponent: SideMenu, //O componente SideMenu sera o menu lateral
});

//Criando o AppContainer para gerenciar todo o aplicativo
const AppContainer = createAppContainer(AppLogged);

//Criamos um classe de para gerenciar a Navegação Principal
export default class MainNavigation extends React.Component {

  constructor (props) {
    super(props);
    this.manageToken = new ManageToken();
  }

  componentDidMount() {
    //Chamado quando recebe uma notificação em Foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Processa uma notificação para ser vista em foreground            
      this.manageToken.showNotification(notification, false);
    });
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Processa uma notificação para ser vista em foreground            
      this.manageToken.showNotification(notification, false);
    });    

    //Se o app está fechado, você checa se foi aberto por notificação
    this.getInitialNotification = firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          //App foi aberto por notificação 
          console.log("Open from Notification");
          //Chamando gerenciador de notificação
          this.manageToken.manageNotificationOpen(this.navigator, notificationOpen);
        }
    });

    //Se o app está em foreground ou background, você escutará se a notificação tiver data
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      //App foi aberto por notificação 
      console.log("Open from Notification");
      //Chamando gerenciador de notificação
      this.manageToken.manageNotificationOpen(this.navigator, notificationOpen);
    });

    //Aberta quando esta em foreground e somente recebe mensagem sem data
    this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));

        //Exibe uma notificação
        this.manageToken.showNotification(message, true);
    });
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  render() {
    console.log('Rendering');
    //Colocando o AppContainer para renderizar
    return (
      
      <AppContainer ref={nav => { this.navigator = nav; }}/>
    );
  }
}
