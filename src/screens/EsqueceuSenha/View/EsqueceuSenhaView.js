import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import {Input} from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './EsqueceuSenhaStyle'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import SuccessMessage from '../../../components/SuccessMessage/SuccessMessage';

export default EsqueceuSenhaView = (props) => {

    const [cpfInput, setCpfInput] = useState(null);
    const [emailInput, setEmailInput] = useState(null);
    const [senhaInput, setSenhaInput] = useState(null);
    const [confirmaSenhaInput, setConfirmaSenhaInput] = useState(null);

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const logoSrc = require ('../../../assets/images/home-gotech-logo.png');

    const formValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Digite um e-mail válido")
        .required('Insria o e-mail'),
    });

    const placeholderTextColor = '#ffffff';

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        <View style={[styles.container_app]}> 
          <ScrollView style={[styles.container_scroll_screen, styles.background_blue]}>
            <View style={[styles.internal_container, styles.align_vertical]}>

              <View style={customStyles.container_logo}>
                  <Image
                      style={styles.logo}
                      resizeMode='contain'
                      source={logoSrc}
                      />
              </View>

              <SuccessMessage 
                    successMessage = {props.successMessage}
                    isShowingSuccessMessage = {props.isShowingSuccessMessage}
                    hideSuccessMessage = {props.hideSuccessMessage}
                />

              <ErrorMessage 
                    messageError = {props.messageError}
                    isShowingMessageError = {props.isShowingMessageError}
                    hideMessageError = {props.hideMessageError}
                />

              <Text
                style={[styles.black_text, styles.white_text, styles.margin_bottom_24]}>
                Insira abaixo seu e-mail. Caso exista uma conta associada, enviaremos um e-mail contendo um link para redefinir a senha.
              </Text>

              <Text
                style={[styles.black_text, styles.white_text, styles.margin_bottom_24]}>
                Caso não encontre o e-mail em sua caixa de entrada, lembre-se de procurá-lo também em sua <Text style={styles.bold_black_text_16}>caixa de spam.</Text>
              </Text>

              <Text
                style={[styles.black_text, styles.white_text, styles.margin_bottom_24]}>
                Ao acessar o app, você pode desejar acessar as <Text style={[styles.bold_black_text_16]}>Configurações</Text> e alterar a sua senha.
              </Text>

              <Formik
                validationSchema={formValidationSchema}
                initialValues={
                  {email: ''}
                }
                onSubmit={values => props.enviaEmail(values)}>

                {({ 
                  handleChange, 
                  handleBlur, 
                  handleSubmit, 
                  values,
                  errors,
                  touched,
                  
                  }) => (
                  <>

                    {/* Email */}
                    <View style={[styles.margin_bottom_32]}>

                      <View>
                        <Text style={[styles.bold_black_text, styles.white_text]}>Email</Text>
                      </View>

                      <View>
                      
                        <Input
                          name='email'
                          placeholder='example@mail.com'
                          keyboardType='email-address'
                          inputStyle={styles.dark_text_input}
                          containerStyle={[
                            styles.container_input, 
                          ]}
                          inputContainerStyle={[
                            styles.border_bottom_dark_input,
                          ]}
                          placeholderTextColor={placeholderTextColor}
                          onChangeText={handleChange('email')}
                          handleBlur={handleBlur('email')}
                          value={values.email}
                          returnKeyType="next"
                          returnKeyType="go"
                          onSubmitEditing={(event) => handleSubmit()}
                          
                          />

                        {(errors.email && touched.email) && <Text style={[styles.error_dark_minor_text]}>{errors.email}</Text>}
                        
                      </View>

                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={[styles.orange_button, styles.margin_bottom_40]}>

                            {(!props.isLoading) && 
                              <Text style={styles.text_orange_button}>
                                Enviar
                              </Text>
                            }
                            {(props.isLoading) && <ActivityIndicator color='#020C53' />}
                            
                        </View>                             
                    </TouchableOpacity>
                  </>
                )}

              </Formik>

              <View style={[]}>
                <View style={[styles.margin_bottom_16]}>
                    <Text style={[styles.black_text_18, styles.white_text, styles.text_align_center]}>Lembrou ou já alterou a senha?</Text>
                </View>
                <TouchableOpacity onPress={() => {props.goToLogin()}}>
                    <View style={styles.blue_button}>
                        <Text style={[styles.bold_black_text_20, styles.orange_text_2, styles.text_align_center]}>Fazer Login</Text>
                    </View>                             
                </TouchableOpacity>
              </View>
              
            </View>
          </ScrollView>
        </View> 
      </KeyboardAvoidingView>

    )
}
