import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { ContainerComponent, InputComponent, RowComponent, SectionComponent, TextComponent } from "../../components";
import { ArrowLeft } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import useAuth from "../../configs/AuthContext";
import { appColors } from "../../constants/appColors";

const SearchingScreen = ({ navigation }) => {

    const [valueSearch, setValueSearch] = useState('');

    const [resultsSearch, setResultsSearch] = useState(null);

    const [state, dispatch] = useAuth()

    useEffect(() => {
        const loadResult = async () => {
            let url = endpoints['search']

            if (valueSearch !== undefined && valueSearch !== "") {
                url = `${url}?name=${valueSearch}`
            } else {
                setResultsSearch([])
                return;
            }

            try {
                let res = await authApi(state.accessToken).get(url);
                setResultsSearch(res.data);
            } catch (ex) {
                setResultsSearch([]);
                console.log(ex);
            }
        };
        loadResult();
    }, [valueSearch])


    return (
        <ContainerComponent styles={{backgroundColor: appColors.background}}>
            <SectionComponent styles={{ marginTop: 40 }}>
                <RowComponent styles={{ justifyContent: 'space-between', alignItems: 'center', marginRight: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft size={30} color="black" />
                    </TouchableOpacity>
                    <InputComponent placeholder="Tìm kiếm" value={valueSearch} onChange={val => setValueSearch(val)}  />
                </RowComponent>
                {resultsSearch === null ? <ActivityIndicator size='large' /> : resultsSearch && resultsSearch.length > 0 ?
                    (
                        resultsSearch.map(u => (
                            <SectionComponent key={u.id}>
                                <TouchableOpacity>
                                    <RowComponent styles={{borderRadius: 10, borderColor: 'white', borderWidth: 2}}>
                                        <Image source={{ uri: u.avatar }} width={40} height={40} borderRadius={50} />
                                        <TextComponent text={`${u.first_name} ${u.last_name}`} size={20} color={appColors.text}/>
                                    </RowComponent>
                                </TouchableOpacity>
                            </SectionComponent>
                        ))): (
                            <TextComponent text="Không tìm thấy người dùng" size={20} />
                        )}
            </SectionComponent>
        </ContainerComponent>
    )
}

export default SearchingScreen;