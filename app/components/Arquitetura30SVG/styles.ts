import styled, { keyframes } from "styled-components";

const elementHeight = "100px";

const show30arquitetura = keyframes`
  to {
    visibility: visible;
  }
`;

export const Arquitetura30 = styled.svg`
  right: 21.8%;
  top: 39.2%;
  position: absolute;
  visibility: hidden;
  height: calc(0.819 * ${elementHeight});
  animation: ${show30arquitetura} 0s linear 3.25s forwards;
  -webkit-animation: ${show30arquitetura} 0s linear 3.25s forwards;
`;
