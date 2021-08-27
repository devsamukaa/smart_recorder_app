import React from 'react';
import { KeyboardAvoidingView, View, Text, ScrollView } from 'react-native';
import BottomMenuController from '../../../components/BottomMenu/Controller/BottomMenuController';
import styles from '../../../components/GlobalStyle/GlobalStyle'
import customStyles from './EntendaSuaContaStyle'

export default EntendaSuaContaView = (props) => {

    //Adicionar padding somente para iOS
    let behavior = "";
    //Verifica se device é iOS
    if(Platform.OS === "ios"){
      behavior = "padding";
    }

    return (

      <KeyboardAvoidingView style={styles.container} behavior={behavior} enabled
                  keyboardVerticalOffset={100}>
        <View style={styles.container_app}> 
          <ScrollView style={styles.container_scroll_screen}>
            <View style={styles.internal_container}>

              <Text style={[styles.orange_text, styles.bold_black_text_18, styles.margin_bottom_8]}>
                Tarifas:
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Grupo A</Text> - São consumidores de alta tensão, que estão na faixa igual ou superior a 2,3kV. Esse grupo se refere aos grandes consumidores do setor eletrico.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Grupo B</Text> - São consumidores de baixa tensão, que estão na faixa inferior a 2,3Kv. O grupo B é dividido pelas seguintes classes: B1 - Classe residencial, B2 - Classe rural, B3 - Classe industrial, comercial, serviços públicos e poder público, e B4 -  Classe iluminação pública.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Tarifa pelo uso do Sistema de Distribuição (TUDS)</Text> - Valor relativo ao custo da rede de distribuição da concessionária e onde ela obtém a sua remuneração (lucro).
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Tarifa de Energia (TE)</Text> - valor cobrado ao consumidor.
              </Text>

              <Text style={[styles.orange_text, styles.bold_black_text_18, styles.margin_bottom_8]}>
                Bandeiras Tarifárias:
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                As bandeiras taifárias são utilizadas para comunicar o consumidor sobre os custos atuais de sua geração de energia. O objetivo é sincronizar os preços e custos, equilibrando o balanço das despesas das distribuidoras com a aquisição de energia e as tarifas cobradas aos consumidores, além de concientizar e fazer com que esses consumidores economizem energia e colaborem com a preservação do meio ambiente.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Bandeira Verde</Text> - Condições favoráveis  de geração de energia. A tarifa publicada não sofre nenhum aumento.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Bandeira Amarela</Text> - Condições de gerecão menos favoráveia. A tarifa publicada sofre um aumento de R$ 0,01874 por kWh consumido.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>Bandeira Vermelha</Text> - Condições mais custosas de geração. A tarifa publicada sofre um aumento de R$ 0,03971 (patamar 1) ou R$ 0,09492 (patamar 2) por kWh consumido.
              </Text>

              <Text style={[styles.orange_text, styles.bold_black_text_18, styles.margin_bottom_8]}>
                Tributos e encargos:
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>PIS</Text> - Ajuda completar a renda do governo para pagamento do seguro-desemprego, abono e participações dos órgãos e entidades tanto para trabalhadores públicos e privados. Atualmente é combrado 0,59% do seu consumo de energia.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>COFINS</Text> - Também tem colaboração de caráter social. É cobrado 2,71% do consumo de energia.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>ICMS</Text> - Tributo de caráter estadual, onde cada estado possui uma alíquota diferente. Na conta de luz ele representa a maior parcela de taxas para o consumidor.
              </Text>

              <Text style={[styles.black_text_18, styles.padding_horizontal_8, styles.margin_bottom_8]}>
                <Text style={[styles.bold_black_text_18]}>CIP/COSIP</Text> - Tributo que tem como objetivo arrecadar fundos para a instalação, manutenção e melhorias da iluminação de vias, rodovias, praças, ruas e demais bens públicos.
              </Text>
              
              
            </View>
          </ScrollView>

          <BottomMenuController 
            userInfos={props.userInfos} 
            activeBar="home" //apagar caso seja uma tela que não represente um ícone de baixo
            navigation={props.navigation}
            />
        </View> 
      </KeyboardAvoidingView>

    )
}
