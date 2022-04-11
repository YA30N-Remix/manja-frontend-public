import React from "react";
import { connect } from "react-redux";
import "./Banner.scss";

const Banner = ({ children, title, subtitle, selectedLanguage, banner }) => {
  var letterSpacing = "";
  var direction = "";
  if (selectedLanguage.letterSpacing) {
    letterSpacing = "letter-spacing";
  }
  if (selectedLanguage.rtl) {
    direction = "rtl";
  }

  return (
    <div className={`${banner} ${letterSpacing}`}>
      <h1 className={`${direction}`}>{title}</h1>
      <div className="divider" />
      <p className={`${direction}`}>{subtitle}</p>
      {children}
    </div>
  );
};

Banner.defaultProps = {
  banner: "banner",
};

const mapStateToProps = ({ language: { selectedLanguage } }) => {
  return {
    selectedLanguage,
  };
};

export default connect(mapStateToProps)(Banner);
