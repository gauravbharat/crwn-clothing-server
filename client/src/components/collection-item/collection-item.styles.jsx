import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const AddButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const PriceContainer = styled.span`
  text-align: right;
`;

export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};

  /* &:hover {
    opacity: 0.8;
  } */
`;

const getExtendedStyles = ({ extendedProps }) => {
  if (extendedProps) {
    return extendedProps;
  }

  return '';
};

export const CollectionItemContainer = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover {
    opacity: 0.8;

    button {
      opacity: 0.85;
      display: flex;
    }
  }

  ${getExtendedStyles}
`;
