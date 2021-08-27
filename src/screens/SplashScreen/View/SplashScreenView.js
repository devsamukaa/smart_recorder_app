import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import customStyle from './SplashScreenStyle'
import GeneralStatusBarColor from '../../../components/GeneralStatusBararColor/GeneralStatusBarColor';

export default SplashScreenView = (props) => {

    useEffect(() => {

        return () => {
            
        }
    }, [])

    const logoSrc = require ('../../../assets/images/home-gotech-logo.png');
    
    return (

        <View style={customStyle.container}>
            <GeneralStatusBarColor backgroundColor="#020C53" barStyle="light-content"/>
        
            <View style={customStyle.container_logo}>
                <Image
                    style={customStyle.logo}
                    resizeMode='contain'
                    source={logoSrc} />
            </View>

        </View>
    );
}