import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Openbutton } from "./components/OpenButton";

const FloatMenuContainer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 999;
`;
interface INavMenu {
  isShow: boolean;
}
const NavMenu = styled.nav<INavMenu>`
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  transform: ${({ isShow }) => (isShow ? "none" : "translateX(200%)")};
  visibility: ${({ isShow }) => (isShow ? "visible" : "hidden")};
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  transition: 0.3s;
  user-select: none;

  button {
    border: none;
    background: none;
    padding: 10px;
    outline: none;
    :hover {
      transform: scale(1.03);
      text-decoration: underline;
      text-underline-offset: 5px;
    }
  }
`;

interface IFloatMenu {
  setShareModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const FloatMenu = ({ setShareModalIsOpen }: IFloatMenu) => {
  const [isShow, setIsShow] = useState(false);

  const openButtonHandlerClick = () => {
    setIsShow((isShow) => !isShow);
  };

  return (
    <FloatMenuContainer>
      <NavMenu isShow={isShow}>
        <button
          onClick={() => {
            setIsShow(false);
            setShareModalIsOpen(true);
          }}
        >
          Compartilhar
        </button>
      </NavMenu>
      <Openbutton onClick={openButtonHandlerClick} />
    </FloatMenuContainer>
  );
};
