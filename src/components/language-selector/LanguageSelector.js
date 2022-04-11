import React from "react";
import { connect } from "react-redux";
import {
  selectLanguage,
  handleToggleLanguageSelectorModal,
} from "../../store/actions";
import GetResourceValue from "../../utils/LanguageResourceHelper";
import Hero from "../hero";
import "./LanguageSelector.scss";

const Language = ({
  languages,
  selectedLanguage,
  showLanguageSelectorModal,
  resources,
  selectLanguage,
  handleToggleLanguageSelectorModal,
}) => {
  var letterSpacing = "";
  if (selectedLanguage.letterSpacing) {
    letterSpacing = "letter-spacing";
  }

  return (
    showLanguageSelectorModal && (
      <Hero>
        <div className="card text-center language-selector">
          <div className="card-header">
            {GetResourceValue(resources, "LanguageSelector_ChooseYourLanguage")}
          </div>
          <div className="card-body language-panel">
            {languages.map((item) => (
              <div
                key={item.id}
                className={
                  item.id === selectedLanguage.id
                    ? "d-flex justify-content-between border selected-language text-white"
                    : "} d-flex justify-content-between border normal-language"
                }
                onClick={() => selectLanguage(item)}
              >
                <div>
                  <i className="fa fa-globe m-3" aria-hidden="true"></i>
                  <span className="">{item.localName}</span>
                </div>
                {item.id === selectedLanguage.id && (
                  <i className="fa fa-check m-3" aria-hidden="true"></i>
                )}
              </div>
            ))}
          </div>
          <div className="card-footer text-muted">
            <button
              type="button"
              className={`btn btn-primary ${letterSpacing}`}
              data-test-id="close-language-selector-modal"
              onClick={handleToggleLanguageSelectorModal}
            >
              <i className="fa fa-close me-2" aria-hidden="true"></i>
              {GetResourceValue(resources, "LanguageSelector_Close")}
            </button>
          </div>
        </div>
      </Hero>
    )
  );
};

const mapStateToProps = ({
  language: {
    languages,
    selectedLanguage,
    resources,
    showLanguageSelectorModal,
  },
}) => {
  return {
    languages,
    selectedLanguage,
    resources,
    showLanguageSelectorModal,
  };
};

export default connect(mapStateToProps, {
  selectLanguage,
  handleToggleLanguageSelectorModal,
})(Language);
