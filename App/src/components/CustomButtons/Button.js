import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const useStyles = makeStyles(styles);

/**
 * To use with React Router links, use the "component" param with the Link object as value together with the "to" param containing the link's url
 * @param {*} round button round style 
 * @param {*} fullWidth button will occupy all available space
 * @param {*} disabled button will be faded and can't be clicked
 * @param {*} simple text only
 * @param {*} size omit for normal, otherwise either lg or sm
 * @param {*} block same as full width
 * @param {*} link similar to simple but grey
 * @param {*} justIcon styling for icon only
 * @param {*} className additional classes
 * @param {*} muiClasses modify deep material ui classes
 * @param {*} loading bool state to show button spinner
 * @param {*} color primary | info | success | warning | danger | rose | white | twitter | facebook | google | linkedin | pinterest | youtube | tumblr | github | behance | dribbble | reddit | transparent
 * 
 */
const RegularButton = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    loading,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled || loading,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    loading

      ?

      <div className={classes.buttonContainerflexCenter}>
        <Button {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
          {children}
        </Button>
        {loading && <CircularProgress size={24} className={classes.loader} />}
      </div>

      :

      <Button {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
        {children}
      </Button>
  );
});

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "twitter",
    "facebook",
    "google",
    "linkedin",
    "pinterest",
    "youtube",
    "tumblr",
    "github",
    "behance",
    "dribbble",
    "reddit",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  children: PropTypes.node
};

export default RegularButton;
