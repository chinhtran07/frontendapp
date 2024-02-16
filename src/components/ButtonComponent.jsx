import { TouchableOpacity } from "react-native"
import TextComponent from "./TextComponent"
import { ReactNode } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import globalStyles from "../styles/globalStyles";
import { appColors } from "../constants/appColors";

/**
 * @typedef {Object} ButtonComponentProps
 * @property {ReactNode} [icon] - The icon name or source for the button (if any).
 * @property {string} text - The text content of the button.
 * @property {'primary' | 'text' | 'link'} [type] - The type of the button text (if any).
 * @property {string} [color] - The background color of the button.
 * @property {StyleProp<ViewStyle>} [styles] - The custom styles to be applied to the button.
 * @property {string} [textColor] - The color of the text inside the button.
 * @property {StyleProp<TextStyle>} [textStyles] - The custom text styles to be applied to the text inside the button.
 * @property {() => void} [onPress] - The callback function to be called when the button is pressed.
 * @property {'right' | 'left'} [iconFlex] - The flex icon
 * @property {number} [textSize] - The size of text in button
 */

/**
 * ButtonComponent
 * @param {ButtonComponentProps} props - The props for ButtonComponent.
 * @returns {JSX.Element} - A JSX.Element representing the ButtonComponent.
 */

const ButtonComponent = (props) => {
    const { icon, text, type, color, styles, textColor, textStyles, textSize, onPress, iconFlex } = props;
    return type === 'primary' ? (
        
        <TouchableOpacity style={[
            globalStyles.button,
            {
                backgroundColor: color ?? appColors.button,
            },
            styles]} onPress={onPress}>
            {icon && iconFlex === 'left' && icon}
            <TextComponent
                text={text}
                size={textSize}
                color={textColor ?? appColors.text}
                styles={textStyles}
                flex={icon && iconFlex === 'right' ?  1: 0}
            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ): (
        <TouchableOpacity styles={[globalStyles.button, styles]} onPress={onPress}>
            <TextComponent 
                text={text}
                color={textColor && type === 'link' ? appColors.text : appColors.blue}
                styles={textStyles}
            />
        </TouchableOpacity>
    )
}

export default ButtonComponent;