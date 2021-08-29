import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native'; 
import styles from './SideMenuStyle' 

export default SideMenuView = (props) => {
        
    const logoSrc = require ('../../../assets/images/home-gotech-logo.png');

      return (
        //Chamando o View e montando o menu
        <View style={styles.container} >
        
          <View style={styles.container_logo}>
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={logoSrc} />
          </View>
          <View style={styles.navSectionStyle}>
              <TouchableOpacity onPress={props.navigateToScreen('Home')} >
                  <View style={styles.navItemStyle}>
                      <Text style={styles.navItemTitleStyle}>Home</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.navigateToScreen('Login')}>
                  <View style={styles.navItemStyle}>
                      <Text style={styles.navItemTitleStyle} >Logoff</Text>
                  </View>
              </TouchableOpacity>
          </View>
        </View>
      )
  }
