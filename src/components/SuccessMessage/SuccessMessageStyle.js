import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container_success_message: {
        backgroundColor: '#e4fff4',
        width: '100%',
        maxHeight: 64,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        display: 'none',
        borderColor: '#20D489',
        borderWidth: .5,
    },

    text_success_message: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 17,
        color: '#20D489',
    }
});