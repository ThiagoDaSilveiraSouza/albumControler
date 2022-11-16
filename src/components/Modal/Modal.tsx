import { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";
import { CloseButton } from "../../styleComponents";

interface IModalContainer {
  modalIsOpen: boolean;
}

const ModalContainer = styled.div<IModalContainer>`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  opacity: ${({ modalIsOpen }) => (modalIsOpen ? 1 : 0)};
  visibility: ${({ modalIsOpen }) => (modalIsOpen ? "visble" : "hidden")};
  transition: 0.3s;
`;

const ModalBg = styled.div<IModalContainer>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalCard = styled.div<IModalContainer>`
  position: absolute;
  padding: 35px;
  background: white;
  transform: ${({ modalIsOpen }) =>
    modalIsOpen ? "none" : "translateY(-100%)"};
  transition: 0.3s;
  max-width: 500px;
  width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  overflow-wrap: break-word;
  box-sizing: border-box;

  @media (max-width: 500px) {
    width: 100vw;
    height: 100vh;
    max-height: none;
  }
`;

interface IModal {
  children: ReactNode;
  useModal: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const Modal = ({ children, useModal }: IModal) => {
  const [modalIsOpen, setModalIsOpen] = useModal;

  const closeButtonHandleClick = () => {
    setModalIsOpen((modalIsOpen) => !modalIsOpen);
  };
  
  return (
    <ModalContainer modalIsOpen={modalIsOpen}>
      <ModalBg modalIsOpen={modalIsOpen} onClick={closeButtonHandleClick} />
      <ModalCard modalIsOpen={modalIsOpen}>
        <CloseButton onClick={closeButtonHandleClick} />
        {children}
      </ModalCard>
    </ModalContainer>
  );
};
