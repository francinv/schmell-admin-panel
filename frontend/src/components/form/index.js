import React, { useState } from 'react';
import BtnIconSubmit from '../Buttons/BtnIconSubmit';
import BtnSubmit from '../Buttons/BtnSubmit';
import { BODY_BOLD } from '../styles/Typography';
import { ColUpload, OnlyUpload, SimpleUpload } from './file/FileUpload';
import InputField from './input/InputField';
import TextArea from './input/TextArea';
import Radio from './radio/Radio';
import { PersonRadio } from './radio/SpecificRadio';
import SmallSelect from './select/Select';
import { ColContainerForm, ColSmallContainerForm, CustomContainerForm, CustomSmallContainerForm, CustomWidthText, FormContainer, FormText } from './styles';
import CustomSwitch from './switch/Switch';

export const InputContainer = props => {
    const { label, placeholder, value, onChange, type, width, fontSize, marginRight, required } = props;
    return (
        <CustomContainerForm width={width}>
            <CustomWidthText fontSize={fontSize} marginRight={marginRight}>{label}</CustomWidthText>
            <InputField value={value} onChange={onChange} placeholder={placeholder} type={type} height='29px' fontSize={14} marginLeft="0" backgroundColor="#E5E5E5" width="70%" required={required} />
        </CustomContainerForm>
    );
};

export const SmallInputContainer = ({ label, placeholder, value, onChange, type }) => {
    return (
        <CustomSmallContainerForm>
            <BODY_BOLD sx={{width:'20%'}}>{label}</BODY_BOLD>
            <InputField value={value} onChange={onChange} placeholder={placeholder} type={type} height='20px' fontSize={12} marginLeft="0.8rem" backgroundColor="#9FA2B4" width="70%"/>
        </CustomSmallContainerForm>
    );
};

export const ProfileInputContainer = props => {
    const { label, placeholder, value, onChange, type, handleSubmit, stateChange } = props;

    const handleInputSubmit = e => {
        e.preventDefault();
        stateChange(false);
        handleSubmit();
    }

    return (
        <FormContainer component="form" onSubmit={handleInputSubmit}>
            <FormText>{label}</FormText>
            <InputField value={value} onChange={onChange} placeholder={placeholder} type={type} height='29px' fontSize={14} marginLeft="1rem" backgroundColor="#FFF" width="55%"/>
            <BtnIconSubmit />
        </FormContainer>
    );
};
    
export const TextAreaContainer = ({label, placeholder, value, onChange}) => {

    return(
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <TextArea value={value} placeholder={placeholder} label={label} onChange={onChange} width='70%' marginLeft={0} fontSize='14px' backgroundColor='#E5E5E5' />
        </CustomContainerForm>
    );
};

export const SmallTextAreaContainer = ({ label, placeholder, value, onChange }) => {
    return (
        <CustomSmallContainerForm>
            <BODY_BOLD sx={{width:'20%'}}>{label}</BODY_BOLD>
            <TextArea value={value} placeholder={placeholder} label={label} onChange={onChange} width='80%' marginLeft='0.8rem' fontSize='12px' backgroundColor="#9FA2B4" />
        </CustomSmallContainerForm>
    );
};

export const FileContainer = ({label, placeholder, fileState, setFileState}) => {
    const fileName = fileState.name;

    const onChange = (event) => {
        event.preventDefault();
        setFileState(event.target.files[0]);
    }

    return (
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <SimpleUpload props={{onChange, placeholder, fileName}} />
        </CustomContainerForm>
    );
}

export const SelectContainerSmall = props => {
    const { label, value, onChange, options, width, fontSize, marginRight } = props;
    return(
        <CustomContainerForm width={width}>
            <CustomWidthText fontSize={fontSize} marginRight={marginRight}>{label}</CustomWidthText>
            <SmallSelect value={value} onChange={onChange} options={options} height='29px' fontSize={14} />
        </CustomContainerForm>
    );
};

export const RadioContainer = ({ label, onChange, options}) => {
    return (
        <CustomContainerForm>
                <CustomWidthText>{label}</CustomWidthText>
                <Radio onChange={onChange} options={options} fontSize='14px' />
        </CustomContainerForm> 
    );
};

export const PersonRadioContainer = ({ label, onChange }) => {
    return (
        <CustomContainerForm>
            <CustomWidthText>{label}</CustomWidthText>
            <PersonRadio onChange={onChange} />
        </CustomContainerForm>
    );
};

export const ColTextAreaContainer = ({ label, value, onChange }) => {
    return (
        <ColContainerForm width='65%'>
            <BODY_BOLD>{label}</BODY_BOLD>
            <TextArea value={value} onChange={onChange} width='100%' />
        </ColContainerForm>
    );
};

export const FileColContainer = ({ label, placeholder, fileState, handleFileChange }) => {
    const [fileSet, setFileSet] = useState(false);

    return (
        <ColContainerForm>
            <BODY_BOLD>{fileSet ? fileState.name : label}</BODY_BOLD>
            <ColUpload onChange={handleFileChange} placeholder={placeholder} setFileSet={setFileSet} />
        </ColContainerForm>
    );
};

export const FileButtonContainer = props => {
    const { setFileState, handleSubmit, onStateChange } = props;

    const handleChange = e => {
        e.preventDefault();
        setFileState(e.target.files[0]);
    }

    const handleFileSubmit = e => {
        e.preventDefault();
        onStateChange(false);
        handleSubmit();
    }

    return (
        <ColSmallContainerForm component="form" onSubmit={handleFileSubmit}>
            <OnlyUpload onChange={handleChange} />
            <BtnSubmit endIcon={null} btnText="Last opp" width='100%' />
        </ColSmallContainerForm>
    )
}

export const ToggleContainer = props => {
    const { label, value, onChange } = props;
    return (
        <FormContainer>
            <FormText sx={{width: '70%'}}>{label}</FormText>
            <CustomSwitch checked={value} onChange={onChange} />
        </FormContainer>
    )
}