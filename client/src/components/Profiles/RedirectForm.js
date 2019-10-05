import TextInput from "../common/TextInput";
import React from 'react';

const RedirectForm = ({handleChange, query}) => {
    return (
        <div>
            <form>
                <TextInput
                    label={''}
                    placeholder={'Search for...'}
                    name={'name'}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
};

export default RedirectForm;