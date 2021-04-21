import React from 'react';
import PropTypes from "prop-types";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// core components
import Button from "components/CustomButtons/Button.js";

import { mdiClose } from "@mdi/js";
import { Icon } from "@mdi/react";

import styles from "assets/jss/material-dashboard-pro-react/modalStyle.js";

const useStyles = makeStyles(styles);

/**
 * Modal is a controlled component that requires an external state to function properly
 * 
 * @param {*} open open/closed state of the modal
 * @param {*} setOpen open/closed state setter of the modal
 * @param {*} title Title of the modal
 * @param {*} locked will hide the close button and prevent outside clicks from closing the modal
 * @param {*} sm small modal size
 * @param {*} md mdeium modal size
 * @param {*} lg large modal size
 * @param {*} full full screen width modal, the height is still bound to content
 */
export default function Modal(props) {
  const classes = useStyles();
  const {
    open,
    setOpen,
    children,
    title,
    locked,
    sm,
    md,
    lg,
    full
  } = props;
  return (
    <div>
      <Dialog
        classes={{
          root: `${classes.center} ${classes.modalScroll}`,
          paper: `${classes.modal} ${sm ? classes.sm : null} ${md ? classes.md : null} ${lg ? classes.lg : null} ${full ? classes.full : null}`
        }}
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        disableBackdropClick={locked}
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          {locked ? null : <Button justIcon className={classes.modalCloseButton} color="transparent" onClick={() => setOpen(false)} > <Icon path={mdiClose} /> </Button>}
          <h4 className={classes.modalTitle}>{title}</h4>
        </DialogTitle>
        <DialogContent className={classes.modalBody} >
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.any,
  title: PropTypes.string,
  locked: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  full: PropTypes.bool,
}