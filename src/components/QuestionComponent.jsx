import SectionComponent from "./SectionComponent"
import InputComponent from "./InputComponent"
import RowComponent from "./RowComponent"
import { appColors } from "../constants/appColors"
import ButtonComponent from "./ButtonComponent"
import React, { useEffect, useState } from "react"
import SpaceComponent from "./SpaceComponent"
import CustomDropDownPicker from "./CustomDropDownPicker"
import Icon from "react-native-vector-icons/FontAwesome"

const QuestionComponent = ({ index, question, onChange, onDelete }) => {

    const [types, setTypes] = useState([
        { label: "Text", value: 1 },
        { label: "MCQ", value: 2 }
    ])
    const [selectedValue, setSelectedValue] = useState(question.type)

    const addChoice = () => {
        const updatedQuestion = { ...question, choices: [...question.choices, ''] };
        onChange('choices', updatedQuestion.choices);
    };

    const deleteChoice = (index) => {
        const updatedChoices = [...question.choices];
        updatedChoices.splice(index, 1);
        const updatedQuestion = { ...question, choices: updatedChoices };
        onChange('choices', updatedQuestion.choices);
    };

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...question.choices];
        updatedChoices[index] = value;
        const updatedQuestion = { ...question, choices: updatedChoices };
        onChange('choices', updatedQuestion.choices);
    };

    useEffect(() => {
        onChange("type", selectedValue);
        onChange("choices", [])
    }, [selectedValue]);

    return (
        <SectionComponent styles={{ justifyContent: 'center', alignItems: 'center' }}>
            <SectionComponent styles={{ marginHorizontal: 60, justifyContent: 'center', alignItems: 'center' }}>
                <RowComponent>
                        <CustomDropDownPicker
                            items={types}
                            setItems={setTypes}
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                        />
                    <SpaceComponent width={10} />
                    <ButtonComponent text="Xóa" icon={<Icon name="minus" size={20} color={appColors.black} />} onPress={onDelete} type="primary" iconFlex="right" />
                </RowComponent>
            </SectionComponent>
            <InputComponent value={question.title} onChange={val => onChange('title', val)} placeholder={`Câu hỏi ${index + 1} `} />
            {
                selectedValue === 2 && (
                    <SectionComponent styles={{ justifyContent: 'center', alignItems: 'center' }}>
                        {question.choices.map((choice, index) => (
                            <RowComponent styles={{ marginHorizontal: 80 }} key={index}>
                                <InputComponent
                                    value={choice}
                                    onChange={val => handleChoiceChange(index, val)}
                                    placeholder="Lựa chọn"
                                />
                                <SpaceComponent width={10} />

                                <ButtonComponent
                                    text="Xóa"
                                    icon={<Icon name="minus" size={20} color={appColors.black} />}
                                    type="primary"
                                    iconFlex="right"
                                    onPress={() => deleteChoice(index)}
                                />
                            </RowComponent>
                        ))}
                        <ButtonComponent
                            text="Thêm lựa chọn"
                            icon={<Icon name="plus" size={20} color={appColors.black} />}
                            type="primary"
                            styles={{ marginLeft: 5 }}
                            iconFlex="right"
                            onPress={addChoice}
                        />
                    </SectionComponent>
                )
            }
        </SectionComponent >
    )
}

export default QuestionComponent;