import React, { lazy, Suspense } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

//CSS
import "../assets/css/authLayout.css";

//Core Components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";
import login from "assets/img/login.jpeg";
import InlineLoader from "components/Loader/InlineLoader";

const LoginPageView = lazy(() => import("../views/Auth/LoginPage.js"));
const ConfirmEmailView = lazy(() => import("../views/Auth/ConfirmEmail.js"));
const ForgotPasswordView = lazy(() => import("../views/Auth/ForgotPassword.js"));
const ErrorPageView = lazy(() => import("../views/Auth/ErrorPage.js"));
const useStyles = makeStyles(styles);

export default function Pages() {
  // styles
  const classes = useStyles();
  const state = useSelector(state => state.auth);

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.fullPage} style={{ backgroundImage: "url(" + login + ")" }}>
          <Suspense fallback={<InlineLoader />}>
            <Switch>
              <Route path={"/auth/login"} component={LoginPageView} />
              {!state.Token && 
                [
                <Route key={"confirmemail"} path={`/auth/confirmemail/:token`} component={ConfirmEmailView} />,
                <Route key={"forgotpassword"} path={`/auth/forgotpassword`} component={ForgotPasswordView} />
                ]
              }
              <Route path={`/auth/error-page`} component={ErrorPageView} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
