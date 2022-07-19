import React from "react";
import { inputStyle } from "../styles";

export const SimpleUpload = ({ props }) => {
    const { onChange, placeholder, fileName } = props;

    const inputContainerStyle = {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        height: '29px',
        fontFamily: 'Quicksand',
    }

    const inputButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#e0e000',
        borderRadius: '8px 0px 0px 8px',
        borderRight: '1px solid #000',
        width: '50%',
        texxtAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#fff',
        },
        
    }

    const previewColor = {
        borderRadius: '0px 8px 8px 0px',
        backgroundColor: '#E5E5E5',
        width: '50%',
        paddingLeft: '0.2rem',
        display:'flex',
        alignItems: 'center',
    };

    return (
        <div style={inputContainerStyle}>
            <label style={inputButtonStyle}>
                <input type="file" multiple onChange={onChange} style={inputStyle}/>
                {placeholder}
            </label>
            <label style={previewColor}><b>Fil: </b> {fileName}</label>
        </div>
    );
};

export const ColUpload = props => {
    const { onChange, placeholder, setFileSet } = props;

    const inputContainerStyle = {
        width: '100%',
        display: 'flex',
        height: '29px',
        fontFamily: 'Quicksand',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const inputButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#e0e000',
        borderRadius: '8px',
        texxtAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem', 
    }

    const handleChange = (event) => {
        onChange(event);
        setFileSet(true);
    }

    return (
        <div style={inputContainerStyle}>
            <label style={inputButtonStyle}>
                <input 
                    type="file" 
                    multiple 
                    onChange={handleChange} 
                    style={inputStyle}
                />
                {placeholder}
            </label>
        </div>
    );
};

export const OnlyUpload = ({ onChange }) => {

    const inputButtonStyle = {
        cursor: 'pointer',
        backgroundColor: '#e0e000',
        borderRadius: '8px',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 8px',
        lineHeight: 1.75,
        fontFamily: 'Quicksand',
        fontSize: '14px',
        fontWeight: 700,
        marginBottom: '0.8rem',
    }

    return (
        <label style={inputButtonStyle}>
            <input type="file" multiple onChange={onChange} style={inputStyle}/>
            VELG
        </label>
    );
};
