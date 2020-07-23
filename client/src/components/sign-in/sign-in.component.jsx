// 07212020 - Converted class component to a functional one to use Hooks
import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import {
  SignInContainer,
  TitleHeading,
  ButtonsContainer,
  SubtitleContainer,
  FormContainer,
} from './sign-in.styles';

const SignIn = (props) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({
        email: '',
        password: '',
      });
    } catch (error) {
      error.code === 'auth/user-not-found' &&
        alert('Email or Password is incorrect. Please try again');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <TitleHeading>I already have an account</TitleHeading>
      <SubtitleContainer>
        Sign in with your email and password
      </SubtitleContainer>

      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <ButtonsContainer>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignin>
            Sign in with Google
          </CustomButton>
        </ButtonsContainer>
      </FormContainer>
    </SignInContainer>
  );
};

export default SignIn;
