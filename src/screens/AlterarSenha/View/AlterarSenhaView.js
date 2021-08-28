import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import {Input} from 'react-native-elements';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './AlterarSenhaStyle'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { CustomParses } from '../../../utils/CustomParses';

export default AlterarSenhaView = (props) => {

    const [novaSenhaInput, setNovaSenhaInput] = useState(null);
    const [confirmacaoSenhaInput, setConfirmacaoSenhaInput] = useState(null);

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const placeholderTextColor = '#acb6fd';

    const formValidationSchema = yup.object().shape({
      senha: yup
        .string()
        .min(6, ({ min }) => `A senha precisa ter um minimo de ${min} caracteres`)
        .required('Insira a senha'),
      novaSenha: yup
        .string()
        .min(6, ({ min }) => `A nova senha precisa ter um minimo de ${min} caracteres`)
        .required('Insira a nova senha'),
      confirmacaoSenha: yup
        .string()
        .oneOf([yup.ref('novaSenha')], 'As senhas não coincidem')
        .required('Confirme a nova senha'),
    });

    const initializeFormik = {senha: '', novaSenha: '', confirmacaoSenha: ''};
    

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
                  Preencha as informações abaixo para atualizar a sua senha.
                </Text>
              </View>

              <Formik
                validationSchema={formValidationSchema}
                initialValues={
                  initializeFormik
                }
                onSubmit={values => props.alterarSenha(values)}>

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
                    <View style={[styles.margin_bottom_32]}>

                      <View>
                        <Text style={[styles.bold_black_text]}>Senha Atual:</Text>
                      </View>

                      <View>

                        <Input
                          name='senha'
                          placeholder='Sua senha atual'
                          secureTextEntry={true}
                          placeholderTextColor={placeholderTextColor}
                          inputStyle={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          containerStyle={styles.padding_horizontal_0}
                          value={values.senha}
                          onChangeText={handleChange('senha')}
                          handleBlur={handleBlur('senha')}
                          autoFocus={true}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(novaSenhaInput != null) {novaSenhaInput.focus()} }}
                          blurOnSubmit={false}
                        />

                        {(errors.senha && touched.senha) && <Text style={[styles.error_minor_text,]}>{errors.senha}</Text>}
                        
                      </View>

                    </View>

                    {/* Vencimento da conta */}
                    <View style={[styles.margin_bottom_16]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Nova Senha:</Text>
                      </View>

                      <View>

                        <Input
                          ref={(input) => { setNovaSenhaInput(input) }}
                          name='novaSenha'
                          placeholder='Insira a nova senha'
                          secureTextEntry={true}
                          placeholderTextColor={placeholderTextColor}
                          inputStyle={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          containerStyle={styles.padding_horizontal_0}
                          value={values.novaSenha}
                          onChangeText={handleChange('novaSenha')}
                          handleBlur={handleBlur('novaSenha')}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(confirmacaoSenhaInput != null) {confirmacaoSenhaInput.focus()} }}
                          blurOnSubmit={false}
                        />

                        {(errors.novaSenha && touched.novaSenha) && <Text style={[styles.error_minor_text]}>{errors.novaSenha}</Text>}
                        
                      </View>

                    </View>

                    {/* Total Pago */}
                    <View style={[styles.margin_bottom_32]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Confirme a nova senha:</Text>
                      </View>

                      <View>

                        <Input
                          ref={(input) => { setConfirmacaoSenhaInput(input) }}
                          name='confirmacaoSenha'
                          placeholder='Confirme a nova senha'
                          secureTextEntry={true}
                          placeholderTextColor={placeholderTextColor}
                          inputStyle={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          containerStyle={styles.padding_horizontal_0}
                          value={values.confirmacaoSenha}
                          onChangeText={handleChange('confirmacaoSenha')}
                          handleBlur={handleBlur('confirmacaoSenha')}
                          returnKeyType="go"
                          onSubmitEditing={(event) => handleSubmit()}
                        />

                        {(errors.confirmacaoSenha && touched.confirmacaoSenha) && <Text style={[styles.error_minor_text,]}>{errors.confirmacaoSenha}</Text>}
                        
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
