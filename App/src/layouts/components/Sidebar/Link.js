import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";

//Components
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MdiIcon from '@mdi/react'

const Link = (props) => {
  const { classes, miniActive, to, icon, title, color } = props;
  const itemText = `${classes.itemText} ${cx({ [classes.itemTextMini]: props.miniActive && miniActive })}`;

  return (
    <ListItem className={classes.item} >
      <NavLink to={to} className={`${classes.itemLink}`} activeClassName={classes[color]} >
        <MdiIcon path={icon} className={classes.itemIcon} />
        <ListItemText primary={title} disableTypography={true} className={itemText} />
      </NavLink>
    </ListItem>
  );
}

Link.propTypes = {
  classes: PropTypes.object.isRequired,
  miniActive: PropTypes.bool,
  to: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
};

export default Link;