import styled, { keyframes } from "styled-components";

const elementHeight = "100px";

const showContainer = keyframes`
  to {
    visibility: visible;
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: grid;
  margin-bottom: 16.5px;
  opacity: 0;
  visibility: hidden;
  position: relative;
  align-items: center;
  justify-items: center;
  width: calc(3 * ${elementHeight});
  height: calc(3 * ${elementHeight});
  grid-template-columns: repeat(3, 1fr);
  animation: ${showContainer} 1s linear 1.25s forwards;
  -webkit-animation: ${showContainer} 1s linear 1.25s forwards;
`;
