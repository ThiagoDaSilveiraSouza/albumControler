import {
  ChangeEvent,
  Dispatch,
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
  input {
    font-size: 25px;
    padding: 10px;
  }
`;

interface ICompareModal {
  useModal: [boolean, Dispatch<SetStateAction<boolean>>];
  missingCards: ICard[];
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

  const formHandlerSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const compareCardList = value.split(", ");
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
      <Form>
        <input
          type="text"
          placeholder="Cole aqui a lista de figurinhas..."
          name="compareCardInput"
          onChange={formHandlerSubmit}
        />

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
      </Form>
    </Modal>
  );
};
