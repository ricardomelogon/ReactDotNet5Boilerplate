import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import Section from "../../components/Section/Section";

import { mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircleOutline } from "@mdi/js";
import { Icon } from "@mdi/react";


import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const radioStyles = {
    ...styles,
    formControlRoot: {
        paddingRight: "0px",
        paddingLeft: "0px",
        paddingBottom: "0.5rem",
        "&:hover": {
            backgroundColor: "transparent !important"
        },
    },
    label: {
        ...styles.label,
        marginTop: "0.25rem!important",
        marginRight: "0.5rem!important",
        marginLeft: "0.5rem!important",
    },
    labelRoot: {
        ...styles.labelRoot,
        marginTop: "0.5rem!important",
        marginRight: "0!important",
        marginLeft: "0!important",
    }
};

const useStyles = makeStyles(radioStyles);

/**
 * 
 * @param {*} onChange on radio change callback
 * @param {*} checked defines if the radio is checked or not
 * @param {*} value value of the radio, which can be used onChange
 * @param {*} name name that has to be used by all radio components of the same group
 * @param {*} label radio label
 * @param {*} left position label on the left
 * @param {*} right position label on the right
 * @param {*} top position label on the top
 * @param {*} bottom position label on the bottom
 */
export default function CustomRadio(props) {
    const {
        onChange,
        checked,
        value,
        name,
        label,
        left,
        right,
        top,
        bottom
    } = props;

    const labelPlacement = () => {
        if (left) return 'end';
        if (right) return 'start';
        if (top) return 'top';
        if (bottom) return 'bottom';
        return 'end';
    }

    const classes = useStyles();
    return (
        <Section dFlex justifyContentCenter className={`${classes.checkboxAndRadio} ${classes.checkboxAndRadioHorizontal} ${props.className}`}>
            <FormControlLabel
                control={
                    <Radio
                        checked={checked}
                        onChange={onChange}
                        value={value}
                        name={name}
                        aria-label={label}
                        icon={<Icon path={mdiCheckboxBlankCircleOutline} size="21px" />}
                        checkedIcon={<Icon path={mdiCheckboxMarkedCircleOutline} size="21px" />}
                        classes={{
                            checked: classes.radio,
                            root: classes.formControlRoot
                        }}
                    />
                }
                classes={{
                    label: classes.label,
                    root: classes.labelRoot,
                }}
                label={label}
                labelPlacement={labelPlacement()}
            />
        </Section>
    );
}
