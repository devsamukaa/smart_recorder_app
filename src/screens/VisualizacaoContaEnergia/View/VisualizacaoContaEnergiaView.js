import React from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './VisualizacaoContaEnergiaStyle'
import { format , addDays } from 'date-fns';
import { MaskService } from 'react-native-masked-text';
import { CustomParses } from '../../../utils/CustomParses';

export default VisualizacaoContaEnergiaView = (props) => {

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    const dataVencimentoConta = format( addDays(new Date(props.userInfos.contaLuz.dataValidade), 1), 'dd');
    
    const valorKwh = (props.userInfos.contaLuz.valorPago - props.userInfos.contaLuz.valorTributos) / props.userInfos.contaLuz.kwhConta
    const valorKwhFormatado = MaskService.toMask('money', valorKwh, {
      unit: 'R$ ',
      separator: ',',
      delimiter: '.'
    });

    const valorCip = props.userInfos.contaLuz.valorCip;
    const valorCipFormatado = MaskService.toMask('money', valorCip, {
      unit: 'R$ ',
      separator: ',',
      delimiter: '.'
    });
    
    const dataUltimaAtualizacao = CustomParses.parseDateWithZeroHoursToString(props.userInfos.contaLuz.dataRegistro);

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        <View style={styles.container_app}> 
          <ScrollView style={styles.container_scroll_screen}>
            <View style={styles.internal_container}>

              <View style={styles.margin_bottom_24}>
                <Text style={[styles.bold_black_text_22, styles.margin_bottom_16]}>Dados da Conta:</Text>
                
                <View style={[customStyles.container_labels, styles.margin_bottom_8]}>
                  <Text style={[styles.bold_black_text_18]}>Dia de vencimento:</Text>
                  <Text style={[styles.black_text_18]}>{dataVencimentoConta} de cada mês</Text>
                </View>
                
                <View style={[customStyles.container_labels, styles.margin_bottom_8]}>
                  <Text style={[styles.bold_black_text_18]}>Valor por kWh:</Text>
                  <Text style={[styles.black_text_18]}>{valorKwhFormatado}</Text>
                </View>

                <View style={[customStyles.container_labels, styles.margin_bottom_8]}>
                  <Text style={[styles.bold_black_text_18]}>Valor do CIP/COSIP:</Text>
                  <Text style={[styles.black_text_18]}>{valorCipFormatado}</Text>
                </View>
                
                <View style={[customStyles.container_labels]}>
                  <Text style={[styles.bold_black_text_18]}>Última atualização:</Text>
                  <Text style={[styles.black_text_18]}>{dataUltimaAtualizacao}</Text>
                </View>
              </View>

              <View style={[styles.margin_bottom_24, {display: 'none'}]}>
                <Text style={[
                  styles.bold_black_text_22, 
                  styles.text_align_center,]}>
                  Consumo Atual
                </Text>
                <Text style={[
                  styles.text_align_center, 
                  styles.margin_bottom_8]}>
                  (último valor calculado)
                </Text>

                <Text style={[customStyles.money_text, styles.bold_black_text_22, styles.text_align_center]}>
                  R$ 98,12
                </Text>

                <Text style={[customStyles.kwh_text, styles.black_text_20, styles.text_align_center]}>
                  125 kWh
                </Text>
              </View>

              <TouchableOpacity style={styles.margin_bottom_32}>
                <View style={[
                    styles.orange_button
                    ]}>

                    <Text style={styles.text_orange_button}>Entenda sua conta</Text>
                    
                </View>                             
              </TouchableOpacity>

              <View style={[styles.margin_bottom_24]}>
                    
                <Text style={[customStyles.money_text, styles.black_text_18]}>
                  Você também pode atualizar os valores da conta sempre que desejar:
                </Text>

              </View>

              <TouchableOpacity style={styles.margin_bottom_32} onPress={() => props.goTo('CadastroContaEnergia', 'editar')}>
                <View style={[
                    styles.blue_button
                    ]}>

                    <Text style={styles.text_blue_button}>Atualizar dados da conta</Text>
                    
                </View>                             
              </TouchableOpacity>

            </View>
          </ScrollView>

          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="conta" //apagar caso seja uma tela que não represente um ícone de baixo
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
