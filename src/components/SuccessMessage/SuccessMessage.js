import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './SuccessMessageStyle'
import globalStyle from '../GlobalStyle/GlobalStyle';

export default SuccessMessage = (props) => {

    //Chamando apos o carregamento do componente
    
    const renderSuccessMessage = () => {

        let styleSuccessMessage = {display: 'none'};
    
        if(props.isShowingSuccessMessage) {
            styleSuccessMessage.display = 'flex';
        }
    
        return (<View style={[styles.container_success_message, styleSuccessMessage]}>
                    <Text style={styles.text_success_message}>
                        {props.successMessage}
                    </Text>
                    <Icon 
                        name='times'
                        type='font-awesome'
                        color='#20D489'
                        onPress={props.hideSuccessMessage}
                    />
                </View>);
    }
 
    return renderSuccessMessage();
}