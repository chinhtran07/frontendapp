import { View } from "react-native"
import TextComponent from "../TextComponent"
import InputComponent from "../InputComponent"
import { useEffect, useState } from "react"
import RadioButtonRN from "radio-buttons-react-native"
import { Icon } from "react-native-vector-icons/FontAwesome"
import RadioForm from "react-native-simple-radio-button"

const ResponseQuestionComponent = ({ index, responses, question, onChange }) => {
    const [value, setValue] = useState('')
    const [radioProps, setRadioProps] = useState([])
    useEffect(() => {
        if (question.type === 2) {
            let radio_props = question.choices.map(choice => ({
                label: choice.content,
                value: choice.content // Or whatever unique identifier for the choice
            }));
            setRadioProps(radio_props)
        }
    }, [question]);

    console.log(responses)
    return (
        <View>
            <TextComponent text={`Câu ${index + 1}: ${question.title}`} size={15} styles={{ fontWeight: '600' }} />
            {question.type === 1 ? (
                <InputComponent
                    value={value}
                    placeholder="Nhập câu trả lời"
                    onChange={value => setValue(value)}
                />
            ) : question.type === 2 ? (
                <View style={{justifyContent: 'center'}}>
                    <RadioForm
                        radio_props={radioProps}
                        initial={-1}
                        onPress={value => onChange(question.id, value)}
                        formHorizontal
                    />
                </View>
            ) : null}
        </View>
    )
}

export default ResponseQuestionComponent;