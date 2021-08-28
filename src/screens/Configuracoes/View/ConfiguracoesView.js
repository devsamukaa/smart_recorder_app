import React from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import styles from '../../../components/GlobalStyle/GlobalStyle';
import customStyles from './ConfiguracoesStyle';

export default ConfiguracoesView = (props) => {

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        <View style={[styles.container_app, customStyles.white_container_app]}> 
          <ScrollView style={[styles.container_scroll_screen]}>
            <View style={[styles.internal_container]}>

              <TouchableOpacity onPress={() => console.log('editar peril')}>
                <View style={[styles.padding_vertical_16, styles.border_bottom_blue]}>

                    <Text style={[styles.black_text_20]}>Atualizar Perfil</Text>

                </View>                             
              </TouchableOpacity>

              <TouchableOpacity onPress={() => props.goTo('AlterarSenha')}>
                <View style={[styles.padding_vertical_16, styles.border_bottom_blue]}>

                    <Text style={[styles.black_text_20]}>Atualizar Senha</Text>

                </View>                             
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                  if(props.userInfos.contaLuz != null){
                    props.goTo("CadastroContaEnergia", "editar");
                  }else{
                    props.goTo("CadastroContaEnergia");
                  }
                }}>
                <View style={[styles.padding_vertical_16, styles.border_bottom_blue]}>

                    <Text style={[styles.black_text_20]}>
                      {props.userInfos.contaLuz != null ? "Atualizar" : "Atualizar"} Conta de Energia
                    </Text>

                </View>                             
              </TouchableOpacity>
              
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => props.goTo("Login")} style={[{marginBottom: 50}]}>
            <View style={[styles.orange_button, styles.padding_vertical_16, customStyles.logoff_button]}>

                <Text style={[styles.black_text_20, styles.text_align_center]}>
                  Sair
                </Text>

                <Icon
                  name='sign-out'
                  type='font-awesome'
                  color='#000000'
                  iconStyle={{marginLeft: 4}}
                  />

            </View>                             
          </TouchableOpacity>
          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="config" //apagar caso seja uma tela que não represente um ícone de baixo
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
