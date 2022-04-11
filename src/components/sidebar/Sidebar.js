import React from "react";
import { connect } from "react-redux";
import { DoesUserHavePermission, IsUserInRole } from "../../utils/AuthHelper";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/actions";
import InlineLoading from "../inline-loading";

function Sidebar({ auth, waitForLogout, logout }) {
  const location = useLocation();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px" }}
    >
      <a
        href="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <i className="bi me-2 fa fa-cube" width="40" height="32"></i>
        <span className="fs-4">Dashboard</span>
      </a>
      <hr></hr>
      <ul className="nav nav-pills flex-column mb-auto">
        {DoesUserHavePermission(auth.permissions, "Restaurant_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/restaurant"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/restaurant")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Restaurant
            </Link>
          </li>
        ) : null}

        {IsUserInRole(auth.roles, "Admin") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/permission"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/permission")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Permission
            </Link>
          </li>
        ) : null}

        {IsUserInRole(auth.roles, "Admin") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/role"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/role")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Role
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Language_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/language"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/language")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Language
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Resource_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/resource"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/resource")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Resource
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Allergy_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/allergy"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/allergy")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Allergy
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "FoodOrigin_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/food-origin"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/food-origin")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Food Origin
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "FoodType_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/food-type"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/food-type")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Food Type
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Practice_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/practice"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/practice")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Practice
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Taste_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/taste"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/taste")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Taste
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Temperature_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/temperature"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/temperature")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Temperature
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Ingredient_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/ingredient"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/ingredient")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Ingredient
            </Link>
          </li>
        ) : null}

        {DoesUserHavePermission(auth.permissions, "Nutrition_Read") ? (
          <li className="nav-item">
            <Link
              to="/dashboard/nutrition"
              className={`nav-link ${
                location.pathname.startsWith("/dashboard/nutrition")
                  ? "active"
                  : "link-dark"
              }`}
            >
              <i className="bi me-2 fa fa-cube" width="16" height="16"></i>
              Nutrition
            </Link>
          </li>
        ) : null}
      </ul>
      <hr></hr>
      <div>
        {waitForLogout ? (
          <>
            <button type="button" disabled className="btn">
              <i className="fa fa-sign-out me-2" width="16" height="16"></i>
              Logout
            </button>
            <InlineLoading />
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              logout(auth.token, auth.refreshToken);
            }}
            className="btn"
          >
            <i className="fa fa-sign-out me-2" width="16" height="16"></i>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ user: { auth, waitForLogout } }) => {
  return {
    auth,
    waitForLogout,
  };
};

export default connect(mapStateToProps, { logout })(Sidebar);
