import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,        
      backgroundColor: 'white'
    },
    listInfo: {
      margin: 0,
      padding: 0,
      flexGrow: 1,
    },
    safeAreaView:{
      flexGrow: 1,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
    },    
    containerItem: {
      flex:1,
    
      flexDirection: "column",
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    imageView:{
      width: 50,
      height: 50,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: '#1b4275',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    textsView: {
      //Porque FlexGrow e FlexShrink juntos? Porque se o texto for pequeno, ele completa
      //o espaço. E se for grande, ele quebra o texto
      flexGrow: 1,
      flexShrink: 1,
      flexDirection: 'column',
    },
    iconHearts: {
      flexGrow: 0,
      width: 50,
      marginLeft: 10,
      marginRight: 10,      
      opacity: 0.2,
    },
    title:{
      fontSize: 18,      
      color: '#1b4275',
      flexWrap: 'wrap',
    },
    detail:{
      marginTop:5,
      fontSize: 15,
      color: "#999"
    },
    category:{
      marginTop:5,
      fontSize: 15,
      fontWeight: "bold",
      color: "#999"
    },
    inputSearchBarStyle: {
      backgroundColor: 'white'
    },
    separator: {
      marginTop: 5,
      marginBottom: 5,
      height: 1,
      backgroundColor: '#999',
    },
    errorInfo:{
      fontSize: 15,
      textAlign:'center',
      marginTop: 20,
    },
    activityIndicator: {
      marginTop: 20
    }
});
