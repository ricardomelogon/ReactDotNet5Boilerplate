/*eslint-disable*/
import React from "react";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { actionsAlert } from '../../redux/modules/alert';

const useStyles = makeStyles(styles);

export default function Alert() {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(null);
  const [alertContainer, setAlertContainer] = React.useState('');
  const state = useSelector(state => state.alert);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!state.Show) {
      setAlertContainer('');
      setAlert(null);
    }
    else setAlertContainer(classes.alertContainer);
  }, [state.Show]);

  React.useEffect(() => {
    if (!state.Show) setAlert(null);
    else {
      let CancelClass = '';
      switch (state.CancelBtnClass) {
        case 'primary':
          CancelClass = classes.primary;
          break;
        case 'info':
          CancelClass = classes.info;
          break;
        case 'success':
          CancelClass = classes.success;
          break;
        case 'warning':
          CancelClass = classes.warning;
          break;
        case 'danger':
          CancelClass = classes.danger;
          break;
        default:
          CancelClass = '';
          break;
      }

      let ConfirmClass = '';
      switch (state.ConfirmBtnClass) {
        case 'primary':
          ConfirmClass = classes.primary;
          break;
        case 'info':
          ConfirmClass = classes.info;
          break;
        case 'success':
          ConfirmClass = classes.success;
          break;
        case 'warning':
          ConfirmClass = classes.warning;
          break;
        case 'danger':
          ConfirmClass = classes.danger;
          break;
        default:
          ConfirmClass = 'primary';
          break;
      }

      setAlert(
        <SweetAlert
          type={state.Type}
          style={{ display: "block", marginTop: "-100px" }}
          title={state.Message}
          onConfirm={() => {
            dispatch(actionsAlert.hideAlert());
            if (state.ConfirmCallback) {
              setTimeout(() => {
                state.ConfirmCallback()
              }, 200);
            };
          }}
          onCancel={() => {
            dispatch(actionsAlert.hideAlert());
            if (state.Confirm && state.CancelCallback) {
              setTimeout(() => {
                state.CancelCallback();
              }, 200);
            }
          }}
          confirmBtnCssClass={`${classes.button} ${ConfirmClass}`}
          cancelBtnCssClass={`${classes.button} ${CancelClass}`}
          confirmBtnText={state.ConfirmBtnText}
          cancelBtnText={state.CancelBtnText}
          showCancel={state.Confirm}
          allowEscape={false}
          closeOnClickOutside={false}
        >
          {state.Text}
        </SweetAlert>
      );
    }
  }, [alertContainer]);

  return (
    <div className={alertContainer}>
      {alert}
    </div>
  );
}
