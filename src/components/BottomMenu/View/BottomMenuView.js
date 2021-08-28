import React, {useEffect} from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './BottomMenuStyle'

export default BottomMenuView = (props) => {

    //Chamando apos o carregamento do componente
    useEffect(() => {

    }, [props.userInfos]);

    const getStyles = (userInfos) => {
        let styles = {};

        if(userInfos.hasOwnProperty("password")) {
            if(userInfos.plano.cdPlano == 1) {
                styles.homeStyle = {
                    width: '33%',
                }
                styles.contaStyle = {
                    width: '34%',
                }
                styles.graficosStyle = {
                    display: 'none',
                }
                styles.metaStyle = {
                    display: 'none',
                }
                styles.configStyle = {
                    width: '33%',
                }
            } else {
                styles.homeStyle = {
                    width: '20%'
                }
                styles.contaStyle = {
                    width: '20%'
                };
                styles.graficosStyle = {
                    width: '20%'
                };
                styles.metaStyle = {
                    width: '20%'
                };
                styles.configStyle = {
                    width: '20%'
                };
            }
        }

        return styles;
    }

    const getCustomActiveBar = (activeBar) => {

        let customActiveBar = {};
        customActiveBar.homeActiveBar = {color: '#020C53', background: {backgroundColor: '#efefef'}};
        customActiveBar.contaActiveBar = {color: '#020C53', background: {backgroundColor: '#efefef'}};;
        customActiveBar.graficosActiveBar = {color: '#020C53', background: {backgroundColor: '#efefef'}};;
        customActiveBar.metaActiveBar = {color: '#020C53', background: {backgroundColor: '#efefef'}};;
        customActiveBar.configActiveBar = {color: '#020C53', background: {backgroundColor: '#efefef'}};;

        switch(activeBar){
            case "home":
                customActiveBar.homeActiveBar = {color: '#fcfcfc', background: {backgroundColor: '#020C53'}};
            break;
            case "conta":
                customActiveBar.contaActiveBar = {color: '#fcfcfc', background: {backgroundColor: '#020C53'}};
            break;
            case "graficos":
                customActiveBar.graficosActiveBar = {color: '#fcfcfc', background: {backgroundColor: '#020C53'}};
            break;
            case "meta":
                customActiveBar.metaActiveBar = {color: '#fcfcfc', background: {backgroundColor: '#020C53'}};
            break;
            case "config":
                customActiveBar.configActiveBar = {color: '#fcfcfc', background: {backgroundColor: '#020C53'}};
            break;
        }

        return customActiveBar;
    }

    const renderMenuItems = (userInfos, activeBar) => {

        let customStyles = getStyles(userInfos);
        let customActiveBar = getCustomActiveBar(activeBar);

        return (
            <View style={styles.container_inferior_menu}>

                <TouchableOpacity 
                    containerStyle={[customStyles.homeStyle, styles.touchable_item_menu]}
                    onPress={() => {props.goTo(activeBar, "home")}}>
                    <View style={[customActiveBar.homeActiveBar.background, styles.container_item_menu]}>
                    <Icon
                        name='home'
                        type='font-awesome'
                        color={customActiveBar.homeActiveBar.color}
                        iconStyle={styles.icon_style}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    containerStyle={[customStyles.contaStyle, styles.touchable_item_menu]}
                    onPress={() => {props.goTo(activeBar, "conta")}}>
                    <View style={[customActiveBar.contaActiveBar.background, styles.container_item_menu]}>
                    <Icon
                        name='wpforms'
                        type='font-awesome'
                        color={customActiveBar.contaActiveBar.color}
                        iconStyle={styles.icon_style}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    containerStyle={[customStyles.graficosStyle, styles.touchable_item_menu]}
                    onPress={() => {props.goTo(activeBar, "conta")}}>
                    <View style={[customActiveBar.graficosActiveBar.background, styles.container_item_menu]}>
                    <Icon
                        name='pie-chart'
                        type='font-awesome'
                        color={customActiveBar.graficosActiveBar.color}
                        iconStyle={styles.icon_style}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    containerStyle={[customStyles.metaStyle, styles.touchable_item_menu]}
                    onPress={() => {props.goTo(activeBar, "meta")}}>
                    <View style={[customActiveBar.metaActiveBar.background, styles.container_item_menu]}>
                    <Icon
                        name='dollar'
                        type='font-awesome'
                        color={customActiveBar.metaActiveBar.color}
                        iconStyle={styles.icon_style}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    containerStyle={[customStyles.configStyle, styles.touchable_item_menu]}
                    onPress={() => {props.goTo(activeBar, "config")}}>
                    <View style={[customActiveBar.configActiveBar.background, styles.container_item_menu]}>
                    <Icon
                        name='cogs'
                        type='font-awesome'
                        color={customActiveBar.configActiveBar.color}
                        iconStyle={styles.icon_style}
                        />
                    </View>
                </TouchableOpacity>

            </View>
        )

    }
 
    return renderMenuItems(props.userInfos, props.activeBar);
    
}
