import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
//Installed components
import InputMask from 'react-input-mask';

import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

/**
 * 
 * @param {*} labelText input label 
 * @param {*} white add if input color should be white
 * @param {*} success bool for success color underline
 * @param {*} error bool for error color underline
 * @param {*} helperText text under input
 * @param {*} onChange callback for input change
 * @param {*} onEnter callback for pressing enter while the input is focused
 * @param {*} required if input is required
 * @param {*} value state value if input is controlled
 * @param {*} fullWidth if input should occupy all available width
 * @param {*} type input type: button | checkbox | color | date | local | email | file | hidden | image | month | number | password | radio | range | reset | search | submit | tel | text | time | url | week
 * @param {*} id input id
 * @param {*} labelProps extra props for the label
 * @param {*} inputProps extra props for the form control wrapper 
 * @param {*} formControlProps extra props for the form control wrapper 
 * @param {*} mask regex with a mask for the input. eg: Postal Code: a9a-9a9
 * @param {*} disabled if input is disabled
 */
export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helperText,
    onChange,
    onEnter,
    fullWidth,
    required,
    value,
    type,
    mask,
    onClick,
    disabled,
    ...rest
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined
  };
  return (
    <FormControl fullWidth={fullWidth} {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {(required ? `${labelText} *` : labelText)}
        </InputLabel>
      ) : null}
      {mask ?
        <InputMask
          mask={mask}
          onChange={onChange}
          onClick={onClick}
          value={value}>
          {(inputProps) =>
            <Input
              classes={{
                input: inputClasses,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses
              }}
              id={id}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && onEnter) {
                  onEnter();
                }
              }}
              required={required}
              type={type}
              {...inputProps}
              inputProps={newInputProps} />
          }

        </InputMask>
        :
        <Input
          classes={{
            input: inputClasses,
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          onChange={onChange}
          onClick={onClick}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && onEnter) {
              onEnter();
            }
          }}
          value={value}
          required={required}
          type={type}
          disabled={disabled}
          {...inputProps}
          {...rest}
          inputProps={newInputProps}
        />
      }
      {helperText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node,
  mask: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.any,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([
    "button",
    "checkbox",
    "color",
    "date",
    "local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ]),
};
