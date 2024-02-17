import { SafeAreaView, ScrollView, View, StyleProp, ViewStyle, StyleSheet } from "react-native"
import globalStyles from "../styles/globalStyles";

/**
 * @typedef {Object} ContainerComponentProps
 * @property {boolean} [isScroll] - A flag indicating the ScrollView
 * @property {string} [title] - The title of the container.
 * @property {React.ReactNode} children - The content to be rendered inside the container.
 * @property {StyleProp<ViewStyle>} [styles] - The styles 
 */

/**
 * ContainerComponent
 * @param {ContainerComponentProps} props - The props for the ContainerComponent.
 * @returns {JSX.Element} - A JSX.Element representing the ContainerComponent.
 */

const ContainerComponent = (props) => {
    const { isScroll, title, children, styles } = props

    const returnContainer = isScroll ? (
        <ScrollView style={[{flex: 1},styles]}>{children}</ScrollView>
    ) : <View style={[{flex: 1} ,styles]}>{children}</View>;

    return (
        <SafeAreaView style={globalStyles.container}>
            <View>{returnContainer}</View>
        </SafeAreaView>
    )
}

export default ContainerComponent;

