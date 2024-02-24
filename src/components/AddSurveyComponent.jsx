import SectionComponent from "./SectionComponent"
import useAuth from "../configs/AuthContext"
import { Image, TouchableOpacity, View, ViewBase } from "react-native"
import { useNavigation } from "@react-navigation/native";
import RowComponent from "./RowComponent";
import { appColors } from "../constants/appColors";
import TextComponent from "./TextComponent";
import SpaceComponent from "./SpaceComponent";
import InputComponent from "./InputComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { ElementPlus } from "iconsax-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import globalStyles from "../styles/globalStyles";
import QuestionComponent from "./QuestionComponent";

const AddSurveyComponent = () => {
    const [state, dispatch] = useAuth();
    const user = state.user
    const [survey, setSurvey] = useState({
        "title": "",
        "questions": []
    })
    const [question, setQuestion] = useState({
        "type": 1,
        "title": "",
        "choices": [],
    })

    const navigation = useNavigation()

    const changeSurvey = (field, value) => {
        setSurvey(current => {
            return { ...current, [field]: value }
        })
    }

    const changeQuestion = (index, field, value) => {
        const updatedQuestions = [...survey.questions];
        updatedQuestions[index][field] = value;
        setSurvey(current => {
            return { ...current, questions: updatedQuestions };
        });
    };


    const addQuestion = () => {
        const newQuestion = { ...question };
        setSurvey(current => {
            return { ...current, questions: [...current.questions, newQuestion] };
        });
        setQuestion({ type: 1, title: '', choices: [] });
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = [...survey.questions];
        updatedQuestions.splice(index, 1);
        setSurvey(current => {
            return { ...current, questions: updatedQuestions };
        });
    };


    const renderQuestions = () => {
        return survey.questions.map((q, index) => (
            <View key={index}>
                <QuestionComponent
                    index={index}
                    question={q}
                    onChange={(row, value) => changeQuestion(index, row, value)} 
                    onDelete={deleteQuestion}
                />
            </View>
        ));
    };

    return (
        <SectionComponent styles={{
            backgroundColor: appColors.white,
            borderRadius: 20,
        }}>
            <RowComponent>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image source={user.avatar === null ? require("../assets/images/avatar.jpg") : { uri: user.avatar }} width={50} height={50} resizeMode='cover' borderRadius={50} />
                </TouchableOpacity>
                <SpaceComponent width={5} />
                <TextComponent text='Admin' size={20} />
            </RowComponent>
            <InputComponent value={survey['title']} onChange={val => changeSurvey("title", val)} placeholder="Nhập tiêu đề" />
            <TextComponent text="Câu hỏi" />
            {renderQuestions()}
            <SpaceComponent height={10} />
            <ButtonComponent
                text="Thêm câu hỏi"
                icon={<ElementPlus size={20} color={appColors.black} />}
                type="primary"
                iconFlex="left"
                onPress={addQuestion}
            />
            <SpaceComponent height={10} />
            <ButtonComponent text="Đăng" type="primary" />
        </SectionComponent>
    )
}

export default AddSurveyComponent;