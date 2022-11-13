import { FC } from "react";
import styled from "styled-components";

// interfaces
import { ICard } from "../../interfaces";

const CardContainerStyle = styled.div`
  user-select: none;
  overflow: hidden;
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
  quantity: number;
}

const CardStyle = styled.div<ICardStyle>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 80px;
  height: 100px;
  background: white;
  user-select: none;
  cursor: pointer;

  ${({ isChecked, quantity }) => {
    if (isChecked) {
      const haveRepeatedCard = quantity > 1;
      if (haveRepeatedCard) {
        return `
          border: 1px solid orange;
          color: orange;
          box-shadow: 0 0 2px 0 orange;
          `;
      }
      return `
        border: 1px solid green;
        color: green;
        box-shadow: 0 0 2px 0 green;
        `;
    } else {
      return `
        border: 1px solid black;
        color: black;
        box-shadow: 0 0 2px 0 black;
      `;
    }
  }}
  :hover {
    transform: scale(1.5);
    z-index: 100;

    ${({ isChecked, quantity }) => {
      if (isChecked) {
        const haveRepeatedCard = quantity > 1;
        if (haveRepeatedCard) {
          return `
          color: orange;
          `;
        }
        return `
        box-shadow: 0 0 4px 0 green;
        `;
      } else {
        return `
        box-shadow: 0 0 4px 0 black;
      `;
      }
    }}
  }
`;

const IdNumber = styled.span`
  font-size: 20px;
`;

interface IQuantityContainer {
  isChecked: boolean;
  quantity: number;
}
const QuantityContainer = styled.span<IQuantityContainer>`
  top: 5px;
  display: flex;
  align-items: center;
  gap: 3px;

  > button {
    ${({ isChecked, quantity }) => {
      if (isChecked) {
        const haveRepeatedCard = quantity > 1;
        if (haveRepeatedCard) {
          return `
          border: 1px solid orange;
          color: orange;
          `;
        }
        return `
        border: 1px solid green;
        color: green;
        `;
      } else {
        return `
        border: 1px solid black;
        color: black;
      `;
      }
    }}
  }
  strong {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
`;

interface IQuantityButton {
  buttonType: "add" | "remove";
}

const QuantityButton = styled.button<IQuantityButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 25px;
  height: 25px;
  border-radius: 0;
  overflow: hidden;

  :hover {
    ${({ buttonType }) => {
      if (buttonType === "add") {
        return `
        box-shadow: 0 0 3px 0 green;
        color: green;
        border:1px solid green  ;
        `;
      } else if (buttonType === "remove") {
        return `
        box-shadow: 0 0 3px 0 red;
        color: red;
        border:1px solid red;
        `;
      }
    }}
  }
  :focus {
    outline: none;
  }
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
      quantity={currentCard.quantity}
      onClick={() => !addOrRemoveQuantity && cardHandleClick(currentCard.id)}
    >
      {showQuantity && (
        <QuantityContainer
          isChecked={currentCard.isChecked}
          quantity={currentCard.quantity}
        >
          <QuantityButton
            buttonType="remove"
            onClick={() =>
              addOrRemoveQuantity &&
              addOrRemoveQuantity(currentCard.id, "remove")
            }
          >
            -
          </QuantityButton>
          <strong>{currentCard.quantity}</strong>
          <QuantityButton
            buttonType="add"
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
