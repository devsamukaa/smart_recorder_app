import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './CadastroContaEnergiaStyle'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { CustomParses } from '../../../utils/CustomParses';

export default CadastroContaEnegiaView = (props) => {

    const [vencimentoContaInput, setVencimentoContaInput] = useState(null)
    const [totalPagoInput, setTotalPagoInput] = useState(null)
    const [totalTributosInput, setTotalTributosInput] = useState(null)

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const placeholderTextColor = '#acb6fd';

    const formValidationSchema = yup.object().shape({
      consumoMes: yup
        .number()
        .positive()
        .required('Insira o consumo do mês'),
      vencimentoConta: yup
        .date()
        .transform(CustomParses.parseDateString)
        .typeError('Digite uma data válida')
        .required('Insira uma data'),
      totalPago: yup
        .number()
        .transform(CustomParses.parseCurrencyString)
        .positive()
        .required('Insira o total a pagar'),
      totalTributos: yup
        .number()
        .transform(CustomParses.parseCurrencyString)
        .positive()
        .required('Insira o total dos tributos')
    });

    const initializeFormik = props.action == 'editar' ?
    {
      consumoMes: props.userInfos.contaLuz.kwhConta, 
      vencimentoConta: CustomParses.parseDateWithZeroHoursToString(props.userInfos.contaLuz.dataValidade), 
      totalPago: props.userInfos.contaLuz.valorPago, 
      totalTributos: props.userInfos.contaLuz.valorTributos,
    } :
    {consumoMes: '', vencimentoConta: '', totalPago: '', totalTributos: ''};
    

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
                  Preencha as informações abaixo com os dados da sua Conta de Energia <Text style={styles.bold_black_text}>mais recente</Text>:
                </Text>
              </View>

              <Formik
                validationSchema={formValidationSchema}
                initialValues={
                  initializeFormik
                }
                onSubmit={values => props.cadastraConta(values)}>

                {({ 
                  handleChange, 
                  handleBlur, 
                  handleSubmit, 
                  values,
                  errors,
                  touched,
                  isValid,
                  
                  }) => (
                  <>
                    {/* Consumo do mês (kWh) */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text]}>Consumo do mês (kWh):</Text>
                      </View>

                      <View>

                        <TextInputMask
                          name='consumoMes'
                          placeholder='Ex: 133'
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          type={'only-numbers'}
                          value={values.consumoMes}
                          onChangeText={handleChange('consumoMes')}
                          handleBlur={handleBlur('consumoMes')}
                          autoFocus={true}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(vencimentoContaInput != null) {vencimentoContaInput.focus()} }}
                          blurOnSubmit={false}
                        />

                        {(errors.consumoMes && touched.consumoMes) && <Text style={[styles.error_minor_text,]}>{errors.consumoMes}</Text>}
                        
                      </View>

                    </View>

                    {/* Vencimento da conta */}
                    <View style={[styles.margin_bottom_16]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Vencimento da conta:</Text>
                      </View>

                      <View>

                        <TextInputMask
                          refInput={(input) => { setVencimentoContaInput(input) }}
                          name='vencimentoConta'
                          placeholder='Ex: 26/08/2021'
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          type={'datetime'}
                          options={{
                            format: 'DD/MM/YYYY'
                          }}
                          value={values.vencimentoConta}
                          onChangeText={handleChange('vencimentoConta')}
                          handleBlur={handleBlur('vencimentoConta')}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(totalPagoInput != null) {totalPagoInput.focus()} }}
                          blurOnSubmit={false}
                          />

                        {(errors.vencimentoConta && touched.vencimentoConta) && <Text style={[styles.error_minor_text]}>{errors.vencimentoConta}</Text>}
                        
                      </View>

                    </View>

                    {/* Total Pago */}
                    <View style={[styles.margin_bottom_16]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Total a pagar:</Text>
                      </View>

                      <View>
                      
                        <TextInputMask
                          refInput={(input) => { setTotalPagoInput(input) }}
                          name='totalPago'
                          placeholder='Ex: R$ 112,31'
                          options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$ ',
                            suffixUnit: ''
                          }}
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          type={'money'}
                          value={values.totalPago}
                          onChangeText={handleChange('totalPago')}
                          handleBlur={handleBlur('totalPago')}
                          returnKeyType="next"
                          onSubmitEditing={() => { if(totalTributosInput != null) {totalTributosInput.focus()} }}
                          blurOnSubmit={false}
                        />

                        {(errors.totalPago && touched.totalPago) && <Text style={[styles.error_minor_text,]}>{errors.totalPago}</Text>}
                        
                      </View>

                    </View>

                    {/* Valor Total Tributos */}
                    <View style={[styles.margin_bottom_32]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Total dos tributos:</Text>
                      </View>

                      <View>
                      
                        <TextInputMask
                          refInput={(input) => { setTotalTributosInput(input) }}
                          name='totalTributos'
                          placeholder='Ex: R$ 14,89'
                          options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$ ',
                            suffixUnit: ''
                          }}
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                          ]}
                          type={'money'}
                          value={values.totalTributos}
                          onChangeText={handleChange('totalTributos')}
                          handleBlur={handleBlur('totalTributos')}
                          returnKeyType='go'
                          onSubmitEditing={(event) => handleSubmit()}
                        />

                        {(errors.totalTributos && touched.totalTributos) && <Text style={[styles.error_minor_text,]}>{errors.totalTributos}</Text>}

                      </View>

                    </View>

                    <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                        <View style={[
                            styles.orange_button
                            ]}>

                            {(!props.isLoading) && 
                              <Text style={styles.text_orange_button}>
                                {props.action == 'editar' && 'Atualizar'}
                                {props.action != 'editar' && 'Cadastrar'}
                              </Text>
                            }
                            {(props.isLoading) && <ActivityIndicator color='#020C53' />}
                            
                        </View>                             
                    </TouchableOpacity>
                  </>
                )}

              </Formik>
              
              {/* Input para textos sem formatação */}
              {/* <Input
                    placeholder='Ex: 133'
                    inputStyle={styles.light_text_input}
                    containerStyle={[
                      styles.container_input, 
                      styles.margin_bottom_16,
                    ]}
                    inputContainerStyle={[
                      styles.border_bottom_light_input,
                    ]}
                    placeholderTextColor={placeholderTextColor}

                    
                    // onChangeText={text => {
                    //     props.setEmail(text);
                    // }}

                    // onFocus = {() => {props.callbackOnFocus()}}
                    // value={props.email}
                    
                    /> */}

            </View>
          </ScrollView>

          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="conta"
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
