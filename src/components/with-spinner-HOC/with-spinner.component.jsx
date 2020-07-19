import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

/** WithSpinner is a HOC (Higher Order Component) function which takes a WrappedComponent as an argument
 * that we want to wrap with the functionality of the spinner loading feature. */
const WithSpinnerHOC = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinnerHOC;
