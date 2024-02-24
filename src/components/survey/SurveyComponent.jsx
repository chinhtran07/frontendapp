import InputComponent from "../InputComponent";
import TextComponent from "../TextComponent";
import AvatarPostComponent from "../AvatarPostComponent";
import SectionComponent from "../SectionComponent";
import ResponseQuestionComponent from "./ResponseQuestionComponent";
import { useState } from "react";

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
                {post.updated_date ?
                    <TextComponent text={moment(post.updated_date).fromNow()} /> :
                    <TextComponent text={moment(post.created_date).fromNow()} />
                }
            </SectionComponent>
            <SectionComponent>
                <TextComponent text={survey.title} size={20}/>
            </SectionComponent>

            {survey.questions.map(question => (
                <ResponseQuestionComponent 
                key={question.id}
                responses={responses}
                question={question}
                onChange={(questionId, value) => handleChange(questionId, value)}
                />
            ))}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

export default SurveyComponent;