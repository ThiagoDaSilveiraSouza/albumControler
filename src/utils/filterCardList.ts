import { ICard } from "../interfaces";

interface IFilteredCardList {
  obtainedCards: ICard[];
  missingCards: ICard[];
}

export const filterCardList = (cardList: ICard[]): IFilteredCardList => {
  return cardList.reduce<IFilteredCardList>(
    (filteredCardList, currentCard) => {
      const currentCardIsChecked = currentCard.isChecked;

      if (currentCardIsChecked) {
        filteredCardList.missingCards.push(currentCard);
      } else {
        filteredCardList.obtainedCards.push(currentCard);
      }
      return filteredCardList;
    },
    { obtainedCards: [], missingCards: [] } as IFilteredCardList
  );
};
