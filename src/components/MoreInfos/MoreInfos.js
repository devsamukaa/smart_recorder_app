
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon , Image} from 'react-native-elements';
import customStyles from './MoreInfosStyle';
import styles from '../GlobalStyle/GlobalStyle';

export default MoreInfos = (props) => {

    const hideMoreInfos = () => {

        props.setShowingMoreinfos(false);

    }

    const imageSrc = require ('../../assets/images/consumo_mes.jpg');
    
    const renderMoreInfos = () => {

        let styleRenderMoreInfos = {display: 'none'};
    
        if(props.isShowingMoreInfos) {
            styleRenderMoreInfos.display = 'flex';
        }
    
        return (
            <View 
                style={[customStyles.container_more_infos, styleRenderMoreInfos]}>
                <ScrollView>
                <View style={[styles.width_100, styles.margin_bottom_8, {justifyContent:'flex-end', alignItems:'flex-end', marginTop: 8}]}>
                    <Icon 
                    name='times-circle'
                    type='font-awesome'
                    color='#fff'
                    onPress={() => hideMoreInfos()}
                    iconStyle={{fontSize:40, alignSelf: 'flex-end', marginBottom: 16}}
                    containerStyle={[{width: 40, height: 40}]}
                    />
                </View>
        
                <View style={customStyles.container_image}>
                    <Image
                        style={customStyles.image}
                        resizeMode='contain'
                        source={props.imageSrc} />
                </View>
        
                <View>
                    <Text style={[styles.black_text_18, styles.white_text, styles.text_align_center, {marginTop: 24}]}>
                        {props.description}
                    </Text>
                </View>
                </ScrollView>
        
            </View>
        )
    }
 
    return renderMoreInfos();
}

