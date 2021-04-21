import React, { useEffect, useState, createRef, lazy, Suspense } from "react";
import cx from "classnames";
import { Switch, Redirect, Route } from "react-router-dom";
import uuid from "../helpers/uuid";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

//Authorization
import Permissions, { PermissionActions } from "../permissions/Permissions";

//Redux
import { useSelector } from 'react-redux';

//Styling
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

// core components
import InlineLoader from "components/Loader/InlineLoader";

const AdminNavbar = lazy(() => import("./components/Navbars/AdminNavbar.js"));
const HomeSidebar = lazy(() => import("./components/Sidebar/HomeSidebar.js"));

//Views
const WelcomeView = lazy(() => import("../views/Home/Welcome"));
const RegisterSysAdminView = lazy(() => import("../views/User/RegisterSysAdmin"));
const SystemAdminList = lazy(() => import("../views/User/SystemAdminList"));
const ErrorLogsView = lazy(() => import("../views/ErrorLogs/ErrorLogs"));
const EmailConfigView = lazy(() => import("../views/EmailConfig/EmailConfig"));

var ps;

const useStyles = makeStyles(styles);

export default function Home(props) {
  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const state = useSelector(state => state.auth);
  const [authCheck, setAuthCheck] = useState(null);
  // styles
  const classes = useStyles();
  const mainPanelClasses = `${classes.mainPanel} ${cx({ [classes.mainPanelSidebarMini]: miniActive, [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1 })}`;
  // ref for main panel div
  const mainPanel = createRef();

  //Redirection
  useEffect(() => {
    if (state.Token) setAuthCheck(null);
    else setAuthCheck(<Redirect to="/auth/login" />);
  }, [state.Token]);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      {authCheck}
      <HomeSidebar
        image={require("assets/img/sidebar-1.jpg")}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        bgColor={"black"}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <MainContent classes={classes} state={state} />
      </div>
    </div>
  );
}

const MainContent = React.memo(function mainConent(props) {
  const classes = props.classes;
  const state = props.state;

  // const StopScroll = () => {
  //   if (navigator.platform.indexOf("Win") > -1 && ps) {
  //     ps.destroy();
  //   }
  // }

  // const ResumeScroll = () => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  // }

  return (
    <div id="mainContent" className={classes.content}>
      <div className={`${classes.container} container`}>
        <Suspense fallback={<InlineLoader />}>
          <Switch>
            <Route path={`/home/welcome`} component={WelcomeView} />
            {
              !state.Token ? null :
                PermissionActions.userHasPermission(state.Permissions, Permissions.SystemAdmin) ? [
                  <Route key={uuid()} path="/home/sysadmin/list" component={SystemAdminList} />,
                  <Route key={uuid()} path="/home/user/registersysadmin" component={RegisterSysAdminView} />,
                  <Route key={uuid()} path="/home/emailconfig" component={EmailConfigView} />,
                ] : null
            }
            {
              !state.Token ? null :
                PermissionActions.userHasPermission(state.Permissions, Permissions.AccessAll) ? [
                  <Route key={uuid()} path="/home/errorlogs" component={ErrorLogsView} />,
                ] : null
            }
            <Redirect from="/home" to="/home/welcome" />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
});