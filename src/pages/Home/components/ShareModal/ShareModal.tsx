import { Dispatch, SetStateAction, useEffect, useState } from "react";

// interfaces
import { ICard } from "../../../../interfaces";

// components
import { Modal } from "../../../../components";
import { ListContainer, ModalContainer } from "../../../../styleComponents";

interface IShareModal {
  useModal: [boolean, Dispatch<SetStateAction<boolean>>];
  obtainedCards: ICard[];
}

export const ShareModal = ({ useModal, obtainedCards }: IShareModal) => {
  const [modalIsOpen] = useModal;
  const [isCopiedToClipBoard, setIsCopiedToClipBoard] = useState(false);
  const haveMoreThanOneList = obtainedCards.filter(
    ({ quantity }) => quantity > 2
  );
  const haveMoreThanOne = haveMoreThanOneList.length > 0;
  const haveMoreThanOneString = haveMoreThanOneList
    .map(({ id }) => id)
    .join(", ");

  const copyButtonHandlerClick = () => {
    navigator.clipboard.writeText(haveMoreThanOneString);
    setIsCopiedToClipBoard(true);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setIsCopiedToClipBoard(false);
    }
  }, [modalIsOpen]);

  return (
    <Modal useModal={useModal}>
      <ModalContainer isCopiedToClipBoard={isCopiedToClipBoard}>
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
      </ModalContainer>
    </Modal>
  );
};
