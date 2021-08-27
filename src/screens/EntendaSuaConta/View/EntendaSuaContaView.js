import React from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView } from 'react-native';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './EntendaSuaContaStyle'

export default EntendaSuaContaView = (props) => {

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

              <Text style={[styles.orange_text, styles.bold_black_text_18, styles.margin_bottom_8]}>
                Tarifas:
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8]}>
                <Text style={[styles.bold_black_text_18]}>Grupo A</Text> - São consumidores de alta tensão
              </Text>
              
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
