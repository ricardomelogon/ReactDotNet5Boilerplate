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
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';

import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";

import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import { Icon } from "@mdi/react";

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
 * @param {*} fullWidth if input should occupy all available width
 * @param {*} id input id
 * @param {*} labelProps extra props for the label
 * @param {*} inputProps extra props for the form control wrapper 
 * @param {*} formControlProps extra props for the form control wrapper 
 */
export default function PasswordInput(props) {
  const classes = useStyles();
  const [passwordVisibility, setPasswordVisibility] = React.useState();
  const [visibilityButtonIcon, setVisibilityButtonIcon] = React.useState(false);
  const [passwordInputType, setPasswordInputType] = React.useState('password');
  React.useEffect(() => {
    if (passwordVisibility) {
      setVisibilityButtonIcon(false);
      setPasswordInputType('text');
    }
    else {
      setVisibilityButtonIcon(true);
      setPasswordInputType('password');
    }
  }, [passwordVisibility]);

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
    fullWidth,
    onEnter,
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
      classes.formControl,
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
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && onEnter) {
            onEnter();
          }
        }}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton onClick={() => { setPasswordVisibility(!passwordVisibility) }}>
              {visibilityButtonIcon ? <Icon path={mdiEyeOutline} size="24px"/> : <Icon path={mdiEyeOffOutline} size="24px" />}
            </IconButton>
          </InputAdornment>
        )}
        type={passwordInputType}
        autoComplete="off"
        {...inputProps}
        inputProps={newInputProps}
      />
      {helperText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

PasswordInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node
};
