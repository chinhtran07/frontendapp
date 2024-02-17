import { StyleSheet, TextInput, TouchableOpacity, View, KeyboardType } from "react-native"
import { ReactNode, useState } from "react"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Eye, EyeSlash } from "iconsax-react-native"
import { appColors } from "../constants/appColors"
import globalStyles from "../styles/globalStyles"

/**
 * @typedef {Object} InputComponentProps
 * @property {string} value - The value of the input field.
 * @property {function(string): void} onChange - The function to be called when the input value changes.
 * @property {ReactNode} [affix] - The affix to be displayed before the input field.
 * @property {ReactNode} [suffix] - The suffix to be displayed after the input field.
 * @property {string} [placeholder] - The placeholder text for the input field.
 * @property {boolean} [isPassword] - A flag indicating whether the input field should be treated as a password field (for password masking).
 * @property {boolean} [allowClear] - A flag indicating allow clear input
 * @property {KeyboardType} [type] - The type input
 * @property {boolean} [multiline]
 */

/**
 * InputField Component
 * @param {InputComponentProps} props - The props for the InputComponent component.
 * @returns {JSX.Element} - A JSX.Element representing the InputComponent component.
 */

const InputComponent = (props) => {
    const { value, onChange, affix, suffix, placeholder, isPassword, allowClear, type, multiline } = props
    const [isShowPassword, setShowPassword] = useState(isPassword ?? false)
    return (
        <View style={[styles.inputContainer]}>
            {affix ?? affix}
            <TextInput
                style={[styles.input, globalStyles.text]}
                value={value}
                onChangeText={val => onChange(val)}
                placeholder={placeholder}
                secureTextEntry={isShowPassword}
                keyboardType={type ?? "default"}
                multiline= {multiline}
            />
            {suffix ?? suffix}
            <TouchableOpacity
                onPress={isPassword ? () => setShowPassword(!isShowPassword) : () => onChange('')}>
                {isPassword ? (isShowPassword ?
                    <Eye size={22} color={appColors.blue} /> :
                    <EyeSlash size={22} color={appColors.blue} />
                ) : (
                    value.length > 0 && allowClear && (
                        <AntDesign name="close" size={22} color={appColors.blue} />
                    )
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.blue,
        width: '100%',
        minWidth: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14,
    }
})

export default InputComponent;