import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import {
  SignInContainer,
  TitleHeading,
  ButtonsContainer,
  SubtitleContainer,
  FormContainer
} from './sign-in.styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '',
        password: ''
      });
    } catch (error) {
      error.code === 'auth/user-not-found' &&
        alert('Email or Password is incorrect. Please try again');
      console.error(error);
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <SignInContainer>
        <TitleHeading>I already have an account</TitleHeading>
        <SubtitleContainer>
          Sign in with your email and password
        </SubtitleContainer>

        <FormContainer onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            handleChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <ButtonsContainer>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton
              type='button'
              onClick={signInWithGoogle}
              isGoogleSignin
            >
              Sign in with Google
            </CustomButton>
          </ButtonsContainer>
        </FormContainer>
      </SignInContainer>
    );
  }
}

export default SignIn;
