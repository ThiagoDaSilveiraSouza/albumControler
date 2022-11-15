import styled from "styled-components";

interface ICloseButton {
  position?: PositionOptions;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  background?: string;
  iconColor?: string;
  hoverIconColor?: string;
  border?: string;
  size?: string;
}

export const CloseButton = styled.button<ICloseButton>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  ${({ position, top, right, bottom, left, border, size, background }) => {
    return `
        position: ${position || "absolute"};
        top: ${top || "10px"};
        right: ${right || "10px"};
        bottom: ${bottom || "none"};
        left: ${left || "none"};
        width: ${size || "20px"};
        height: ${size || "20px"};
        border: ${border || "none"};
        background: ${background || "none"};
    `;
  }}
  :hover {
    border: none;
    box-shadow: none;
    transform: scale(1.05);
    ::before,
    ::after {
      background: ${({ hoverIconColor }) => hoverIconColor || "red"};
      box-shadow: 0 0 3px 0 black;
    }
  }

  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background: ${({ iconColor }) => iconColor || "black"};

    transition: 0.3s;
  }

  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;
