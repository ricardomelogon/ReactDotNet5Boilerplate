import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/components/infoStyle";

import { Icon } from "@mdi/react";

const useStyles = makeStyles(styles);

/**
 * Information area with icon, title and description
 * @param {*} title Title
 * @param {*} icon MDI string path from ```@mdi/js```
 * @param {*} color primary | warning | danger | success | info | rose | gray
 * @param {*} description Description
 */
export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, color, icon } = props;
  return (
    <div className={classes.infoArea}>
      <div className={classes.iconWrapper + " " + classes[color]}>
        <Icon path={icon} size="24px" />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  color: "gray"
};

InfoArea.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ])
};
