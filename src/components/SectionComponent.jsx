/**
 * @typedef {Object} SectionComponentProps
 * @property {import("react").ReactNode} children - The content to be rendered inside the section.
 * @property {import("react-native").StyleProp<import("react-native").ViewStyle>} [styles] - The styles to be applied to the section.
 */

import { View } from "react-native";
import globalStyles from "../styles/globalStyles";

/**
 * SectionComponent
 * @param {SectionComponentProps} props - The props for the SectionComponent.
 * @returns {JSX.Element} - A JSX.Element representing the SectionComponent.
 */

const SectionComponent = (props) => {
    const {children, styles} = props

    return (
        <View style={[globalStyles.section, styles]}>
            {children}
        </View>
    )
}

export default SectionComponent;