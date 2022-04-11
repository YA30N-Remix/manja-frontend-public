import React from "react";
import loadingGif from "../../images/gif/loading-arrow.gif";
import "./InlineLoading.scss";

const InlineLoading = () => {
  return <img src={loadingGif} alt="Loading" className="inline-loading" />;
};

export default InlineLoading;
