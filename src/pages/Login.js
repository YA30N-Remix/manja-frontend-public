import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions";
import Loading from "../components/loading";
import Hero from "../components/hero";
import Banner from "../components/banner";
import GetResourceValue from "../utils/LanguageResourceHelper";

const Login = ({
  login,
  waitForLogin,
  loginError,
  selectedLanguage,
  resources,
}) => {
  var letterSpacing = "";
  if (selectedLanguage.letterSpacing) {
    letterSpacing = "letter-spacing";
  }

  var direction = "";
  if (selectedLanguage.rtl) {
    direction = "rtl";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Hero>
      <Banner
        title={GetResourceValue(resources, "Login_Login")}
        subtitle={loginError}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            login(email, password);
          }}
        >
          <input
            type="text"
            className="form-control "
            value={email}
            name="email"
            placeholder={GetResourceValue(resources, "Login_EnterYourEmail")}
            onChange={(event) => setEmail(event.target.value)}
          ></input>

          <input
            type="password"
            className="form-control my-2"
            value={password}
            name="password"
            placeholder={GetResourceValue(resources, "Login_EnterYourPassword")}
            onChange={(event) => setPassword(event.target.value)}
          ></input>

          {waitForLogin ? (
            <Loading></Loading>
          ) : (
            <input
              type="submit"
              className={`btn btn-primary w-100 ${letterSpacing}`}
              value={GetResourceValue(resources, "Login_Login")}
            ></input>
          )}
        </form>
        <p className={`mt-5 ${direction}`}>
          <Link to="/register">
            {GetResourceValue(resources, "Login_Register")}
          </Link>
        </p>
      </Banner>
    </Hero>
  );
};

const mapStateToProps = ({
  language: { selectedLanguage, resources },
  user: { waitForLogin, loginError },
}) => {
  return {
    loginError,
    waitForLogin,
    selectedLanguage,
    resources,
  };
};

export default connect(mapStateToProps, {
  login,
})(Login);
