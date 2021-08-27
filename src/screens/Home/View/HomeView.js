import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
import { Formik } from 'formik';
import * as yup from 'yup';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import customStyles from './HomeStyle';
import styles from '../../../components/GlobalStyle/GlobalStyle';
import { CustomParses } from '../../../utils/CustomParses';
import {format} from 'date-fns';

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
          <View style={styles.margin_bottom_16}>
            <Text style={[styles.black_text_18, styles.margin_bottom_16]}>Para habilitar o cálculo do consumo precisamos saber alguns dados da sua conta de energia mais atual. </Text>
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

      let custoTotal = 'R$ 0,00';
      let kwh = '0 kWh';

      if(props.userInfos.consumo != null) {
        custoTotal = CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoTotal);
        kwh = props.userInfos.consumo.kwh + ' kWh';
      }
      
      return(
      <View>
        <View style={styles.margin_bottom_16}>
          <Text style={[customStyles.text_result, styles.text_align_center]}>{custoTotal}</Text>
        </View>
        <View style={styles.margin_bottom_16}>
          <Text style={[customStyles.text_kwh_result, styles.text_align_center]}>{kwh}</Text>
        </View>

        <View style={styles.margin_bottom_16}>
          <Text style={[customStyles.text_date_result, styles.text_align_center]}>{format(new Date(props.userInfos.consumo.dataMedicao), 'dd/MM/yyyy hh:mm:ss')}</Text>
        </View>
        
        <Text 
          style={[
            styles.padding_vertical_8,
            styles.width_100,
            styles.black_text_18,
            styles.text_align_center,
            styles.border_top_blue,
          ]}>
          Detalhes
        </Text>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaHeader]}>Descrição do produto</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaHeader]}>%{"\n"}ICMS</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaHeader]}>R${"\n"}ICMS</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaHeader]}>Total{"\n"}c/ ICMS</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaBody]}>USO SIST. DISTR. (TUSD)</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaBody]}>{props.userInfos.consumo.icms}%</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoUsoSistDistribuicaoIcms)}</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoUsoSistDistribuicaoTotal)}</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaBody]}>ENERGIA (TE)</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaBody]}>{props.userInfos.consumo.icms}%</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoEnergiaTeIcms)}</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoEnergiaTeTotal)}</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaBody]}>ADICIONAL BANDEIRA {props.userInfos.consumo.bandeira.nome.toUpperCase()}</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaBody]}>{props.userInfos.consumo.icms}%</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoAdicionalBandeiraIcms)}</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoAdicionalBandeiraTotal)}</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaBody]}>PIS/PASEP</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaBody]}>{props.userInfos.consumo.icms}%</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoPisPasepIcms)}</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoPisPasepTotal)}</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaBody]}>COFINS</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaBody]}>{props.userInfos.consumo.icms}%</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoCofinsIcms)}</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoCofinsTotal)}</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaBody]}>CIP/COSIP</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaBody]}>0%</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaBody]}>R$ 0,00</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaBody]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoCipCosip)}</Text>
        </View>

        <View style={[
          styles.width_100,
          styles.padding_vertical_8,
          styles.border_top_blue,
          styles.flex_direction_row,
          customStyles.linha,
        ]}>
          <Text style={[customStyles.colunaItem, customStyles.colunaHeader]}>Total geral</Text>
          <Text style={[customStyles.colunaAliqIcms, customStyles.colunaHeader]}>N/A</Text>
          <Text style={[customStyles.colunaIcms, customStyles.colunaHeader]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.totalTributos)}</Text>
          <Text style={[customStyles.colunaValor, customStyles.colunaHeader]}>{CustomParses.parseDoubleToCurrency(props.userInfos.consumo.custoTotal)}</Text>
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

      const initializeFormik = props.userInfos.hasOwnProperty("consumo") ?
      {
        kwhUltimaConta: props.userInfos.consumo.kwhUltimaConta, 
        kwhRelogio: props.userInfos.consumo.kwhRelogio,
      } :
      {kwhUltimaConta: '', kwhRelogio: ''};

      return(
        <View>

          <View style={styles.conatiner_top_text, styles.margin_bottom_16}>
            <Text style={[styles.bold_orange_high_text]}>Descubra quanto irá pagar na conta de luz agora mesmo!</Text>
          </View>
          
          <Formik
            validationSchema={formValidationSchema}
            initialValues={
              initializeFormik
            }
            onSubmit={values => props.cadastraMedicao(values)}>

            {({ 
              handleChange, 
              handleBlur, 
              handleSubmit, 
              values,
              errors,
              touched,
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

                  <TouchableOpacity onPress={handleSubmit}>
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

              <View>
                <Text style={[styles.black_text_20, styles.margin_bottom_24]}>
                  Olá<Text style={[styles.bold_black_text_20]}> {props.userInfos.hasOwnProperty("password") ? props.userInfos.nome.toString().split(' ')[0] : ""}</Text>! 😁✌️
                </Text>
              </View>
              
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
