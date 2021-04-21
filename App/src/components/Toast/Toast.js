import React from "react";
import Snackbar from "../Snackbar/Snackbar";

import { useSelector } from 'react-redux';

export default function Toast() {

  const state = useSelector(state => state.toast);

  return (
    <Snackbar
      place={state.place}
      color={state.color}
      message={state.message}
      open={state.open}
      closeNotification={state.callback}
      close={state.closeBtn}
    />
  );
}