import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

// interfaces
import { ICard } from "../../../../interfaces";

// components
import { Modal } from "../../../../components";

// utils
import { filterCardList } from "../../../../utils";

interface ISharedModalContainer {
  isCopiedToClipBoard: boolean;
}

const ShareModalContainer = styled.div<ISharedModalContainer>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
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

const ListContainer = styled.div`
  border: 1px solid black;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  strong {
    text-align: center;
  }
`;

interface IShareModal {
  useModal: [boolean, Dispatch<SetStateAction<boolean>>];
  checkedList: ICard[];
}

export const ShareModal = ({ useModal, checkedList }: IShareModal) => {
  const [modalIsOpen] = useModal;
  const { missingCards } = filterCardList(checkedList);
  const [isCopiedToClipBoard, setIsCopieToClipBoard] = useState(false);
  const haveMoreThanOneList = missingCards.filter(
    ({ quantity }) => quantity > 2
  );
  const haveMoreThanOne = haveMoreThanOneList.length > 0;
  const haveMoreThanOneString = haveMoreThanOneList
    .map(({ id }) => id)
    .join(", ");

  const copyButtonHandlerClick = () => {
    navigator.clipboard.writeText(haveMoreThanOneString);
    setIsCopieToClipBoard(true);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setIsCopieToClipBoard(false);
    }
  }, [modalIsOpen]);

  return (
    <Modal useModal={useModal}>
      <ShareModalContainer isCopiedToClipBoard={isCopiedToClipBoard}>
        <h3>Lista de Figurinhas faltantes:</h3>
        <ListContainer>
          <strong>
            {haveMoreThanOne
              ? haveMoreThanOneString
              : "Não há figurinha nenhuma sobrando..."}
          </strong>
        </ListContainer>
        <span>Copiado!</span>
        <button onClick={copyButtonHandlerClick} disabled={!haveMoreThanOne}>
          Copiar
        </button>
      </ShareModalContainer>
    </Modal>
  );
};
