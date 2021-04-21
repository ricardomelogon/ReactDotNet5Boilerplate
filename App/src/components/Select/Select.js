import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "assets/jss/material-dashboard-pro-react/components/selectStyle.js";
import uuid from "helpers/uuid";
import useWindowDimensions from '../../hooks/useWindowDimensions';

const useStyles = makeStyles(styles);
const Guid = uuid();

/**
 * 
 * @param {*} items array of json, must have 'value' and 'text' properties and optionally the 'disabled' property  
 * @param {*} label label of the select component
 * @param {*} value default starting value
 * @param {*} handler function that will be triggered on change. should treat e.target.value
 * @param {*} inline select will appear on the same line as other elements
 * @param {*} menuSide menu dropdown will appear to the side of the select component
 */
export default function Dropdown(props) {
  const { width } = useWindowDimensions();
  const {
    items,
    label,
    value,
    handler,
    inline,
    menuSide
  } = props;
  const classes = useStyles();
  const [selectItems, setSelectItems] = useState(null);
  const [menuProps, setMenuProps] = useState({
    className: classes.selectMenu
  });

  useEffect(() => {
    if (menuSide) {
      if (width >= 860) {
        setMenuProps({
          className: classes.selectMenu,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 0
          },
          getContentAnchorEl: null
        });
      }
      else {
        setMenuProps({
          className: classes.selectMenu,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 80
          },
          getContentAnchorEl: null
        });
      }
    }
  }, [width, classes.selectMenu, menuSide]);

  useEffect(() => {
    if (items) {
      setSelectItems(items.map((a, i) => {
        return (<MenuItem key={i} disabled={a.disabled} classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value={a.value}>{a.text}</MenuItem>);
      }));
    }
  }, [items, classes.selectMenuItem, classes.selectMenuItemSelected])

  return (
    <FormControl fullWidth className={inline ? classes.inline : classes.selectFormControl}>
      <InputLabel htmlFor={Guid} className={`${classes.selectLabel}`} style={{ color: "#000 !important" }} >{label}</InputLabel>
      <Select
        MenuProps={menuProps}
        classes={{
          select: classes.select
        }}
        value={selectItems ? value : ""}
        onChange={handler}
        inputProps={{
          name: Guid,
          id: `S${Guid}`,
        }}
      >
        {selectItems}
      </Select>
    </FormControl>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.any,
  handler: PropTypes.func,
  inline: PropTypes.bool,
  menuSide: PropTypes.bool,
};