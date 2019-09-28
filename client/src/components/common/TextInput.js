import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({label, value, name, placeholder, onChange, error}) => {
    let wrapperClass = "form-group";
    if(error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className={'field'}>
                <input
                    type={'text'}
                    className={'form-control'}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {error && <div className={'alert alert-danger'}>{error}</div>}
            </div>
        </div>
    )
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
}

export default TextInput;