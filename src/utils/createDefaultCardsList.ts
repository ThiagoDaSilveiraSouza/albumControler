import { ICard } from "../interfaces";

const createNewCard = (currentItem: any, id: number) => {
  const isEspecialCard = id > 179;
  const currentId = isEspecialCard
    ? `Y${(id - 79).toString().substring(1)}`
    : `${id + 1}`;

  currentItem = {
    id: currentId,
    name: `Card ${currentId}`,
    imgPath: "",
    isChecked: true,
  };

  return currentItem;
};

export const createDefaultCardList = (): ICard[] =>
  Array(192).fill("").map(createNewCard);
