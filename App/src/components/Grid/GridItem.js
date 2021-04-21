import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    padding: "0 15px !important"
  }
};

const useStyles = makeStyles(styles);

/**
 * 
 * @param {*} xs 1 to 12
 * @param {*} sm 1 to 12
 * @param {*} md 1 to 12
 * @param {*} lg 1 to 12
 */
export default function GridItem(props) {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={`${classes.grid} ${className ? className : ''} grid`}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
