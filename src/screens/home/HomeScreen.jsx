import { Text, View } from "react-native";
import { ButtonComponent, ContainerComponent } from "../../components";
import { useContext } from "react";
import useAuth from "../../configs/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {

    return (
        <ContainerComponent>
            <Text>HomeScreen</Text>
        </ContainerComponent>
    )
};

export default HomeScreen;