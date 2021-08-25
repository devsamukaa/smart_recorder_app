import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container_inferior_menu: {
        width: '100%',
        flexDirection: 'row',
        bottom: 0,
        height: 60,
        borderTopWidth: 0.5,
        borderTopColor: '#d1d1d1',
    },

    container_item_menu: {
        width: '100%',
        height: 60,
        borderRightWidth: 0.5,
        borderRightColor: '#d1d1d1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon_style: {
        fontSize: 26,
    },
})