import React from "react";
import './Hero.scss';

export default function Hero({ children, hero, img }) {
  return <header className={hero} style={img?{background:`url("${img}") center/cover no-repeat`}:{}}>{children}</header>;
}

Hero.defaultProps = {
  hero: "defaultHero"
};
