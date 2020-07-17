import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  cartItemsSelector,
  cartTotalSelector
} from '../../redux/cart/cart.selectors';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  HeaderBlock,
  TotalContainer,
  Total,
  TestWarningContainer
} from './checkout.styles';

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <HeaderBlock>Product</HeaderBlock>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <HeaderBlock>Description</HeaderBlock>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <HeaderBlock>Quantity</HeaderBlock>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <HeaderBlock>Price</HeaderBlock>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <HeaderBlock>Remove</HeaderBlock>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <TotalContainer className='total'>
        <Total>TOTAL: ${total}</Total>
      </TotalContainer>

      <TestWarningContainer className='test-warning'>
        *Please use the following test credit card for payments*
        <br />
        5555 5555 5555 4444 - Exp: 01/23 - CVV: 007
      </TestWarningContainer>

      <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: cartItemsSelector,
  total: cartTotalSelector
});

export default connect(mapStateToProps)(CheckoutPage);
