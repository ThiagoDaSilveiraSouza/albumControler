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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 110px;
  border: 1px solid ${({ isChecked }) => (isChecked ? "green" : "black")};
  color: ${({ isChecked }) => (isChecked ? "green" : "black")};
  background: white;
  box-shadow: ${({ isChecked }) => (isChecked ? "0 0 4px 0 green" : "none")};
  font-weight: ${({ isChecked }) => (isChecked ? "bolder" : "none")};
  user-select: none;
  cursor: pointer;
  :hover {
    transform: scale(1.5);
    border: 1px solid ${({ isChecked }) => (!isChecked ? "green" : "black")};
    color: ${({ isChecked }) => (!isChecked ? "green" : "black")};
    box-shadow: ${({ isChecked }) => (!isChecked ? "0 0 4px 0 green" : "none")};
    font-weight: ${({ isChecked }) => (!isChecked ? "bolder" : "none")};
    z-index: 100;
  }
`;

const IdNumber = styled.span`
  font-size: 20px;
`;

const QuantityContainer = styled.span`
  position: absolute;
  top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 25px;
  height: 25 px;
  overflow: hidden;
`;
interface ICardComponent {
  currentCard: ICard;
  cardHandleClick: Function;
  showQuantity?: boolean;
  addOrRemoveQuantity?: Function;
}

const CardComponent: FC<ICardComponent> = ({
  currentCard,
  cardHandleClick,
  showQuantity,
  addOrRemoveQuantity,
}) => {
  return (
    <CardStyle
      isChecked={currentCard.isChecked}
      onClick={() => !addOrRemoveQuantity && cardHandleClick(currentCard.id)}
    >
      {showQuantity && (
        <QuantityContainer>
          <QuantityButton
            onClick={() =>
              addOrRemoveQuantity &&
              addOrRemoveQuantity(currentCard.id, "remove")
            }
          >
            -
          </QuantityButton>
          {currentCard.quantity}
          <QuantityButton
            onClick={() =>
              addOrRemoveQuantity && addOrRemoveQuantity(currentCard.id)
            }
          >
            +
          </QuantityButton>
        </QuantityContainer>
      )}
      <IdNumber>{currentCard.id}</IdNumber>
    </CardStyle>
  );
};

interface ICardContainer {
  cardList?: ICard[];
  cardHandleClick: Function;
  addOrRemoveQuantity?: Function;
  title?: string;
  showQuantity?: boolean;
}
export const CardContainer: FC<ICardContainer> = ({
  cardList,
  cardHandleClick,
  title,
  showQuantity,
  addOrRemoveQuantity,
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
            showQuantity={showQuantity}
            addOrRemoveQuantity={addOrRemoveQuantity}
          />
        ))}
      </div>
    </CardContainerStyle>
  );
};
