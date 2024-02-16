import { View } from "react-native"
/**
 * @typedef SpaceComponentProps
 * @property {number} width - The space width
 * @property {number} height - The space height
 * 
 */
/**
 * SpaceComponent
 * @param {SpaceComponentProps} props 
 * @returns {JSX.Element}
 */

const SpaceComponent = (props) => {
    const {width, height} = props
    return <View style={{
        width,
        height,
    }}
    />
};

export default SpaceComponent;