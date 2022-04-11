import React from "react";
import './Cover.scss';

export default function Cover({ children, cover, img }) {
  return <div className={cover} style={img?{background:`url("${img}") center/cover no-repeat`}:{}}>{children}</div>;
}

Cover.defaultProps = {
  cover: "defaultCover"
};
