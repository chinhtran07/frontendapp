import React, { useState } from 'react';
import { appColors } from '../constants/appColors';
import globalStyles from '../styles/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropDownPicker = ({ items, setItems, selectedValue, setSelectedValue }) => {
    const [open, setOpen] = useState(false);

    return (
        <DropDownPicker
            style={[{ marginBottom: 10, borderColor: appColors.blue }]}
            dropDownStyle={globalStyles.dropdownDropStyle}
            open={open}
            value={selectedValue}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedValue}
            setItems={setItems} // This should be handled in the parent component
            onChangeItem={(item) => setSelectedValue(item.value)} // This should be handled in the parent component
        />
    );
};

export default CustomDropDownPicker;
