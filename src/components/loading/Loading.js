import React from "react";
import { connect } from "react-redux";
import loadingGif from "../../images/gif/loading-arrow.gif";
import GetResourceValue from "../../utils/LanguageResourceHelper";
import "./Loading.scss";

const Loading = ({ resources, imageOnly }) => {
  return (
    <div className="loading">
      {!imageOnly ? (
        <h4>{GetResourceValue(resources, "Loading_Loading")}</h4>
      ) : (
        <></>
      )}

      <img src={loadingGif} alt="Loading" />
    </div>
  );
};

const mapStateToProps = ({ language: { resources } }) => {
  return {
    resources,
  };
};

export default connect(mapStateToProps, null)(Loading);

Loading.defaultProps = {
  imageOnly: false,
};
