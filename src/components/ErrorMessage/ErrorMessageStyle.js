import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container_error_message: {
        backgroundColor: '#ffeff3',
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
        borderColor: '#F1416C',
        borderWidth: .5,
    },

    text_error_message: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 17,
        color: '#F1416C',
    }
});