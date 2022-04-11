import React from "react";
import { connect } from "react-redux";
import {
  getLanguages,
  getMainResourceFileData,
  selectLanguage,
} from "../../store/actions";

export const LanguageAndResourcesInitializer = ({
  selectedLanguage,
  gettingLanguagesSucceeded,
  gettingMainResourceFileDataSucceeded,

  getLanguages,
  getMainResourceFileData,
  selectLanguage,
}) => {
  React.useEffect(() => {
    getLanguages();
    getMainResourceFileData();
  }, [getLanguages, getMainResourceFileData]);

  React.useEffect(() => {
    if (gettingLanguagesSucceeded && gettingMainResourceFileDataSucceeded) {
      selectLanguage(selectedLanguage);
    }
  }, [
    gettingLanguagesSucceeded,
    gettingMainResourceFileDataSucceeded,
    selectLanguage,
  ]);

  return <></>;
};

const mapStateToProps = ({
  user: { selectedLanguage },
  language: { gettingLanguagesSucceeded, gettingMainResourceFileDataSucceeded },
}) => {
  return {
    selectedLanguage,
    gettingLanguagesSucceeded,
    gettingMainResourceFileDataSucceeded,
  };
};

export default connect(mapStateToProps, {
  getLanguages,
  getMainResourceFileData,
  selectLanguage,
})(LanguageAndResourcesInitializer);
