import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './ErrorMessageStyle'
import globalStyle from '../GlobalStyle/GlobalStyle';

export default ErrorMessage = (props) => {

    //Chamando apos o carregamento do componente
    useEffect(() => {

        console.log("BottomMenuView", props.userInfos);

    }, [props.userInfos]);
    
    const renderMessageError = () => {

        let styleMessageError = {display: 'none'};
    
        if(props.isShowingMessageError) {
            styleMessageError.display = 'flex';
        }
    
        return (<View style={[styles.container_error_message, styleMessageError]}>
                    <Text style={styles.text_error_message}>
                        {props.messageError}
                    </Text>
                    <Icon 
                        name='times'
                        type='font-awesome'
                        color='#F1416C'
                        onPress={props.hideMessageError}
                    />
                </View>);
    }
 
    return renderMessageError();
}