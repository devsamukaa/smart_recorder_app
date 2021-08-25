import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    /* Estilos comuns */

    margin_bottom_8: {
        marginBottom: 8,
    },

    margin_bottom_16: {
        marginBottom: 16,
    },

    margin_bottom_24: {
        marginBottom: 24,
    },

    margin_bottom_32: {
        marginBottom: 32,
    },

    black_text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },

    black_text_18: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
    },

    black_text_20: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
    },

    bold_black_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
    },

    bold_black_text_18: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
    },

    bold_black_text_20: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
    },

    bold_black_text_22: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
    },

    error_minor_text: {
        fontFamily: 'Montserrat-Regular',
        color: 'red'
    },

    bold_orange_high_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#FB8500',
    },

    text_align_center: {
        textAlign: 'center',
    },

    container: {
        flex: 1,
    },

    container_app: {
        flex: 1,
    },

    container_scroll_screen: {
        flex: 1,
        backgroundColor: '#fff',
    },

    internal_container: {
        flexDirection: 'column',
        flex: 1,
        padding: 16,
    },

    container_inferior_menu: {
        width: '100%',
        flexDirection: 'row',
        bottom: 0,
        height: 60,
        backgroundColor: '#fcfcfc'
    },

    touchable_item_menu: {
        width: '20%',
        borderWidth: 0.5,
    },

    container_item_menu: {
        width: '100%',
        height: 60,
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderColor: '#d1d1d1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon_style: {
        fontSize: 26,
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

    blue_button: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#020C53',
        minWidth: 200,
    },

    text_blue_button: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
    },

    dark_text_input: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
    },

    light_text_input: {
        color: '#020C53',
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
    },

    border_bottom_light_input: {
        borderBottomColor: '#020C53',
        borderBottomWidth: .9,
    },

    container_input: {
        paddingHorizontal: 0,
    },
});