import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#020C53',
      padding: 16
    },

    container_logo: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container_inputs: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    input_icon: {
        paddingRight: 10,
    },

    container_input: {
    },

    dark_text_input: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
    },

    orange_button: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffb703',
        minWidth: 200,
    },

    text_orange_button: {
        textAlign: 'center',
        fontSize: 18,
        color: '#020C53',
        fontFamily: 'Montserrat-Bold',
    },

    container_register: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
    },

    normal_white_text: {
        fontFamily: 'Montserrat-Regular',
        color: '#fff',
        fontSize: 17,
    },
    
});