import { View } from "react-native";
import ButtonComponent from "../ButtonComponent";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const ReactionComponent = ({}) => {
    
    const items = [
        {icon: <FontAwesome name="" />, label: 'Like', value: 1},
        {label: 'Haha', value: 2},
        {label: 'Love', value: 3}
    ]
    const [selectedReaction, setSelectedReaction] = useState(null)
    const [showReactions, setShowReactions] = useState(false);

    const handleReaction = (reaction) => {
        setSelectedReaction(reaction);
    }

    const handleLongPress = () => {
        setShowReactions(true);
    }

    const handleRelease = () => {
        setShowReactions(false);
    }

    return (
        <View>
            <ButtonComponent />
        </View>
    )

}

export default ReactionComponent;