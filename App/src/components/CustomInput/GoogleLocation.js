import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import throttle from 'lodash/throttle';
import parse from 'autosuggest-highlight/parse';

//Components
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Styling
import { makeStyles } from '@material-ui/core/styles';
import { primaryColor } from "assets/jss/material-dashboard-pro-react.js";
import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";

const autocompleteService = { current: null };


const useStyles = makeStyles((theme) => ({
  ...styles,
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  labelRoot: {
    ...styles.labelRoot,
    top: "25px",
  },
  formControl: {
    ...styles.formControl,
    '& .MuiInputBase-root::after': {
      borderBottom: `1px solid ${primaryColor[0]}`
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.20)'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.20)'
    },
  }
}));

const google = window.google;

export default function GoogleLocation(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    value: inputValue,
    onChange,
    onSelect,
    fullWidth,
    required,
  } = props;

  //Styling
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
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined
  };
  //End Styling

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({
      input: inputValue,
      location: new google.maps.LatLng(51.049999, -114.066666),
      radius: 2000,
      types: ['address']
    }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      autoComplete
      freeSolo
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        if (!value) onChange(newInputValue);
      }}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
        onSelect(newValue);
      }}
      renderInput={
        (params) =>
          <TextField
            fullWidth={fullWidth}
            onKeyDown={(e) => {
              if (value && e.key !== "Tab") setValue(null);
            }}
            className={formControlClasses}
            {...params}
            inputProps={{
              classes: {
                input: inputClasses,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses,
              },
              ...newInputProps,
              ...params.inputProps,
            }}
            InputLabelProps={{
              className: `${classes.labelRoot} ${labelClasses}`,
              ...labelProps
            }}
            label={labelText !== undefined ? (required ? `${labelText} *` : labelText) : null}
            margin="normal" />
      }
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}


GoogleLocation.propTypes = {
  formControlProps: PropTypes.object,
  labelText: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
  inputProps: PropTypes.object,
  error: PropTypes.bool,
  white: PropTypes.bool,
  inputRootCustomClasses: PropTypes.string,
  success: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool
};