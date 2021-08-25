import React from 'react';
import {
  View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, Dimensions
} from 'react-native';
import { Input, Icon } from 'react-native-elements'
import styles from './NewPlacesStyle'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default NewPlacesView = (props) => {    
    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }
    
    //Get Screen dimensions
    const win = Dimensions.get('window');

    let picture = null;
    /* Verificamos se a imagem da câmera foi enviada */
    if (props.newImageCaptured !== null){
        //Se foi enviada, mostra a imagem
        picture = <Image source={{ uri: "data:image/png;base64,"+props.newImageCaptured }} 
              style={{width: win.width, height: 200}}
              resizeMode='contain' />;
    } else {
        //Senão, mostra o ícone
        picture = (
            <View>
              <Icon
                  name='camera'
                  type='font-awesome'
                  color='#1b4275'
                  />                        
            </View>
        )                
    }    
    return (
      // Adicionando o KeyboardAvoidingView para diminuir a tela quando o teclado subir
      // Adiciona o valor do behavior do Javascript 
      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
      <View style={styles.container}> 
        <Text style={styles.title}>Adicionando Informações</Text>
        {/* Adicionando o ScrollView e os componentes que queremos colocar na rolagem */}
        <ScrollView>
          {/* Adicionando o container da câmera */}
          <View style={styles.cameraContainer} >
              <TouchableOpacity onPress={props.onCameraClicked}>
                  {picture}
                  <Text style={styles.photoChangeText}>Change photo</Text>                    
              </TouchableOpacity>                                  
          </View>
          <View style={styles.inputView}>
            {/* Input com os dados a serem preenchidos */}
            <Input              
              placeholder='Nome'
              leftIcon={
                <Icon
                  name='user'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input            
              placeholder='email'
              leftIcon={
                <Icon
                  name='envelope'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input            
              placeholder='telefone'
              leftIcon={
                <Icon
                  name='phone'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder='CEP'
              leftIcon={
                <Icon
                  name='home'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder='Rua'
              leftIcon={
                <Icon
                  name='home'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder='Complemento'
              leftIcon={
                <Icon
                  name='home'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder='Bairro'
              leftIcon={
                <Icon
                  name='home'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder='Cidade'
              leftIcon={
                <Icon
                  name='home'
                  type='font-awesome'
                  color='#aaa'/>  
              }
              leftIconContainerStyle={styles.inputIcon}
            />        
          </View>
          <View style={ styles.buttonDiv}>
              <TouchableOpacity>
                <View 
                  style={styles.buttonSend}>
                    <Text style={styles.buttonSendText}>Enviar</Text>
                </View>                             
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View> 
      </KeyboardAvoidingView>
    )
}
