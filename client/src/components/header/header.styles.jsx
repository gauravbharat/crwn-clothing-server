import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Works same as mixin i.e. resuable code block
// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;

// export const OptionLink = styled(Link)`
// //   ${OptionContainerStyles}
// // `;

// export const OptionDiv = styled.div`
//   ${OptionContainerStyles}
// `;

/** Instead of a separate component for Link and div, with SAME code,
 * property 'as='div'' can be used on the OptionLink component
 * See header component code */
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
