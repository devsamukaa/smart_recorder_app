import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,          
    },
    imageView:{      
      alignSelf: 'stretch',
    },
    textsView: {
      flexDirection: 'column',
      marginLeft: 5,
      marginRight: 5,      
    },
    title:{
      fontSize: 18,      
      color: '#1b4275',
      flexWrap: 'wrap',
      alignSelf: 'center',
      fontWeight: 'bold',
      marginTop: 10,
    },
    detail:{
      marginTop:5,
      fontSize: 12,
      color: "#999",
      marginLeft: 10,
      marginRight: 10,
    },
    category:{
      marginTop:5,
      fontSize: 12,
      fontWeight: "bold",
      marginLeft: 10,
      marginRight: 10,
      color: "#999"
    },
    mapView:{
      flexGrow:1,
      width: '100%',
    }
});

