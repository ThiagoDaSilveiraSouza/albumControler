import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

// components
import { Modal } from "../../../../components";

// styled components
import { ListContainer, ModalContainer } from "../../../../styleComponents";

// interfaces
import { ICard } from "../../../../interfaces";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

interface ICompareModal {
  useModal: [boolean, Dispatch<SetStateAction<boolean>>];
  missingCards: ICard[];
}

interface IFormElement extends HTMLFormElement {
  compareCardInput: HTMLInputElement;
}

export const CompareModal = ({ useModal, missingCards }: ICompareModal) => {
  const [modalIsOpen] = useModal;
  const [needCards, setNeedCards] = useState<string[]>([]);
  const needCardsString = needCards.join(",");
  const [isCopiedToClipBoard, setIsCopiedToClipBoard] = useState(false);
  const haveMoreThanOne = needCards.length > 0;
  const compareLists = (
    missingCards: string[],
    compareCardsList: string[]
  ): string[] => {
    const needCards = missingCards.filter((currentMissingCard) =>
      compareCardsList.find(
        (currentCompareCard) => currentMissingCard === currentCompareCard
      )
    );
    setNeedCards(needCards);
    return needCards;
  };

  const formHandlerSubmit: FormEventHandler<IFormElement> = (event) => {
    event.preventDefault();
    const { compareCardInput } = event.target as IFormElement;
    const compareCardList = compareCardInput.value.split(", ");
    const missingCardsIdList = missingCards.map(({ id }) => id);

    compareLists(missingCardsIdList, compareCardList);
  };

  const copyButtonHandlerClick = () => {
    navigator.clipboard.writeText(needCardsString);
    setIsCopiedToClipBoard(true);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setIsCopiedToClipBoard(false);
    }
  }, [modalIsOpen]);

  return (
    <Modal useModal={useModal}>
      <Form onSubmit={formHandlerSubmit}>
        <input
          type="text"
          placeholder="Cole a lista de figurinhas"
          name="compareCardInput"
        />
        <button type="submit">Comparar</button>
      </Form>
      <h3>Lista de Figurinhas faltantes:</h3>
      <ModalContainer isCopiedToClipBoard={isCopiedToClipBoard}>
        {haveMoreThanOne ? (
          <>
            <ListContainer>
              <strong>{needCards.join(", ")}</strong>
            </ListContainer>
            <span>Copiado!</span>
            <button onClick={copyButtonHandlerClick} type="button">
              Copiar
            </button>
          </>
        ) : (
          <ListContainer>
            <strong>"Não há figurinha nenhuma que sirva..."</strong>
          </ListContainer>
        )}
      </ModalContainer>
    </Modal>
  );
};
