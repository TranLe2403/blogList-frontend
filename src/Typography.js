import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: block;
  padding: 5px 15px;
  max-width: 150px;
  max-height: 30px;
  border-radius: 15px;
  border: none;
  margin: 5px;
  color: white;

  cursor: pointer;
  outline: none;
  ${({ buttonType }) =>
    buttonType === "cancel"
      ? `
      background: #cecece;
      color: red;
      `
      : `
      background: #7a6263;
  `}
  :hover{
      box-shadow: none;
  }
`;

function Typography({
  renderAs,
  buttonType,
  children,
  mapping,
  ...otherProps
}) {
  return (
    <Button buttonType={buttonType} {...otherProps}>
      {children}
    </Button>
  );
}

export default Typography;
