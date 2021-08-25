import React from 'react';
import {
  View, Text, Dimensions
} from 'react-native';
import { Image } from 'react-native-elements';
import styles from './DetailsPlacesStyle'
//Importando MapView
import MapView, {Marker} from 'react-native-maps';

export default DetailsPlaceView = (props) => {    
    const win = Dimensions.get('window');

    //Montando a informação de endereço se possuir ou não o bairro
    let address = props.item.location.address;
    if(props.item.location.neighborhood !== undefined){
      address += " - " + props.item.location.neighborhood + " ";
    }     
    const address2 = props.item.location.city + "/" + props.item.location.state;
    const latitude = props.item.location.lat;
    const longitude = props.item.location.lng;

    return (
      // Adiciona o valor do behavior do Javascript 
      <View style={styles.container}> 
          <Image
              style={[{width: win.width, height: 200},styles.imageView]}
              resizeMode='contain'
              source={props.photo}
          /> 
          <View style={styles.textsView}>
            <Text style={styles.title}>{props.item.name}</Text>
            <Text style={styles.category}>{props.item.categories[0].name}</Text>
            <Text style={styles.detail}>{address}</Text>
            <Text style={styles.detail}>{address2}</Text>
          </View>   
          {/* Adicionando o MapView na tela */}
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}>
                {/* Adicionando o marker para inserir o alfinete */}
                <Marker
                  coordinate={{latitude: latitude,
                                longitude: longitude}}
                  title={props.item.name}
                  description={address}
                />
            </MapView>
      </View> 
    )
}
