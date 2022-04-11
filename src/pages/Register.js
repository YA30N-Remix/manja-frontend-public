import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions";
import Loading from "../components/loading";
import Hero from "../components/hero";
import Banner from "../components/banner";
import GetResourceValue from "../utils/LanguageResourceHelper";

const Register = ({
  register,
  waitForRegister,
  registerError,
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      setLocalError("");
      register(name, email, password);
    } else {
      setLocalError("PasswordsDoNotMach");
    }
  };

  return (
    <Hero>
      <Banner
        title={GetResourceValue(resources, "Register_Register")}
        subtitle={localError ? localError : registerError}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            className="form-control "
            value={name}
            name="name"
            placeholder={GetResourceValue(resources, "Register_EnterYourName")}
            onChange={(event) => setName(event.target.value)}
          ></input>

          <input
            type="text"
            className="form-control my-2"
            value={email}
            name="email"
            placeholder={GetResourceValue(resources, "Register_EnterYourEmail")}
            onChange={(event) => setEmail(event.target.value)}
          ></input>

          <input
            type="password"
            className="form-control my-2"
            value={password}
            name="password"
            placeholder={GetResourceValue(
              resources,
              "Register_EnterYourPassword"
            )}
            onChange={(event) => setPassword(event.target.value)}
          ></input>

          <input
            type="password"
            className="form-control my-2"
            value={confirmPassword}
            name="confirmPassword"
            placeholder={GetResourceValue(
              resources,
              "Register_EnterYourPasswordAgain"
            )}
            onChange={(event) => setConfirmPassword(event.target.value)}
          ></input>

          {waitForRegister ? (
            <Loading></Loading>
          ) : (
            <input
              type="submit"
              className={`btn btn-primary w-100 ${letterSpacing}`}
              value={GetResourceValue(resources, "Register_Register")}
            ></input>
          )}
        </form>
        <p className="mt-5">
          <Link to="/login">
            {GetResourceValue(resources, "Register_Login")}
          </Link>
        </p>
      </Banner>
    </Hero>
  );
};

const mapStateToProps = ({
  language: { selectedLanguage, resources },
  user: { waitForRegister, registerError },
}) => {
  return {
    registerError,
    waitForRegister,
    selectedLanguage,
    resources,
  };
};

export default connect(mapStateToProps, {
  register,
})(Register);
