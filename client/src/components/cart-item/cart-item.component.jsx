import React from 'react';

import {
  CartItemContainer,
  ImageContainer,
  ItemDetailsContainer,
  NameContainer,
  PriceContainer
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
  return (
    <CartItemContainer>
      <ImageContainer src={imageUrl} alt='item' />
      <ItemDetailsContainer className='item-details'>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>
          {quantity} x ${price}
        </PriceContainer>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
};

export default CartItem;
