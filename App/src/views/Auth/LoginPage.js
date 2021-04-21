import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PasswordInput from "components/CustomInput/PasswordInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { actionsAlert } from '../../redux/modules';

//Services
import userService from "../../services/userService";

//Helpers
import { isEmail } from '../../helpers/regexHelpers';

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  //Hooks
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);
  let history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  //Redirection
  useEffect(() => {
    if (state.Token) {
      if (state.EmailConfirmed) {
        history.push('/home/welcome');
      }
      else {
        history.push('/auth/confirmemail');
      }
    }
  }, [state.Token, state.EmailConfirmed, state.TokenExpiration, history]);

  //Form Controls
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const loginHandler = async () => {
    try {
      if (!isEmail(email)) {
        dispatch(actionsAlert.alert({ Message: 'Please enter a valid email address!', Type: 'warning' }));
      }
      else if (!password) {
        dispatch(actionsAlert.alert({ Message: 'Please enter your password!', Type: 'warning' }));
      }
      else {
        setLoading(true);
        await userService.authForm(dispatch, {
          Email: email,
          Password: password,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      dispatch(actionsAlert.alert({ Message: 'Cannot proceed at this moment, please try again later!', Type: 'error' }));
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login animate>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
              </CardHeader>
              <CardBody>
                <CustomInput labelText="Email" fullWidth onChange={e => setEmail(e.target.value)} onEnter={loginHandler} autoComplete={"off"} />
                <PasswordInput labelText="Password" fullWidth onChange={e => setPassword(e.target.value)} onEnter={loginHandler} autoComplete={"off"} />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="primary" simple size="lg" block onClick={loginHandler} loading={loading} >
                  Log In
                </Button>
              </CardFooter>
            </Card>
          </form>
          <form>
            <Card login animate>
              <CardBody>
                <Button color="primary" size="sm" block onClick={() => { history.push('/auth/forgotpassword'); }}>
                  Forgot your Password?
                </Button>
              </CardBody>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
