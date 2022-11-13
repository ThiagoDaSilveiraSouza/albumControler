import { useState } from "react";
// style
import "./App.css";

// components
import { CardContainer } from "./components";

// interfaces
import { ICard } from "./interfaces";

// utils
import {
  createDefaultCardList,
  getValueFromLocalStorage,
  setValueOnLocalStorage,
  removeLocalStorage,
  filterCardList,
} from "./utils";

function App() {
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
          currentCard.isChecked = !currentCard.isChecked;
        }
        return currentCard;
      });

      updateLocalStorageCheckedList(updatedCheckedList);
      return updatedCheckedList;
    });
  };

  const resetCheckedList = () => {
    removeLocalStorage(checkedListLocalStorageName);
    setCheckedList(defaultCardList);
  };

  return (
    <div className="App">
      <CardContainer
        cardList={obtainedCards}
        cardHandleClick={cardHandleClick}
        title={"Figurinhas já adquiridas: " + obtainedCards.length}
      />
      <button onClick={resetCheckedList}>Reiniciar lista</button>
      {!!missingCards.length && (
        <CardContainer
          cardList={missingCards}
          cardHandleClick={cardHandleClick}
          title={"Figurinha faltantes: " + missingCards.length}
        />
      )}
    </div>
  );
}

export default App;
