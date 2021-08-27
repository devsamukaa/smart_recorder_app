import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    top_text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        marginBottom: 16,
    },

    premium_button: {
        marginBottom: 32,
    },

    text_result: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        marginTop: -16,
    },

    text_kwh_result: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 26,
        marginTop: -16,
    },

    text_date_result: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginTop: -16,
    },

    colunaItem: {
        maxWidth: '50%',
        flexGrow: 1,
    },

    colunaAliqIcms: {
        width: 45,
    },

    colunaIcms: {
        width: 60,
    },

    colunaValor: {
        width: 70,
    },

    container_header: {
        alignItems: 'center',
        alignContent: 'center',
        textAlignVertical: 'center',
    },

    colunaHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'center',
    },

    colunaBody: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'center',
    },

    linha: {
        justifyContent: 'space-between',
    }
});