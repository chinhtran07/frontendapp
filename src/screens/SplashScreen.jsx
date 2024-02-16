import { ActivityIndicator, Image, ImageBackground, View } from "react-native";
import globalStyles from "../styles/globalStyles";
import { appInfo } from "../constants/appInfos";
import { SpaceComponent } from "../components";
import { appColors } from "../constants/appColors";

const SplashScreen = () => {
    return (
        <View style={globalStyles.container}>
            <Image source={require('../assets/images/logo.png')} 
            style={{
                width: appInfo.sizes.WIDTH, 
                resizeMode: 'contain'
            }}
            />
            <SpaceComponent height={20}/>
            <ActivityIndicator color={appColors.blue} size="large"/>
        </View>
    )
}


export default SplashScreen;