import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    margin: "0 -15px",
    width: "calc(100% + 30px)"
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  }
};

const useStyles = makeStyles(styles);

/**
 * @param {*} justify 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' 
 * @param {*} alignItems 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' 
 * @param {*} direction 'row' | 'row-reverse' | 'column' | 'column-reverse' 
 */
export default function GridContainer(props) {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={`${classes.grid} ${className ? className : ''}`}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
