import React, {useEffect, useState} from 'react';
import {View, Text, Image, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import customStyles from './LoginStyle';
import styles from '../../../components/GlobalStyle/GlobalStyle';

export default LoginView = (props) => {

    const [senhaInput, setSenhaInput] = useState(null);

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
        const textButton = <Text style={customStyles.text_orange_button}>Fazer Login</Text>

        let contentButton;

        if(props.isLoading) {
            contentButton = loader;
        }else{
            contentButton = textButton;
        }

        return (
            <View style={customStyles.orange_button}>
                {contentButton}
            </View>    
        )
    }

    const formValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Digite um e-mail válido")
            .required('Insria o e-mail'),
        senha: yup
          .string()
          .min(6, ({ min }) => `A senha precisa ter um minimo de ${min} caracteres`)
          .required('Insira a Senha'),
      });

    return (

        <View style={customStyles.container}>

            <View style={customStyles.container_logo}>
                <Image
                    style={customStyles.logo}
                    resizeMode='contain'
                    source={logoSrc} />
            </View>

            <KeyboardAvoidingView
                style={customStyles.container_inputs}
                behavior={behavior}
                enabled
                keyboardVerticalOffset={100}>

                <ErrorMessage 
                    messageError = {props.messageError}
                    isShowingMessageError = {props.isShowingMessageError}
                    hideMessageError = {props.hideMessageError}
                />

                <Formik
                validationSchema={formValidationSchema}
                initialValues={
                  {email: '', senha: ''}
                }
                onSubmit={values => { props.login(values)}}>

                {({ 
                  handleChange, 
                  handleBlur, 
                  handleSubmit, 
                  values,
                  errors,
                  touched,
                  
                  }) => (
                  <>
                    
                    <View style={[styles.width_100]}>
                        <Input     
                        name='email'         
                        placeholder='E-mail'
                        keyboardType='email-address'
                        leftIcon={
                            <Icon
                            name='at'
                            type='font-awesome'
                            color='#fff'/>  
                        }
                        leftIconContainerStyle={customStyles.input_icon}
                        inputStyle={customStyles.dark_text_input}
                        placeholderTextColor={placeholderTextColor}
                        containerStyle= {styles.padding_horizontal_0}
                        onChangeText={handleChange('email')}
                        handleBlur={handleBlur('email')}
                        onFocus = {() => {props.callbackOnFocus()}}
                        value={values.email}
                        returnKeyType="next"
                        onSubmitEditing={() => { if(senhaInput != null) {senhaInput.focus()} }}
                        blurOnSubmit={false}
                        />
                        {(errors.email && touched.email) && <Text style={[styles.error_dark_minor_text]}>{errors.email}</Text>}
                    </View>
                        
                    <View style={[styles.width_100]}>
                        <Input   
                        ref={(input) => { setSenhaInput(input) }}
                        name='senha'           
                        placeholder='Senha'
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                            name='lock'
                            type='font-awesome'
                            color='#fff'/>  
                        }
                        leftIconContainerStyle={customStyles.input_icon}
                        inputStyle={customStyles.dark_text_input}
                        placeholderTextColor={placeholderTextColor}
                        containerStyle= {styles.padding_horizontal_0}
                        onChangeText={handleChange('senha')}
                        handleBlur={handleBlur('senha')}
                        onFocus = {() => {props.callbackOnFocus()}}
                        returnKeyType="go"
                        onSubmitEditing={(event) => handleSubmit()}
                        />
                        {(errors.senha && touched.senha) && <Text style={[styles.error_dark_minor_text]}>{errors.senha}</Text>}

                        <Text 
                            style={[styles.black_text_18, styles.white_text, styles.padding_vertical_8, {alignSelf: 'flex-end'}]}
                            onPress={props.goToEsqueceuSenha}>
                            Esqueceu a senha?
                        </Text>
                    </View>
                    
                    

                    <TouchableOpacity onPress={handleSubmit}>
                        {behaviorLoginButton()}                       
                    </TouchableOpacity>
                    </>
                )}
              </Formik>
            </KeyboardAvoidingView>

            <View style={customStyles.container_register}>
                <View style={{paddingBottom: 16}}>
                    <Text style={customStyles.normal_white_text}>Não possui cadastro?</Text>
                </View>
                <TouchableOpacity onPress={() => {props.goToCadastro()}}>
                    <View style={customStyles.orange_button}>
                        <Text style={customStyles.text_orange_button}>Cadastre-se</Text>
                    </View>                             
                </TouchableOpacity>
            </View>
        </View>
    );
}