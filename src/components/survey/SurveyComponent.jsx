import TextComponent from "../TextComponent";
import AvatarPostComponent from "../AvatarPostComponent";
import SectionComponent from "../SectionComponent";
import ResponseQuestionComponent from "./ResponseQuestionComponent";
import { useState } from "react";
import { View } from "react-native";
import { appColors } from "../../constants/appColors";
import moment from "moment";
import ButtonComponent from "../ButtonComponent";

const SurveyComponent = ({ survey }) => {
    const user = survey.user;
    const [responses, setResponses] = useState({});


    const handleChange = (questionId, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: value
        }));
    };
    const handleSubmit = () => {
        const formattedResponses = {
            title: survey.title,
            questions: survey.questions.map(question => ({
                type: question.type,
                title: question.title,
                response: responses[question.id] || ""
            }))
        };
    }

    return(
        <View style={{ backgroundColor: appColors.white, borderRadius: 10 }}>
            <AvatarPostComponent user={user} />
            <SectionComponent>
                {survey.updated_date ?
                    <TextComponent text={moment(survey.updated_date).fromNow()} /> :
                    <TextComponent text={moment(survey.created_date).fromNow()} />
                }
            </SectionComponent>
            <SectionComponent styles={{justifyContent: 'center', alignItems: 'center'}}>
                <TextComponent text={survey.title} size={20} styles={{fontWeight: 'bold'}}/>
            </SectionComponent>

            {survey.questions.map((question, index) => (
                <ResponseQuestionComponent 
                key={question.id}
                index={index}
                responses={responses}
                question={question}
                onChange={(questionId, value) => handleChange(questionId, value)}
                />
            ))}
            <ButtonComponent text="Nộp" onPress={handleSubmit} type='primary' />
        </View>
    );
}

export default SurveyComponent;