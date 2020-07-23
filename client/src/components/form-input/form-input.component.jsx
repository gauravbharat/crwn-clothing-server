import React from 'react';

import {
  FormGroupContainer,
  InputField,
  InputLabel
} from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <FormGroupContainer>
      <InputField onChange={handleChange} {...otherProps} />
      {label ? (
        <InputLabel
          className='form-input-label'
          length={otherProps.value.length}
          htmlFor={otherProps.name}
        >
          {label}
        </InputLabel>
      ) : null}
    </FormGroupContainer>
  );
};

export default FormInput;
