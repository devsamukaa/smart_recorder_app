import React from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView } from 'react-native';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './TemplateStyle'

export default TemplateView = (props) => {

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        <View style={styles.container_app}> 
          <ScrollView style={styles.container_scroll_screen}>
            <View style={styles.internal_container}>

              {/* Faça o seu layou aqui */}
              
            </View>
          </ScrollView>

          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="home" //apagar caso seja uma tela que não represente um ícone de baixo
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
