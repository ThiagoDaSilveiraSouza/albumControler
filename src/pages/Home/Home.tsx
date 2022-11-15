import { useState } from "react";

// components
import { CardContainer, FloatMenu, ShareModal } from "./components";

// utils
import {
  createDefaultCardList,
  filterCardList,
  getValueFromLocalStorage,
  removeLocalStorage,
  setValueOnLocalStorage,
} from "../../utils";

// interfaces
import { ICard } from "../../interfaces";
import styled from "styled-components";

const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

export const Home = () => {
  const [shareModalIsOpen, setShareModalIsOpen] = useState(true);
  const checkedListLocalStorageName = "checkedList";
  const cardListfromLocalStorage = getValueFromLocalStorage<ICard[]>(
    checkedListLocalStorageName
  );
  const defaultCardList = createDefaultCardList();
  const [checkedList, setCheckedList] = useState<ICard[]>(
    cardListfromLocalStorage || defaultCardList
  );
  const { missingCards, obtainedCards } = filterCardList(checkedList);

  const updateLocalStorageCheckedList = (checkedList: ICard[]) => {
    setValueOnLocalStorage(checkedListLocalStorageName, checkedList);
  };

  const cardHandleClick = (cardId: string) => {
    setCheckedList((checkedList) => {
      const updatedCheckedList = checkedList.map((currentCard) => {
        const isTargetCard = currentCard.id === cardId;
        if (isTargetCard) {
          const currentCardIsChecked = currentCard.isChecked;
          currentCard.isChecked = !currentCardIsChecked;
          if (currentCardIsChecked) {
            currentCard.quantity = 0;
          } else {
            currentCard.quantity = 1;
          }
          console.log("quantity", currentCard.quantity);
        }
        return currentCard;
      });

      updateLocalStorageCheckedList(updatedCheckedList);
      return updatedCheckedList;
    });
  };

  const addOrRemoveQuantity = (
    id: string,
    addOrRemove: "add" | "remove" = "add",
    quantity: number = 1
  ) => {
    setCheckedList((checkedList) => {
      const updatedCheckedList = checkedList.map((currentCard) => {
        const isCurrentCard = currentCard.id === id;

        if (isCurrentCard) {
          if (addOrRemove === "add") {
            currentCard.quantity = currentCard.quantity + quantity;
          } else if (addOrRemove === "remove") {
            const quantityIsGreaterOne = currentCard.quantity > 1;
            if (quantityIsGreaterOne) {
              currentCard.quantity = currentCard.quantity - quantity;
            } else {
              currentCard.quantity = 0;
              currentCard.isChecked = false;
            }
          }
        }

        return currentCard;
      });
      return updatedCheckedList;
    });
  };

  const resetCheckedList = () => {
    removeLocalStorage(checkedListLocalStorageName);
    setCheckedList(defaultCardList);
  };

  return (
    <HomeContainer>
      <CardContainer
        cardList={obtainedCards}
        cardHandleClick={cardHandleClick}
        title={"Figurinha faltantes: " + obtainedCards.length}
      />
      <button onClick={resetCheckedList}>Reiniciar lista</button>
      {!!missingCards.length && (
        <CardContainer
          cardList={missingCards}
          cardHandleClick={cardHandleClick}
          title={"Figurinhas já adquiridas: " + missingCards.length}
          showQuantity
          addOrRemoveQuantity={addOrRemoveQuantity}
        />
      )}
      <ShareModal
        useModal={[shareModalIsOpen, setShareModalIsOpen]}
        missingCards={missingCards}
      />
      <FloatMenu setShareModalIsOpen={setShareModalIsOpen} />
    </HomeContainer>
  );
};
