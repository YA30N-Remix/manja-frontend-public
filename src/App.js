import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import LanguageAndResourcesInitializer from "./components/language-and-resources-initializer/LanguageAndResourcesInitializer";

function App() {
  return (
    <React.Fragment>
      <LanguageAndResourcesInitializer />
      <Router>
        <Routes />
      </Router>
    </React.Fragment>
  );
}

export default App;
