import styled, { keyframes } from "styled-components";

type HomeProps = {
  splashScreen: boolean;
};

const showContent = keyframes`
  to {
    visibility: visible;
  }
`;

const moveUpLogo = keyframes`
  to {
    top: 32px;
  }
`;

const changeLogoColor = keyframes`
  to {
    fill: #1d1d1f;
  }
`;

export const Home = styled.section<HomeProps>`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  position: relative;
  background: #1d1d1f;
  align-items: center;
  flex-direction: column;
  justify-content: ${(props) =>
    props.splashScreen ? "center" : "space-between"};

  header {
    width: 100%;
    height: 117px;
    display: ${(props) => (props.splashScreen ? "none" : "flex")};
  }

  header svg {
    position: absolute;
    visibility: hidden;
    top: calc(50% - 40.945px);
    right: calc(50% - 85.055px);
    animation: ${showContent} 0s linear 0s forwards,
      ${moveUpLogo} 1s cubic-bezier(0.77, 0, 0.175, 1) 0.35s forwards;
    -webkit-animation: ${showContent} 0s linear 0s forwards,
      ${moveUpLogo} 1s cubic-bezier(0.77, 0, 0.175, 1) 0.35s forwards;
  }

  header svg path {
    animation: ${changeLogoColor} 0.15s linear 0.5s forwards;
    -webkit-animation: ${changeLogoColor} 0.15s linear 0.5s forwards;
  }

  main {
    color: #1d1d1f;
    font-size: 22px;
    font-weight: 300;
    visibility: hidden;
    position: relative;
    text-align: center;
    font-family: "Lora";
    animation: ${showContent} 0s linear 0.75s forwards;
    -webkit-animation: ${showContent} 0s linear 0.75s forwards;
    display: ${(props) => (props.splashScreen ? "none" : "flex")};

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  footer {
    width: 100%;
    color: #1d1d1f;
    display: flex;
    position: relative;
    visibility: hidden;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    animation: ${showContent} 0s linear 0.2s forwards;
    -webkit-animation: ${showContent} 0s linear 0.2s forwards;
    display: ${(props) => (props.splashScreen ? "none" : "flex")};

    p {
      width: 100%;
      font-size: 16px;
      text-align: center;
      font-family: "Lora";

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    nav {
      gap: 16px;
      width: 100%;
      display: flex;
      color: #1d1d1f;
      margin: 4px 0 16px 0;
      justify-content: center;

      a {
        padding: 8px;
        display: flex;
      }

      a svg {
        color: #1d1d1f;
      }
    }
  }
`;

const changeBackground = keyframes`
  to {
    clip-path: inset(0% 0 0 0);
  }
`;

export const Background = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  clip-path: inset(100% 0 0 0);
  animation: ${changeBackground} 1.5s cubic-bezier(0.77, 0, 0.175, 1) 4s
    forwards;
  -webkit-animation: ${changeBackground} 1.5s cubic-bezier(0.77, 0, 0.175, 1) 4s
    forwards;
`;
