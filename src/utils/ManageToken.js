import firebaseMsg from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import KeysInfo from './KeysInfo'
import { NavigationActions } from 'react-navigation';

export default class ManageToken {
    
    constructor () {
        //Inicializa o FirebaseMsg
        if (!firebaseMsg.apps.length) {
            firebaseMsg.initializeApp(KeysInfo.getFirebaseConfig());
        }  
    }
    async checkPermission() {
        //Cria os canais de mensagem
        const channel = new firebaseMsg.notifications.Android.Channel('insider', 'insider channel', 
        firebaseMsg.notifications.Android.Importance.Max)
        firebaseMsg.notifications().android.createChannel(channel);
        
        //Checa se o FirebaseMsg tem permissão
        const enabled = await firebaseMsg.messaging().hasPermission();
        if (enabled) {
            //Se tem permissão, busca o token
            this.getToken();
        } else {
            //Se não tem permissão, irá pedir permissão
            this.requestPermission();
        }    

    }

    async getToken() {
        
        //Tenta retornar token já gravado
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        
        if (!fcmToken) {
            //Se não tiver token gravado, busca no Firebase
            fcmToken = await firebaseMsg.messaging().getToken();
            if (fcmToken) {                
                // Grava a informação de token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        //Gera o log do token. Ele deverá ser enviado ao servidor posteriomente
        console.log("Token");
        console.log(fcmToken);
    }

    //Pede permissão 
    async requestPermission() {
        
        try {
            //Pede permissão 
            await firebaseMsg.messaging().requestPermission();
            
            //Se não der erro, permissão foi autorizada e pede o token
            this.getToken();
        } catch (error) {
            // Usuário não permitiu Buscar Token
            console.log('permission rejected');
        }
    }    

    showNotification = (notification, isMessage) => {
        let infoData;
        //Verifica de onde buscar a informação de acordo com o envio
        if(isMessage){
            infoData = message._data;
        } else {
            infoData = notification
        }
        //monta as variaveis vindo da notificação
        const {
            body,
            data,
            title
        } = infoData;
        console.log("LOG: ", title, body, JSON.stringify(data))

        //Cria o canal de comunicação
        const channelId = new firebaseMsg.notifications.Android.Channel("Default", "Default", 
        firebaseMsg.notifications.Android.Importance.High);
        firebaseMsg.notifications().android.createChannel(channelId);
    
        //monta a informação da Notificação
        let notification_to_be_displayed = new firebaseMsg.notifications.Notification({
          data: data,
          sound: 'default',
          show_in_foreground: true,
          title: title,
          body: body,
        });
    
        //Se for Android, inseri algumas outras configurações
        if (Platform.OS == "android") {
          notification_to_be_displayed
            .android.setPriority(firebaseMsg.notifications.Android.Priority.High)
            .android.setChannelId("Default")
            .android.setBigPicture("ic_big_icon","ic_big_icon",title,body)
            .android.setBigText(body)
            .android.setVibrate(1000);
        }
    
        //Exibe a notificação
        firebaseMsg.notifications().displayNotification(notification_to_be_displayed);
    }

    //gerencia a informação da notificação
    manageNotificationOpen = (navigator, notificationOpen) => {
        // Pega a action da notificação
        const action = notificationOpen.action;
        // Pega informaçao da notificação
        const notification = notificationOpen.notification;        

        //Gerencia a data que veio da notificação
        const data = notification._data;

        //Se veio a informação screenType e ele é 1
        if(data.screenType === "1"){
            //Abre a Home
            const navigateAction = NavigationActions.navigate({
                routeName: "Home"
            });
            navigator.dispatch(navigateAction);          
        }
    }
}