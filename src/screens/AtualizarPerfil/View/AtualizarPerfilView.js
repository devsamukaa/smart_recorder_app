import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import {Input} from 'react-native-elements';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../../components/GlobalStyle/GlobalStyle';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import customStyles from './AtualizarPerfilStyle'

export default AtualizarPerfilView = (props) => {

    const [emailInput, setEmailInput] = useState(null);
    const [cpfInput, setCpfInput] = useState(null);

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const placeholderTextColor = '#acb6fd';

    const formValidationSchema = yup.object().shape({
      nome: yup
        .string()
        .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Nome só pode ter caracteres latinos.'
            )
        .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Por favor, insira o segundo nome')
        .required('Insira o nome'),
      email: yup
        .string()
        .email("Digite um e-mail válido")
        .required('Insria o e-mail'),
      cpf: yup
        .string()
        .min(14, "Digite um CPF válido")
        .required('Insira o CPF'),
    });

    const initializeFormik = {
      nome: props.userInfos.nome, 
      cpf: props.userInfos.cpf, 
      email: props.userInfos.email
    };
    

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        <View style={styles.container_app}> 
          <ScrollView style={styles.container_scroll_screen}>
            <View style={styles.internal_container}>

            <ErrorMessage 
              messageError = {props.messageError}
              isShowingMessageError = {props.isShowingMessageError}
              hideMessageError = {props.hideMessageError}
            />
            
            <View style={[styles.margin_bottom_16]}>
                <Text style={[styles.black_text]}>
                  Preencha as informações abaixo para atualizar seu Perfil.
                </Text>
              </View>

              <Formik
                validationSchema={formValidationSchema}
                initialValues={
                  initializeFormik
                }
                onSubmit={values => props.atualizarPerfil(values)}>

                {({ 
                  handleChange, 
                  handleBlur, 
                  handleSubmit, 
                  values,
                  errors,
                  touched,
                  
                  }) => (
                  <>
                    {/* Consumo do mês (kWh) */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text]}>Nome:</Text>
                      </View>

                      <View>

                        <Input
                          name='nome'
                          placeholder='Digite seu nome'
                          placeholderTextColor={placeholderTextColor}
                          inputStyle={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          inputContainerStyle={[
                            styles.border_bottom_light_input,
                          ]}
                          containerStyle={styles.padding_horizontal_0}
                          value={values.nome}
                          onChangeText={handleChange('nome')}
                          handleBlur={handleBlur('nome')}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(cpfInput != null) {cpfInput.focus()} }}
                          blurOnSubmit={false}
                        />

                        {(errors.nome && touched.nome) && <Text style={[styles.error_minor_text,]}>{errors.nome}</Text>}
                        
                      </View>

                    </View>

                    {/* Vencimento da conta */}
                    <View style={[styles.margin_bottom_16]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>CPF:</Text>
                      </View>

                      <View>

                        <TextInputMask
                          refInput={(input) => { setCpfInput(input) }}
                          name='cpf'
                          placeholder='000.000.000-00'
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          type={'cpf'}
                          value={values.cpf}
                          onChangeText={handleChange('cpf')}
                          handleBlur={handleBlur('cpf')}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(emailInput != null) {emailInput.focus()} }}
                          blurOnSubmit={false}
                          />

                        {(errors.cpf && touched.cpf) && <Text style={[styles.error_dark_minor_text]}>{errors.cpf}</Text>}
                        
                      </View>

                    </View>

                    {/* Total Pago */}
                    <View style={[styles.margin_bottom_32]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Email:</Text>
                      </View>

                      <View>

                       <Input
                          ref={(input) => { setEmailInput(input) }}
                          name='email'
                          placeholder='example@mail.com'
                          keyboardType='email-address'
                          inputStyle={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          inputContainerStyle={[
                            styles.border_bottom_light_input,
                          ]}
                          containerStyle={styles.padding_horizontal_0}
                          placeholderTextColor={placeholderTextColor}
                          onChangeText={handleChange('email')}
                          handleBlur={handleBlur('email')}
                          value={values.email}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(senhaInput != null) {senhaInput.focus()} }}
                          blurOnSubmit={false}
                          
                          />

                        {(errors.email && touched.email) && <Text style={[styles.error_dark_minor_text]}>{errors.email}</Text>}
                        
                      </View>

                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={[
                            styles.orange_button
                            ]}>

                            {(!props.isLoading) && 
                              <Text style={styles.text_orange_button}>
                                Atualizar
                              </Text>
                            }
                            {(props.isLoading) && <ActivityIndicator color='#020C53' />}
                            
                        </View>                             
                    </TouchableOpacity>
                  </>
                )}

              </Formik>

            </View>
          </ScrollView>

          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="config"
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
