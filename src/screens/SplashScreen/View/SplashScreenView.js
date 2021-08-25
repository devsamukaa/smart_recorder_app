import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import styles from './SplashScreenStyle'
import GeneralStatusBarColor from '../../../components/GeneralStatusBararColor/GeneralStatusBarColor';

export default SplashScreenView = (props) => {

    useEffect(() => {

        return () => {
            
        }
    }, [])

    const logoSrc = require ('../../../assets/images/home-gotech-logo.png');
    
    return (

        <View style={styles.container}>
            <GeneralStatusBarColor backgroundColor="#020C53" barStyle="light-content"/>
        
            <View style={styles.container_logo}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={logoSrc} />
            </View>

        </View>
    );
}