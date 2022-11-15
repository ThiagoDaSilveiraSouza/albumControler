import { MouseEventHandler } from "react";
import styled from "styled-components";

const OpenButtonElement = styled.button`
  position: relative;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 100%;
  background: white;

  transition: 0.3s;

  :hover {
    transform: scale(1.2);
  }
  span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 4px;
    background: black;
    border-radius: 30px;

    ::before,
    ::after {
      content: "";
      position: absolute;
      background: black;
      width: 100%;
      height: 100%;
      top: -8px;
      border-radius: 30px;
    }
    ::after {
      top: 8px;
    }
  }
`;

interface IOpenbutton {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Openbutton = ({ onClick }: IOpenbutton) => {
  return (
    <OpenButtonElement onClick={onClick}>
      <span></span>
    </OpenButtonElement>
  );
};
