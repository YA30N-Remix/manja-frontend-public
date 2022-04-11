import React from "react";
import { connect } from "react-redux";
import GetResourceValue from "../../utils/LanguageResourceHelper";

const ValidationFeedback = ({ detect, responseMessages, name, resources }) => {
  const feedback = responseMessages.find((item) => item.name === name);
  return (
    <div
      className={`ltr ${
        detect ? (feedback ? "invalid-feedback" : "valid-feedback") : ""
      }`}
    >
      {detect ? (
        feedback ? (
          GetResourceValue(resources, feedback.message)
        ) : (
          <>Looks good!</>
        )
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ language: { resources } }) => {
  return {
    resources,
  };
};

export default connect(mapStateToProps, null)(ValidationFeedback);
