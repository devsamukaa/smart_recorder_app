import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import {Input} from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './CadastroStyle'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

export default CadastroView = (props) => {

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
        .required('Insira o CPF'),
      senha: yup
        .string()
        .min(6, ({ min }) => `A senha precisa ter um minimo de ${min} caracteres`)
        .required('Insira a Senha'),
      confirmarSenha: yup
        .string()
        .oneOf([yup.ref('senha')], 'As senhas não coincidem')
        .required('Confirme a senha'),
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

              <ErrorMessage 
                    messageError = {props.messageError}
                    isShowingMessageError = {props.isShowingMessageError}
                    hideMessageError = {props.hideMessageError}
                />

              <Formik
                validationSchema={formValidationSchema}
                initialValues={
                  {nome: '', cpf: '', email: '', senha: '', confirmarSenha: ''}
                }
                onSubmit={values => props.cadastraPessoa(values)}>

                {({ 
                  handleChange, 
                  handleBlur, 
                  handleSubmit, 
                  values,
                  errors,
                  touched,
                  
                  }) => (
                  <>
                    {/* Nome */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text, styles.white_text]}>Nome:</Text>
                      </View>

                      <View>

                        <Input
                          name='nome'
                          placeholder='Digite seu nome'
                          inputStyle={styles.dark_text_input}
                          containerStyle={[
                            styles.container_input, 
                          ]}
                          inputContainerStyle={[
                            styles.border_bottom_dark_input,
                          ]}
                          placeholderTextColor={placeholderTextColor}
                          onChangeText={handleChange('nome')}
                          handleBlur={handleBlur('nome')}
                          autoFocus={true}
                          value={values.nome}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(cpfInput != null) {cpfInput.focus()} }}
                          blurOnSubmit={false}
                          
                          />

                        {(errors.nome && touched.nome) && <Text style={[styles.error_dark_minor_text]}>{errors.nome}</Text>}
                        
                      </View>

                    </View>

                    {/* CPF */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text, styles.white_text]}>CPF:</Text>
                      </View>

                      <View>

                        <TextInputMask
                          refInput={(input) => { setCpfInput(input) }}
                          name='cpf'
                          placeholder='000.000.000-00'
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.dark_text_input, 
                            styles.container_input,
                            styles.border_bottom_dark_input,
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

                    {/* Email */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text, styles.white_text]}>Email</Text>
                      </View>

                      <View>
                      
                        <Input
                          ref={(input) => { setEmailInput(input) }}
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
                          onSubmitEditing={() => { if(senhaInput != null) {senhaInput.focus()} }}
                          blurOnSubmit={false}
                          
                          />

                        {(errors.email && touched.email) && <Text style={[styles.error_dark_minor_text]}>{errors.email}</Text>}
                        
                      </View>

                    </View>

                    {/* Senha */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text, styles.white_text]}>Senha:</Text>
                      </View>

                      <View>
                      
                        <Input
                          ref={(input) => { setSenhaInput(input) }}
                          name='senha'
                          placeholder='Digite a senha'
                          secureTextEntry={true}
                          inputStyle={styles.dark_text_input}
                          containerStyle={[
                            styles.container_input, 
                          ]}
                          inputContainerStyle={[
                            styles.border_bottom_dark_input,
                          ]}
                          placeholderTextColor={placeholderTextColor}
                          onChangeText={handleChange('senha')}
                          handleBlur={handleBlur('senha')}
                          value={values.senha}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(confirmaSenhaInput != null) {confirmaSenhaInput.focus()} }}
                          blurOnSubmit={false}
                          
                          />

                        {(errors.senha && touched.senha) && <Text style={[styles.error_dark_minor_text]}>{errors.senha}</Text>}

                      </View>

                    </View>

                    {/* Confirmar Senha */}
                    <View style={[styles.margin_bottom_32]}>

                      <View>
                        <Text style={[styles.bold_black_text, styles.white_text]}>Confirmar senha:</Text>
                      </View>

                      <View>
                      
                        <Input
                          ref={(input) => { setConfirmaSenhaInput(input) }}
                          name='confirmarSenha'
                          placeholder='Confirme a senha'
                          secureTextEntry={true}
                          inputStyle={styles.dark_text_input}
                          containerStyle={[
                            styles.container_input, 
                          ]}
                          inputContainerStyle={[
                            styles.border_bottom_dark_input,
                          ]}
                          placeholderTextColor={placeholderTextColor}
                          onChangeText={handleChange('confirmarSenha')}
                          handleBlur={handleBlur('confirmarSenha')}
                          value={values.confirmarSenha}
                          returnKeyType="go"
                          onSubmitEditing={(event) => handleSubmit()}
                          />

                        {(errors.confirmarSenha && touched.confirmarSenha) && <Text style={[styles.error_dark_minor_text]}>{errors.confirmarSenha}</Text>}

                      </View>

                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={[styles.orange_button]}>

                            {(!props.isLoading) && 
                              <Text style={styles.text_orange_button}>
                                Cadastrar-se
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
        </View> 
      </KeyboardAvoidingView>

    )
}
