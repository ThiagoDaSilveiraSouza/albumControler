import styled from "styled-components";

interface IModalContainer {
  isCopiedToClipBoard: boolean;
}

export const ModalContainer = styled.div<IModalContainer>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  button {
    :hover {
      box-shadow: 0 0 3px 0 black;
      color: green;
      border: 1px solid green;
    }
    :focus {
      outline: none;
    }
  }
  span {
    color: red;
    text-align: center;
    visibility: ${({ isCopiedToClipBoard }) =>
      isCopiedToClipBoard ? "visible" : "hidden"};
  }
`;
