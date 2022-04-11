import React, { useEffect } from "react";
import Language from "../../components/language-selector/LanguageSelector";
import Navbar from "../../components/navbar";
import { connect } from "react-redux";
import "./MainLayout.scss";

const MainLayout = ({ showLanguageSelectorModal, children }) => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    document.body.classList.add("main-layout");
    return () => {
      // Anything in here is fired on component unmount.
      document.body.classList.remove("main-layout");
    };
  }, []);
  return (
    <>
      <Navbar />
      {showLanguageSelectorModal ? <Language /> : children}
    </>
  );
};

const mapStateToProps = ({ language: { showLanguageSelectorModal } }) => {
  return {
    showLanguageSelectorModal,
  };
};

export default connect(mapStateToProps, null)(MainLayout);
