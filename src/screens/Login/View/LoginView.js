import React, {useEffect, useState} from 'react';
import {View, Text, Image, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import styles from './LoginStyle'

export default LoginView = (props) => {

    let behavior = "";

    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    useEffect(() => {
        console.log('Executa o effect na montagem do componente - componentDidMount');
        return () => {
            console.log('Executa o effect na desmontagem do componente - componentDidUnMount');
        }
    }, [])

    const logoSrc = require ('../../../assets/images/home-gotech-logo.png');
    const placeholderTextColor = '#fff';

    const behaviorLoginButton = () => {

        const loader = <ActivityIndicator color='#020C53' />;
        const textButton = <Text style={styles.text_orange_button}>Fazer Login</Text>

        let contentButton;

        if(props.isLoading) {
            contentButton = loader;
        }else{
            contentButton = textButton;
        }

        return (
            <View style={styles.orange_button}>
                {contentButton}
            </View>    
        )
    }

    return (

        <View style={styles.container}>

            <View style={styles.container_logo}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={logoSrc} />
            </View>

            <KeyboardAvoidingView
                style={styles.container_inputs}
                behavior={behavior}
                enabled
                keyboardVerticalOffset={100}>

                <ErrorMessage 
                    messageError = {props.messageError}
                    isShowingMessageError = {props.isShowingMessageError}
                    hideMessageError = {props.hideMessageError}
                />

                <Input              
                placeholder='E-mail'
                keyboardType='email-address'
                leftIcon={
                    <Icon
                    name='at'
                    type='font-awesome'
                    color='#fff'/>  
                }
                leftIconContainerStyle={styles.input_icon}
                inputStyle={styles.dark_text_input}
                containerStyle={styles.container_input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={text => {
                    props.setEmail(text);
                }}

                onFocus = {() => {props.callbackOnFocus()}}
                value={props.email}
                /> 

                <Input              
                placeholder='Senha'
                secureTextEntry={true}
                leftIcon={
                    <Icon
                    name='lock'
                    type='font-awesome'
                    color='#fff'/>  
                }
                leftIconContainerStyle={styles.input_icon}
                inputStyle={styles.dark_text_input}
                containerStyle={styles.container_input}
                placeholderTextColor={placeholderTextColor}
                onChangeText={text => {
                    props.setPassword(text);
                }}
                onFocus = {() => {props.callbackOnFocus()}}
                
                />

                <TouchableOpacity onPress={props.login}>
                    {behaviorLoginButton()}                       
                </TouchableOpacity>

            </KeyboardAvoidingView>

            <View style={styles.container_register}>
                <View style={{paddingBottom: 16}}>
                    <Text style={styles.normal_white_text}>Não possui cadastro?</Text>
                </View>
                <TouchableOpacity onPress={() => {props.goToCadastro()}}>
                    <View style={styles.orange_button}>
                        <Text style={styles.text_orange_button}>Cadastre-se</Text>
                    </View>                             
                </TouchableOpacity>
            </View>
        </View>
    );
}