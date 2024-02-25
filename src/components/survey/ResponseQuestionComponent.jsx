import { View } from "react-native"
import TextComponent from "../TextComponent"
import InputComponent from "../InputComponent"
import { useState } from "react"
import RadioButtonRN from "radio-buttons-react-native"
import { Icon } from "react-native-vector-icons/FontAwesome"

const ResponseQuestionComponent = ({ index ,responses, question, onChange }) => {
    const [value, setValue] = useState('')

    return (
        <View>
            <TextComponent text={`Câu ${index + 1}: ${question.title}`} size={15} styles={{fontWeight: '600'}} />
            {question.type === 1 ? (
                <InputComponent
                    value={value}
                    placeholder="Nhập câu trả lời"
                    onChange={value => onChange(question.id, value)}
                />
            ) : question.type === 2 ? (
                <View>
                    <RadioButtonRN 
                        data={question.choices}
                        selectedBtn={(e) => console.log(e)}
                        icon={
                            <Icon
                              name="check-circle"
                              size={25}
                              color="#2c9dd1"
                            />
                          }
                    />
                </View>
            ) : null}
        </View>
    )
}

export default ResponseQuestionComponent;