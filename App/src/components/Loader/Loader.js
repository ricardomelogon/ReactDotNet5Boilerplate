import React from "react";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

//Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 200,
    color: '#fff',
  },
}));

export default function Loader() {
  const classes = useStyles();
  const state = useSelector(state => state.loader.Show);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={state}>
        <CircularProgress color="inherit" size='5rem' />
      </Backdrop>
    </div>
  );
}
