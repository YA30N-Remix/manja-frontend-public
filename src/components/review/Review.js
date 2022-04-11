import React from "react";
import { connect } from "react-redux";

const Review = ({
  review: { user, userAvatar, content, createDate },
  selectedLanguage,
}) => {
  var direction = "";
  var align = "text-end";
  if (selectedLanguage.rtl) {
    direction = "rtl";
    align = "text-start";
  }
  return (
    <div className={`row m-2 border-bottom ${direction}`}>
      <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 ">
        <span>
          <img src={userAvatar} className="rounded-circle m-2" alt={user}></img>
        </span>
        <span>{user}</span>
      </div>
      <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 p-3">
        <p>{content}</p>

        <p className={align}>{createDate.slice(0, 10).split`-`.join`/`}</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ language: { selectedLanguage } }) => {
  return {
    selectedLanguage,
  };
};

export default connect(mapStateToProps)(Review);
