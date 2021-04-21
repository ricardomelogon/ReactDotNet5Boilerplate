import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store, { persistor } from './redux/store/store';
import { Provider } from 'react-redux';
import axiosInterceptors from "./services/config/axiosInterceptors";
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import Alert from 'components/Alert/Alert';
import Loader from 'components/Loader/Loader';
import Toast from "components/Toast/Toast";
import InlineLoader from "components/Loader/InlineLoader";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

const AuthLayout = lazy(() => import("layouts/Auth.js"));
const HomeLayout = lazy(() => import("layouts/Home.js"));

axiosInterceptors.interceptor(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<InlineLoader />}>
        <Alert />
        <Loader />
        <Toast />
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <BrowserRouter>
            <Switch>
              <Route path="/auth" component={AuthLayout} />
              <Route path={["/home"]} component={HomeLayout} />
              <Redirect from="/" to="/auth" />
            </Switch>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
