import React, {useState} from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../../../components/GlobalStyle/GlobalStyle';
import customStyles from './CadastroContaEnergiaStyle';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { CustomParses } from '../../../utils/CustomParses';
import MoreInfos from '../../../components/MoreInfos/MoreInfos';

export default CadastroContaEnegiaView = (props) => {

    const [imageSrc, setImageSrc] = useState(require('../../../assets/images/consumo_mes.jpg'));
    const [description, setDescription] = useState('');
    const [isShowingMoreInfos, setShowingMoreinfos] = useState(false);

    const [vencimentoContaInput, setVencimentoContaInput] = useState(null)
    const [totalPagoInput, setTotalPagoInput] = useState(null)
    const [totalTributosInput, setTotalTributosInput] = useState(null)
    const [valorCipInput, setValorCipInput] = useState(null)

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const showMoreInfos = (imageSrcParam, descriptionParam) => {

      setImageSrc(imageSrcParam);
      setDescription(descriptionParam);
      setShowingMoreinfos(true);
      
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
        .required('Insira o total dos tributos'),
      valorCip: yup
        .number()
        .transform(CustomParses.parseCurrencyString)
        .positive()
        .required('Insira o valor do CIP ou COSIP de sua cidade')
    });

    const initializeFormik = props.action == 'editar' ?
    {
      consumoMes: props.userInfos.contaLuz.kwhConta, 
      vencimentoConta: CustomParses.parseDateWithZeroHoursToString(props.userInfos.contaLuz.dataValidade), 
      totalPago: props.userInfos.contaLuz.valorPago, 
      totalTributos: props.userInfos.contaLuz.valorTributos,
      valorCip: props.userInfos.contaLuz.valorCip,
    } :
    {consumoMes: '', vencimentoConta: '', totalPago: '', totalTributos: '', valorCip: ''};

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        
        <MoreInfos 
          imageSrc = {imageSrc}
          description = {description}
          isShowingMoreInfos = {isShowingMoreInfos}
          setShowingMoreinfos = {setShowingMoreinfos}
        />

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
                  
                  }) => (
                  <>
                    {/* Consumo do mês (kWh) */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text]}>Consumo do mês (kWh):</Text>
                      </View>

                      <View>

                        <View 
                        style={[
                          styles.flex_direction_row,
                          styles.flex_justify_center,
                          styles.flex_align_items_center,
                        ]}>

                        <TextInputMask
                          name='consumoMes'
                          placeholder='Ex: 133'
                          placeholderTextColor={placeholderTextColor}
                          style={[
                            styles.light_text_input, 
                            styles.container_input,
                            styles.border_bottom_light_input,
                            styles.flex_grow,
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
                        <Icon 
                          name='question'
                          type='font-awesome'
                          color='#020C53'
                          onPress={() => {
                            showMoreInfos(
                              require ('../../../assets/images/consumo_mes.jpg'),
                              <>O <Text style={[styles.bold_black_text_20]}>Consumo do mês</Text> é localizado na área central da conta, na esquerda, dentro de uma tabela com o título "Dados de Medição".</>
                            );
                          }}
                          iconStyle={[styles.padding_all_8]}
                        />
                      </View>

                        {(errors.consumoMes && touched.consumoMes) && <Text style={[styles.error_minor_text,]}>{errors.consumoMes}</Text>}
                        
                      </View>

                    </View>

                    {/* Vencimento da conta */}
                    <View style={[styles.margin_bottom_16]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Vencimento da conta:</Text>
                      </View>

                      <View>
                        
                        <View 
                          style={[
                            styles.flex_direction_row,
                            styles.flex_justify_center,
                            styles.flex_align_items_center,
                          ]}>

                          <TextInputMask
                            refInput={(input) => { setVencimentoContaInput(input) }}
                            name='vencimentoConta'
                            placeholder='Ex: 26/08/2021'
                            placeholderTextColor={placeholderTextColor}
                            style={[
                              styles.light_text_input, 
                              styles.container_input,
                              styles.border_bottom_light_input,
                              styles.flex_grow,
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
                            <Icon 
                              name='question'
                              type='font-awesome'
                              color='#020C53'
                              onPress={() => {
                                showMoreInfos(
                                  require ('../../../assets/images/vencimento.jpg'),
                                  <>O <Text style={[styles.bold_black_text_20]}>Vencimento</Text> é localizado na área superior da conta, na direita, dentro de uma tabela com o título "Dados da Conta".</>
                                );
                              }}
                              iconStyle={[styles.padding_all_8]}
                            />
                        </View>

                        {(errors.vencimentoConta && touched.vencimentoConta) && <Text style={[styles.error_minor_text]}>{errors.vencimentoConta}</Text>}
                        
                      </View>

                    </View>

                    {/* Total Pago */}
                    <View style={[styles.margin_bottom_16]}>

                      <View style={[]}>
                        <Text style={[styles.bold_black_text]}>Total a pagar:</Text>
                      </View>

                      <View>
                          
                        <View 
                        style={[
                          styles.flex_direction_row,
                          styles.flex_justify_center,
                          styles.flex_align_items_center,
                        ]}>
                      
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
                              styles.flex_grow,
                            ]}
                            type={'money'}
                            value={values.totalPago}
                            onChangeText={handleChange('totalPago')}
                            handleBlur={handleBlur('totalPago')}
                            returnKeyType="next"
                            onSubmitEditing={() => { if(totalTributosInput != null) {totalTributosInput.focus()} }}
                            blurOnSubmit={false}
                          />
                          <Icon 
                            name='question'
                            type='font-awesome'
                            color='#020C53'
                            onPress={() => {
                              showMoreInfos(
                                require ('../../../assets/images/total_a_pagar.jpg'),
                                <>O <Text style={[styles.bold_black_text_20]}>Total a Pagar</Text> é localizado na área superior da conta, na direita, dentro de uma tabela com o título "Dados da Conta".</>
                              );
                            }}
                            iconStyle={[styles.padding_all_8]}
                          />
                        </View>

                        {(errors.totalPago && touched.totalPago) && <Text style={[styles.error_minor_text,]}>{errors.totalPago}</Text>}
                        
                      </View>

                    </View>

                    {/* Valor Total Tributos */}
                    <View style={[styles.margin_bottom_16]}>

                      <View>
                        <Text style={[styles.bold_black_text]}>Total dos tributos:</Text>
                      </View>

                      <View>

                        <View 
                          style={[
                            styles.flex_direction_row,
                            styles.flex_justify_center,
                            styles.flex_align_items_center,
                          ]}>
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
                              styles.flex_grow,
                            ]}
                            type={'money'}
                            value={values.totalTributos}
                            onChangeText={handleChange('totalTributos')}
                            handleBlur={handleBlur('totalTributos')}
                            returnKeyType="next"
                            onSubmitEditing={() => { if(valorCipInput != null) {valorCipInput.focus()} }}
                            blurOnSubmit={false}
                          />
                          <Icon 
                            name='question'
                            type='font-awesome'
                            color='#020C53'
                            onPress={() => {
                              showMoreInfos(
                                require ('../../../assets/images/total_tributos.jpg'),
                                <>O <Text style={[styles.bold_black_text_20]}>Total dos Tributos</Text> é localizado na área inferior da conta. É um dos últimos campos nas letras menores, que são as "Descrições de Faturamento"</>
                              );
                            }}
                            iconStyle={[styles.padding_all_8]}
                          />
                        </View>

                        {(errors.totalTributos && touched.totalTributos) && <Text style={[styles.error_minor_text]}>{errors.totalTributos}</Text>}

                      </View>

                    </View>

                    {/* Valor CIP */}
                    <View style={[styles.margin_bottom_32]}>

                      <View>
                        <Text style={[styles.bold_black_text]}>Valor do CIP ou COSIP:</Text>
                      </View>

                      <View>
                      
                        <View 
                          style={[
                            styles.flex_direction_row,
                            styles.flex_justify_center,
                            styles.flex_align_items_center,
                          ]}>
                          <TextInputMask
                            refInput={(input) => { setValorCipInput(input) }}
                            name='valorCip'
                            placeholder='Ex: R$ 5,74'
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
                              styles.flex_grow,
                            ]}
                            type={'money'}
                            value={values.valorCip}
                            onChangeText={handleChange('valorCip')}
                            handleBlur={handleBlur('valorCip')}
                            returnKeyType='go'
                            onSubmitEditing={(event) => handleSubmit()}
                          />
                          <Icon 
                            name='question'
                            type='font-awesome'
                            color='#020C53'
                            onPress={() => {
                              showMoreInfos(
                                require ('../../../assets/images/valor_cip.jpg'),
                                <>O valor do <Text style={[styles.bold_black_text_20]}>CIP ou COSIP</Text> é localizado na área inferior da conta. É um dos últimos campos nas letras menores, que são as "Descrições de Faturamento".</>
                              );
                            }}
                            iconStyle={[styles.padding_all_8]}
                          />
                        </View>

                        {(errors.valorCip && touched.valorCip) && <Text style={[styles.error_minor_text,]}>{errors.valorCip}</Text>}

                      </View>

                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
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
