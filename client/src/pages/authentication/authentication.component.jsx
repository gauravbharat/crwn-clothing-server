import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { AuthenticationHeader } from './authentication.styles';

const Authentication = () => {
  return (
    <AuthenticationHeader>
      <SignIn />
      <SignUp />
    </AuthenticationHeader>
  );
};

export default Authentication;
