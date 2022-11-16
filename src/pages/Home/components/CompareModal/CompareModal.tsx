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

// interfaces
import { ICard } from "../../../../interfaces";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

interface ICompareModalContainer {
  isCopiedToClipBoard: boolean;
}

const CompareModalContainer = styled.div<ICompareModalContainer>`
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
  }, []);

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
      <CompareModalContainer isCopiedToClipBoard={isCopiedToClipBoard}>
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
      </CompareModalContainer>
    </Modal>
  );
};
