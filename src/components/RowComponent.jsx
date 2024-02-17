/**
 * @typedef {Object} RowComponentProps
 * @property {'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'} [justify] - The alignment of items along the main axis of the row.
 * @property {import("react-native").StyleProp<import("react-native").ViewStyle>} [styles] - The styles to be applied to the row.
 * @property {import("react").ReactNode} children - The content to be rendered inside the row.
 */

import { View } from "react-native"
import globalStyles from "../styles/globalStyles"

/**
 * RowComponent
 * @param {RowComponentProps} props - The props for the RowComponent.
 * @returns {JSX.Element} - A JSX.Element representing the RowComponent.
 */

const RowComponent = (props) => {
    const {justify, styles, children} = props

    return <View style={[globalStyles.row,styles]}>{children}</View>
}

export default RowComponent