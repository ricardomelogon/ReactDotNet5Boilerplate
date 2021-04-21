import React from "react";
import PropTypes from "prop-types";

//Components
import Switch from "@material-ui/core/Switch";
import Section from "../Section/Section";
import Muted from "../Typography/Muted";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/switchStyle";

const useStyles = makeStyles(styles);

const CustomSwitch = (props) => {
  const classes = useStyles();
  return (
    <Section>
      { props.labelTop ? <Section px1><h6 style={{ color: "black", marginBottom: "0px", marginTop: "0px" }}>{props.labelTop}</h6></Section> : null}
      <Section dFlex flexRow alignItemsCenter px1 flexNowrap>
        {props.labelLeft ? <Muted>{props.labelLeft}</Muted> : null}
        <Switch
          checked={props.checked}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            checked: classes.switchChecked,
            thumb: classes.switchIcon,
            track: classes.switchBar
          }}
        />
        {props.labelRight ? <Muted>{props.labelRight}</Muted> : null}
      </Section>
    </Section>
  );
}

CustomSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  labelRight: PropTypes.string,
  labelLeft: PropTypes.string,
  labelTop: PropTypes.string,
  value: PropTypes.any
};

export default CustomSwitch;