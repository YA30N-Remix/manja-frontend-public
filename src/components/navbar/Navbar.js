import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { connect } from "react-redux";
import { handleToggleLanguageSelectorModal } from "../../store/actions";
import GetResourceValue from "../../utils/LanguageResourceHelper";

class Navbar extends Component {
  state = {
    isOpen: false,
  };
  handleToggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    var letterSpacing = "";
    if (this.props.selectedLanguage.letterSpacing) {
      letterSpacing = "letter-spacing";
    }

    return (
      <nav className="navbar">
        <div className="nav-center w-100">
          <div className="nav-header">
            <button
              type="button"
              className="nav-btn-language "
              data-test-id="toggle-language-selector-modal"
              onClick={this.props.handleToggleLanguageSelectorModal}
            >
              <i className="fa fa-globe nav-icon" aria-hidden="true"></i>
            </button>

            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggleMenu}
            >
              <i className="fa fa-align-right nav-icon" aria-hidden="true"></i>
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link className={`${letterSpacing}`} to="/">
                {GetResourceValue(
                  this.props.resources,
                  "LanguageSelector_Home"
                )}
              </Link>
            </li>
            <li>
              <Link className={`${letterSpacing}`} to="/search">
                {GetResourceValue(
                  this.props.resources,
                  "LanguageSelector_Search"
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ language: { resources, selectedLanguage } }) => {
  return {
    resources,
    selectedLanguage,
  };
};

export default connect(mapStateToProps, { handleToggleLanguageSelectorModal })(
  Navbar
);
