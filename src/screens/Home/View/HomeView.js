import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import { Formik } from 'formik';
import * as yup from 'yup';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import customStyles from './HomeStyle';
import styles from '../../../components/GlobalStyle/GlobalStyle';
import { MaskService } from 'react-native-masked-text';

export default HomeView = (props) => {

    const [kwhRelogioInput, setKwhRelogioInput] = useState(null);

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const placeholderTextColor = '#acb6fd';

    const renderDialogCadastrarConta = () => {
      return (
        <View>
          <View style={customStyles.conatiner_top_text}>
            <Text style={[customStyles.top_text]}>Para habilitar o cálculo do consumo precisamos saber alguns dados da sua conta de energia mais atual </Text>
          </View>
          <TouchableOpacity onPress={() => props.goTo("CadastroContaEnergia")}>
            <View style={[styles.orange_button, customStyles.premium_button]}>
                <Text style={styles.text_orange_button}>Cadastrar conta de energia</Text>
            </View>                             
          </TouchableOpacity>
        </View>
      )
    }


    const renderCalculoResult = () => {

      let custo = 'R$ 0,00';
      let kwh = '0 kWh';

      if(props.userInfos.consumo != null) {
        custo = MaskService.toMask('money', props.userInfos.consumo.custo, {
          unit: 'R$ ',
          separator: ',',
          delimiter: '.'
        });

        kwh = props.userInfos.consumo.kwh + ' kWh'
      }
      
      return(
        <View>
        <View style={customStyles.conatiner_top_text}>
          <Text style={[customStyles.text_result, styles.text_align_center]}>{custo}</Text>
        </View>
        <View style={customStyles.conatiner_top_text}>
          <Text style={[customStyles.text_kwh_result, styles.text_align_center]}>{kwh}</Text>
        </View>
      </View>
      )
    }


    const renderCalculoConsumo = () => {

      const formValidationSchema = yup.object().shape({
        kwhUltimaConta: yup
          .number()
          .positive()
          .required('Insira a leitura da última conta'),
        kwhRelogio: yup
          .number()
          .positive()
          .moreThan(yup.ref('kwhUltimaConta'), 'Este valor deve ser maior que o anterior')
          .required('Insira o valor do relógio de luz'),
      });

      return(
        <View>

          <View style={styles.conatiner_top_text}>
            <Text style={[styles.bold_orange_high_text]}>Cálculo do Consumo: </Text>
          </View>
          
          <Formik
            validationSchema={formValidationSchema}
            initialValues={
              {kwhUltimaConta: '', kwhRelogio: '',}
            }
            onSubmit={values => props.cadastraMedicao(values)}>

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
                  <View style={[styles.margin_bottom_16]}>
                    <View style={styles.conatiner_top_text}>
                      <Text style={[styles.black_text]}>Insira a <Text style={{fontFamily: 'Montserrat-Bold'}}>Leitura Atual</Text> da última conta recebida:</Text>
                    </View>
                    
                    <TextInputMask
                      name='kwhUltimaConta'
                      placeholder='Ex: 29182'
                      placeholderTextColor={placeholderTextColor}
                      style={[
                        styles.light_text_input, 
                        styles.container_input,
                        styles.border_bottom_light_input,
                      ]}
                      type={'only-numbers'}
                      value={values.kwhUltimaConta}
                      onChangeText={handleChange('kwhUltimaConta')}
                      handleBlur={handleBlur('kwhUltimaConta')}
                      returnKeyType="next"
                      onSubmitEditing={() => { if(kwhRelogioInput != null) {kwhRelogioInput.focus()} }}
                      blurOnSubmit={false}
                    />
                    {(errors.kwhUltimaConta && touched.kwhUltimaConta) && <Text style={[styles.error_minor_text,]}>{errors.kwhUltimaConta}</Text>}
                  </View>

                  <View style={[styles.margin_bottom_32]}>
                    <View style={styles.conatiner_top_text}>
                      <Text style={[styles.black_text]}>Insira o valor do <Text style={{fontFamily: 'Montserrat-Bold'}}>Relógio de Luz</Text>:</Text>
                    </View>
                    
                    <TextInputMask
                      refInput={(input) => { setKwhRelogioInput(input) }}
                      name='kwhRelogio'
                      placeholder='Ex: 29382'
                      placeholderTextColor={placeholderTextColor}
                      style={[
                        styles.light_text_input, 
                        styles.container_input,
                        styles.border_bottom_light_input,
                      ]}
                      type={'only-numbers'}
                      value={values.kwhRelogio}
                      onChangeText={handleChange('kwhRelogio')}
                      handleBlur={handleBlur('kwhRelogio')}
                      returnKeyType='go'
                      onSubmitEditing={(event) => handleSubmit()}
                    />
                    {(errors.kwhRelogio && touched.kwhRelogio) && <Text style={[styles.error_minor_text,]}>{errors.kwhRelogio}</Text>}
                  </View>

                  <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                    <View style={[styles.blue_button, customStyles.premium_button]}>

                        {(!props.isLoading) && <Text style={styles.text_blue_button}>Calcular</Text>}
                        {(props.isLoading) && <ActivityIndicator color='#fff' />}

                    </View>                             
                  </TouchableOpacity>
                </>
              )}

          </Formik>

          {(props.userInfos.consumo != null) && renderCalculoResult()}
          
        </View>
      )
    }

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
              
              {(props.userInfos.contaLuz == null) && renderDialogCadastrarConta()}

              {(props.userInfos.contaLuz != null) && renderCalculoConsumo()}

            </View>
          </ScrollView>

          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="home"
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
