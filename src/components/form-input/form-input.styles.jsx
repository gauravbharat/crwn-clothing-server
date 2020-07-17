import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

const normalLabel = css`
  top: 10px;
  font-size: 16px;
  color: ${subColor};
`;

const isShrink = ({ length }) => (length > 0 ? shrinkLabel : normalLabel);

export const FormGroupContainer = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const InputField = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    ${shrinkLabel}
  }
`;

export const InputLabel = styled.label`
  ${isShrink}
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  transition: 300ms ease all;
`;
