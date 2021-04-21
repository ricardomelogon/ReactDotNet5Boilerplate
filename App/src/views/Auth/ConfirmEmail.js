import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import produce from 'immer';
import { useDispatch } from "react-redux";
import { actionsLoader, actionsAlert } from "../../redux/modules";
import userService from "../../services/userService";
import { isValidPassword } from "../../helpers/regexHelpers.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import PasswordInput from "components/CustomInput/PasswordInput";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function ConfirmEmail(props) {
  //Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const classes = useStyles();
  const [confirmation, setConfirmation] = useState({
    email: '',
    code: '',
    password: ''
  });
  const [passwordCheck, setPasswordCheck] = useState('');

  const handlePassword = useCallback((value) => {
    setConfirmation(produce(confirmation => {
      confirmation.password = value;
    }));
  }, []);

  useEffect(() => {
    if (token) {
      async function getConfirmation() {
        dispatch(actionsLoader.loading());
        await userService.decryptConfirmationToken(dispatch, token, (data) => {
          let TokenValues = JSON.parse(data);
          if (!TokenValues) return dispatch(actionsAlert.alert({
            Message: 'There was an error processing your account information',
            Text: 'please reload and try again later',
            Type: 'error',
          }));
          setConfirmation(produce(confirmation => {
            confirmation.email = TokenValues.Email;
            confirmation.code = TokenValues.Code;
          }));
        });
        dispatch(actionsLoader.hideLoading());
      };
      getConfirmation();
    }
  }, [token, dispatch]);

  const SavePasswordHandler = useCallback(async () => {
    if (!confirmation.email || !confirmation.code) return dispatch(actionsAlert.alert({
      Message: 'There was an error processing your account information',
      Text: 'please reload and try again later',
      Type: 'error',
    }));

    if (!confirmation.password || !isValidPassword(confirmation.password)) return dispatch(actionsAlert.alert({
      Message: 'Please enter a valid password!',
      Type: 'warning',
    }));

    if (confirmation.password !== passwordCheck) return dispatch(actionsAlert.alert({
      Message: 'Passwords do not match!',
      Type: 'warning',
    }));

    dispatch(actionsLoader.loading());
    await userService.createPassword(dispatch, confirmation, (message) => {
      dispatch(actionsAlert.alert({
        Message: message,
        Text: 'Please log in using your email and password',
        Type: 'success',
        ConfirmCallback: () => { history.replace('/auth/login'); }
      }));
    });
    dispatch(actionsLoader.hideLoading());

  }, [dispatch, confirmation, passwordCheck, history]);

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
                <h4 className={classes.cardTitle}>Confirm Your Email</h4>
              </CardHeader>
              <CardBody>
                <p className={classes.textCenter}>Hey there! Please create your password to proceed.</p>
                <PasswordInput labelText="Create your password" formControlProps={{ fullWidth: true }} onChange={e => { handlePassword(e.target.value); }} value={confirmation.password} />
                <PasswordInput labelText="Re-enter password" formControlProps={{ fullWidth: true }} onChange={e => { setPasswordCheck(e.target.value); }} value={passwordCheck} />
                <p className={classes.textCenter}><small>Your password must be at least 8 characters long, contain at least one number, one special character, one lowercase letter and one uppercase letter</small></p>
                <Button color="primary" block onClick={SavePasswordHandler}>
                  Save Password
                </Button>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="primary" simple size="sm" block component={Link} to={"/auth/login/"}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}