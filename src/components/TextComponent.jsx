import { Text, StyleProp } from "react-native"
import { appColors } from "../constants/appColors";
import globalStyles from "../styles/globalStyles";
import { TextStyle } from "react-native";

/**
 * @typedef {Object} TextComponentProps
 * @property {string} text - The text content to display.
 * @property {number} [size] - The font size of the text. Default is determined by `title`.
 * @property {number} [flex] - The flex value of the text within its container. Default is 0.
 * @property {string} [font] - The font family of the text. Default is regular font family.
 * @property {boolean} [title] - The font size to be used when `size` is not provided.
 * @property {string} [color] - The color of the text. Default is determined by `appColors.text`.
 * @property {StyleProp<TextStyle>} [styles] - The style
 */

/**
 * TextComponent
 * @param {TextComponentProps} props - The props for TextComponent.
 * @returns {JSX.Element} - A JSX.Element representing the TextComponent.
 */

const TextComponent = (props) => {
    const { text, size, flex, color, styles } = props
    return (
        <Text style={[
            globalStyles.text,
            {
                color: color ?? appColors.text,
                flex: flex ?? 0,
                fontSize: size ?? 14
            },
            styles
        ]}>
            {text}
        </Text>
    )
}

export default TextComponent;