import { View } from "react-native"
import TextComponent from "../TextComponent"
import InputComponent from "../InputComponent"
import { useState } from "react"

const ResponseQuestionComponent = ({ responses, question, onChange }) => {
    const [value, setValue] = useState()

    return (
        <View>
            <TextComponent text={question.title} size={20} />
            {question.type === 1 ? (
                <InputComponent
                    value={value}
                    placeholder="Nhập câu trả lời"
                    onChange={value => onChange(question.id, value)}
                />
            ) : question.type === 2 ? (
                <View>
                    {question.choices.map(choice => (
                        <View key={choice.id}>
                            {/* <TextComponent
                                value={choice.content}
                                status={responses[question.id] === choice.content ? "checked" : "unchecked"}
                                onPress={() => onChange(question.id, choice.content)}
                            /> */}
                            <TextComponent text={choice.content} size={20}/>
                        </View>
                    ))}
                </View>
            ) : null}
        </View>
    )
}

export default ResponseQuestionComponent;