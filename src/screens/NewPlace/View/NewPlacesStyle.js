import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';

export default StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,          
    },
    title: {
        marginTop: 30,
      alignSelf: "center",
      fontSize: 24
    },
    inputView: {      
      marginTop: 15,
      marginLeft: 20,
      marginRight: 20,      
    },    
    inputIcon:{
        marginRight: 20,
    },
    buttonDiv: {
      flexDirection: "row",
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonSend: {
      backgroundColor: '#1b4275',
      color: '#fff',
      height: 40,
      width: 200,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonSendText:{
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
    cameraContainer: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      marginTop: 20,  
    },
    photoChangeText:{
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 5,
        textAlign: "center",
        color: '#1b4275',
    },
});

