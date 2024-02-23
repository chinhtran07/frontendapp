import SectionComponent from "./SectionComponent"
import useAuth from "../configs/AuthContext"
import { Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import RowComponent from "./RowComponent";
import { appColors } from "../constants/appColors";

const AddSurveyComponent = () => {
    const [state, dispatch] = useAuth();
    const user = state.user

    const navigation = useNavigation()

    return (
        <SectionComponent styles={{
            backgroundColor: appColors.white,
            borderRadius: 20,
        }}>
            <RowComponent>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image source={{ uri: user.avatar }} width={50} height={50} resizeMode='cover' borderRadius={50} />
                </TouchableOpacity>

            </RowComponent>
        </SectionComponent>
    )
}

export default AddSurveyComponent;