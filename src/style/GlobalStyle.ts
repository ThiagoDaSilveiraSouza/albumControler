import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
    margin: 0;
}

.centralizer {
  margin: 0 auto;
  max-width: 95vw;
  width: 1000px;
  padding: 50px 0;
}

.App {
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;
