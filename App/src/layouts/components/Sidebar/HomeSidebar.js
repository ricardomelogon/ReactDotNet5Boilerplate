/*eslint-disable*/
import React, { useEffect, createRef, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { HomeUrl } from "../../../constants/ApiSettings";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import cx from "classnames";

//Components
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Link from "./Link";

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.js";

import MdiIcon from '@mdi/react'
import {
  mdiAccountPlusOutline,
  mdiAccountGroupOutline,
  mdiHomeOutline,
  mdiAccountOutline,
  mdiAlertCircleOutline,
  mdiMessageSettings,
} from "@mdi/js";

import logo from "../../../assets/img/logo.png"
import logoMini from "../../../assets/img/icon.png"
import image from "../../../assets/img/sidebar-1.jpg";

//redux
import { useSelector, useDispatch } from "react-redux";
import { actionsAuth } from "../../../redux";

//permissions
import Permissions, { PermissionActions } from "../../../permissions/Permissions";

let ps;

const SidebarWrapper = (props) => {
  let sidebarWrapper = createRef();

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }

    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    }
  }, []);

  const { className, user, headerLinks, links } = props;

  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  );
};

const HomeSidebar = (props) => {
  const { color, classes, bgColor } = props;

  const handleLogout = () => {
    dispatch(actionsAuth.authLogout());
  }

  const userState = useSelector(state => state.auth.User);
  const userPermissions = useSelector(state => state.auth.Permissions);
  const dispatch = useDispatch();
  const [miniActive, setMiniActive] = useState(false);

  const [openAvatar, setOpenAvatar] = useState(false);

  const mainPanel = createRef();

  const user = (
    <div className={`${classes.user} ${cx({ [classes.whiteAfter]: bgColor === "white" })}`}>
      <div className={classes.photo}> <MdiIcon path={mdiAccountOutline} title="Account" className={classes.avatarImg} /> </div>
      <List className={classes.list}>
        <ListItem className={`${classes.item} ${classes.userItem}`}>
          <div className={`${classes.itemLink} ${classes.userCollapseButton}`} onClick={() => setOpenAvatar(!openAvatar)} >
            <ListItemText
              primary={`${userState.FirstName ? userState.FirstName : 'Guest'} ${userState.LastName ? userState.LastName : ''}`}
              secondary={<b className={`${classes.caret} ${classes.userCaret} ${(openAvatar ? classes.caretActive : "")}`} />}
              disableTypography={true}
              className={`${classes.itemText} ${cx({ [classes.itemTextMini]: props.miniActive && miniActive })} ${classes.userItemText}`}
            />
          </div>
          <Collapse in={openAvatar}>
            <List className={`${classes.list} ${classes.collapseList}`}>
              <ListItem className={classes.collapseItem}>
                <a className={`${classes.itemLink} ${classes.userCollapseLinks}`} onClick={handleLogout} >
                  <span className={classes.collapseItemMini}>{""}</span>
                  <ListItemText primary={"Logout"} disableTypography={true} className={`${classes.collapseItemText} ${cx({ [classes.collapseItemTextMini]: props.miniActive && miniActive })}`} />
                </a>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </div>
  );

  const links = (
    <List className={classes.list}>
      {
        PermissionActions.userHasPermission(userPermissions, Permissions.SystemAdmin) ?
          <Fragment>
            <Link title={"Home"} icon={mdiHomeOutline} to={"/home/welcome"} classes={classes} miniActive={props.miniActive && miniActive} color={color} />
            <Link title={"Register Admins"} icon={mdiAccountPlusOutline} to={"/home/user/registersysadmin"} classes={classes} miniActive={props.miniActive && miniActive} color={color} />
            <Link title={"Admin List"} icon={mdiAccountGroupOutline} to={"/home/sysadmin/list"} classes={classes} miniActive={props.miniActive && miniActive} color={color} />
            <Link title={"Email Configurations"} icon={mdiMessageSettings} to={"/home/emailconfig"} classes={classes} miniActive={props.miniActive && miniActive} color={color} />
          </Fragment>
          :
          null
      }
      {
        PermissionActions.userHasPermission(userPermissions, Permissions.AccessAll) ?
          <Fragment>
            <Link title={"Error Logs"} icon={mdiAlertCircleOutline} to={"/home/errorlogs"} classes={classes} miniActive={props.miniActive && miniActive} color={color} />
          </Fragment>
          :
          null
      }
    </List>
  );

  const brand = (
    <div className={`${classes.logo} ${cx({ [classes.whiteAfter]: bgColor === "white" })}`}>
      <a href={HomeUrl} target="_blank" className={classes.logoMini} style={{ display: (props.miniActive && miniActive ? 'block' : 'none') }} >
        <img src={logoMini} alt="logo" className={classes.img} />
      </a>
      <a href={HomeUrl} target="_blank" className={`${classes.logoNormal} ${cx({ [classes.logoNormalSidebarMini]: props.miniActive && miniActive })}`} >
        <img src={logo} className={classes.img} style={{ width: "80%" }}></img>
      </a>
    </div>
  );

  return (
    <div ref={mainPanel}>
      <Hidden mdUp implementation="css">
        <SwipeDrawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{ paper: `${classes.drawerPaper} ${cx({ [classes.drawerPaperMini]: props.miniActive && miniActive })} ${classes[bgColor + "Background"]}` }}
          onClose={props.handleDrawerToggle}
          onOpen={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <SidebarWrapper
            className={`${classes.sidebarWrapper} ${cx({ [classes.drawerPaperMini]: props.miniActive && miniActive, [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1 })}`}
            user={user}
            links={links}
          />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </SwipeDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          onMouseOver={() => setMiniActive(false)}
          onMouseOut={() => setMiniActive(true)}
          anchor={"left"}
          variant="permanent"
          open
          classes={{ paper: `${classes.drawerPaper} ${cx({ [classes.drawerPaperMini]: props.miniActive && miniActive })} ${classes[bgColor + "Background"]}` }}
        >
          {brand}
          <SidebarWrapper
            className={`${classes.sidebarWrapper} ${cx({ [classes.drawerPaperMini]: props.miniActive && miniActive, [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1 })}`}
            user={user}
            links={links}
          />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

HomeSidebar.defaultProps = {
  bgColor: "blue"
};

HomeSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf(["white", "red", "orange", "green", "blue", "purple", "rose"]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object
};

export default withStyles(sidebarStyle)(HomeSidebar);
