import { FC } from "react";
import styled from "styled-components";

// interfaces
import { ICard } from "../../interfaces";

const CardContainerStyle = styled.div`
  user-select: none;
  h2 {
    margin: 40px 0;
    text-align: center;
  }
  > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

interface ICardStyle {
  isChecked?: boolean;
}

const CardStyle = styled.div<ICardStyle>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 70px;
  border: 1px solid ${({ isChecked }) => (isChecked ? "green" : "black")};
  color: ${({ isChecked }) => (isChecked ? "green" : "black")};
  box-shadow: ${({ isChecked }) => (isChecked ? "0 0 4px 0 green" : "none")};
  font-weight: ${({ isChecked }) => (isChecked ? "bolder" : "none")};
  user-select: none;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    border: 1px solid ${({ isChecked }) => (!isChecked ? "green" : "black")};
    color: ${({ isChecked }) => (!isChecked ? "green" : "black")};
    box-shadow: ${({ isChecked }) => (!isChecked ? "0 0 4px 0 green" : "none")};
    font-weight: ${({ isChecked }) => (!isChecked ? "bolder" : "none")};
  }

  strong {
    font-size: 25px;
  }
`;

interface ICardComponent {
  currentCard: ICard;
  cardHandleClick: Function;
}

const CardComponent: FC<ICardComponent> = ({
  currentCard,
  cardHandleClick,
}) => {
  return (
    <CardStyle
      isChecked={currentCard.isChecked}
      onClick={() => cardHandleClick(currentCard.id)}
    >
      <span>{currentCard.id}</span>
    </CardStyle>
  );
};

interface ICardContainer {
  cardList?: ICard[];
  cardHandleClick: Function;
  title?: string;
}
export const CardContainer: FC<ICardContainer> = ({
  cardList,
  cardHandleClick,
  title,
}) => {
  return (
    <CardContainerStyle className="centralizer">
      {title && <h2>{title}</h2>}
      <div>
        {cardList?.map((currentCard) => (
          <CardComponent
            key={currentCard.id}
            currentCard={currentCard}
            cardHandleClick={cardHandleClick}
          />
        ))}
      </div>
    </CardContainerStyle>
  );
};
