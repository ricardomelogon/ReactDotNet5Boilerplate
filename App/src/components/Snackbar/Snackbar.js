import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import { Icon } from "@mdi/react";

import styles from "assets/jss/material-dashboard-pro-react/components/snackbarContentStyle.js";

const useStyles = makeStyles(styles);

/**
 * 
 * @param {string} message 
 * @param {string} color info | success | warning | danger | primary | rose
 * @param {boolean} close if set, the snackbar will have a close button
 * @param {*} icon SVG path (MDI) for the icon
 * @param {string} place position of the snackbar - "tl": top left | "tr": top right | "tc": top center | "br": bottom right | "bl": bottom left | "bc": bottom center
 * @param {boolean} open open or hidden state
 */
export default function Snackbar(props) {
  const classes = useStyles();
  const { message, color, close, icon, place, open } = props;
  var action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined
  });
  if (close) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      classes={{
        anchorOriginTopCenter: classes.top20,
        anchorOriginTopRight: classes.top40,
        anchorOriginTopLeft: classes.top40
      }}
      anchorOrigin={{
        vertical: place.indexOf("t") === -1 ? "bottom" : "top",
        horizontal:
          place.indexOf("l") !== -1
            ? "left"
            : place.indexOf("c") !== -1
            ? "center"
            : "right"
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <Icon path={icon} size="24px" /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + " " + classes[color],
          message: classes.message
        }
      }}
    />
  );
}

Snackbar.defaultProps = {
  color: "info"
};

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "info",
    "success",
    "warning",
    "danger",
    "primary",
    "rose"
  ]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool,
  closeNotification: PropTypes.func
};
