import { useEffect, useLayoutEffect, useState } from "react";

import M_SVG from "../M_SVG";
import Arquitetura30SVG from "../Arquitetura30SVG";

import * as S from "./styles";

export function LogoAnimation() {
  const [logoColor, setLogoColor] = useState(false);

  const numberElements = 9;
  const elementsArray = Array.from({ length: numberElements }).map(
    (_item, index) => (
      <M_SVG
        key={index}
        fill={logoColor ? "#fff" : "none"}
        stroke={"#fff"}
        strokeWidth={"5"}
      />
    )
  );

  useEffect(() => {
    const changeM_Color = setTimeout(() => {
      setLogoColor(true);
    }, 3240);

    return () => {
      clearTimeout(changeM_Color);
    };
  }, []);

  return (
    <S.Container>
      {elementsArray}
      <Arquitetura30SVG />
    </S.Container>
  );
}
