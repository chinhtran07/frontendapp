import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, text: {
        fontSize: 14,
        color: appColors.text,
    }, title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        minHeight: 56,
    },
    section: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    dropdownDropStyle: {
        backgroundColor: 'gray',
    },
})