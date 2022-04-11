import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { connect } from "react-redux";
import Loading from "./components/loading/Loading";
import MainLayout from "./layouts/main-layout/MainLayout";
import DashboardLayout from "./layouts/dashboard-layout/DashboardLayout";
import FoodTypeIndex from "./pages/dashboard/food-type/FoodTypeIndex";
import FoodTypeCreate from "./pages/dashboard/food-type/FoodTypeCreate";
import FoodTypeEdit from "./pages/dashboard/food-type/FoodTypeEdit";
const Routes = ({
  auth,
  gettingLanguagesSucceeded,
  gettingMainResourceFileDataSucceeded,
  resourcesAreReady,
}) => {
  return (
    <>
      {gettingLanguagesSucceeded &&
      gettingMainResourceFileDataSucceeded &&
      resourcesAreReady ? (
        <Switch>
          <Route
            path={[
              "/dashboard", 
              "/dashboard/food-type",
              "/dashboard/food-type/create",
              "/dashboard/food-type/edit/:foodTypeId"
            ]}
          >
            <DashboardLayout>
              <Switch>
                <Route exact path="/dashboard">
                  {auth.token ? <Dashboard /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/dashboard/food-type">
                  {auth.token ? <FoodTypeIndex /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/dashboard/food-type/create">
                  {auth.token ? <FoodTypeCreate /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/dashboard/food-type/edit/:foodTypeId">
                  {auth.token ? <FoodTypeEdit /> : <Redirect to="/login" />}
                </Route>
              </Switch>
            </DashboardLayout>
          </Route>

          <Route
            exact
            path={[
              "/",
              "/login",
              "/register",
              "/search/",
              "/restaurant/:slug",
            ]}
          >
            <MainLayout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login">
                  {auth.token ? <Redirect to="/dashboard" /> : <Login />}
                </Route>
                <Route exact path="/register">
                  {auth.token ? <Redirect to="/" /> : <Register />}
                </Route>
                <Route exact path="/restaurant/:slug" component={Restaurant} />
              </Switch>
            </MainLayout>
          </Route>
          <MainLayout>
            <Route component={Error} />
          </MainLayout>
        </Switch>
      ) : (
        <Loading imageOnly={true}></Loading>
      )}
    </>
  );
};

const mapStateToProps = ({
  user: { auth },
  language: {
    gettingLanguagesSucceeded,
    gettingMainResourceFileDataSucceeded,
    resourcesAreReady,
  },
}) => {
  return {
    auth,
    gettingLanguagesSucceeded,
    gettingMainResourceFileDataSucceeded,
    resourcesAreReady,
  };
};

export default connect(mapStateToProps)(Routes);
