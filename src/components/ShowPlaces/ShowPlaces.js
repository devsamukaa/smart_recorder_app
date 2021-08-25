import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {SearchBar} from 'react-native-elements'
import styles from './ShowPlacesStyle' //Importando o Style
import {Icon} from 'react-native-elements' //Importante React

//Aqui iremos renderizar cada item
const RenderItem = ({ item, press, pressFav, userInfo }) => {  
  //Montando item
  const categoryName= item.categories[0].pluralName;
  const categoryImage= item.categories[0].icon.prefix+"100"+item.categories[0].icon.suffix;
  let address = "";
  if(item.location.neighborhood !== undefined){
    address = item.location.neighborhood + " - ";
  }
  address += item.location.city+"/"+item.location.state;

  //Alterando a opacidade do coração se ele estiver no objeto
  let opacityHeart = 0.3;
  if(userInfo != null){
    if(userInfo.places[item.id] !== undefined){
      opacityHeart = 1;
    }    
  }

  return (
    <TouchableOpacity onPress={()=> press(item)}>
      <View style={styles.containerItem}>
        <View style={styles.infoItem}>
          <Image
              style={styles.imageView}
              source={{uri: categoryImage}}
            />    
          <View style={styles.textsView}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.detail}>{address}</Text>
            <Text style={styles.category}>{categoryName}</Text>
          </View>   
          <View style={[ styles.iconHearts, {opacity: opacityHeart}]}>
              {/*Adicionando ícone FontAwesome*/} 
              <Icon
                  name='heart'
                  type='font-awesome'
                  color='#ff0000'
                    onPress={()=> pressFav(item)}
                  />                                     
          </View>       
        </View>
        <View style={styles.separator}></View>
      </View>
    </TouchableOpacity>
  );
}

const ShowPlaces = (props) => {
    console.log(props.filteredArrayPlaces[0]);

    //Verifica se há uma informação de erro para mostrar na tela
    let txtError = null;
    let activeIndicator = null;
    let listView = null;
    if(props.errorInfo !== ""){
      //Coloca a informação de erro na tela
      txtError = <Text style={styles.errorInfo}>{props.errorInfo}</Text>
    //Verifica se está esperando algum processo assíncrono
    } else if(props.isWaiting){
      //Adicionar o Activity Indicator na tela
      activeIndicator = 
        <View style={styles.activityIndicator}><ActivityIndicator size="small" color="#0000ff" /></View>
    //Senão, mostra o ListView        
    } else {
      listView =
       <View style={styles.listInfo}> 
        {/* Adicionando SafeAreaView */}
        <SafeAreaView style={styles.safeAreaView}>
          {/* Adicionando o Flat List
              data = recebe o array a ser exibido
              renderItem= recebe o JSX a ser exibido em cada item . No caso, chamamos o RenderItem
              keyExtractor= ID de cada item na lista. O React exige um número único para cada item
              refreshControl= Inserir o componente RefreshControl
          */}
          <FlatList              
            data={props.filteredArrayPlaces}            
            renderItem={({ item }) => <RenderItem item={item.venue} press={props.goToDetail} 
                            pressFav={props.favItem} userInfo={props.userInfo} />}
            keyExtractor={item => item.venue.id.toString()}
            refreshControl={
              <RefreshControl refreshing={props.isWaiting} onRefresh={props.refreshList} />
        }
          />
        </SafeAreaView>
      </View>
    }

    //Passando o metodo recebido pela props no onPress
    return (
      <View style={styles.container}>
        {/* Adicionando Search Bar */}
        <SearchBar
          placeholder="Busque um lugar..."
          onChangeText={props.updateSearch}
          value={props.search}
          lightTheme={true}
          inputStyle={styles.inputSearchBarStyle}
          inputContainerStyle={styles.inputSearchBarStyle}
        />
        {txtError}
        {activeIndicator}
        {listView}
      </View>
    )
}

export default ShowPlaces;
