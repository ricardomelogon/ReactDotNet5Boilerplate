import React, { useState } from "react";
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
import { useDispatch } from 'react-redux';
import { actionsAlert } from '../../redux/modules/alert';

//Services
import userService from '../../services/userService';

//Styling
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

//Helpers
import { isEmail, isValidPassword } from '../../helpers/regexHelpers.js';

const useStyles = makeStyles(styles);

export default function ForgotPassword() {
  //Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const [sendLoading, setSendLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');


  const SendEmailHandler = async () => {
    if (isEmail(email)) {
      setSendLoading(true);
      await userService.resetPasswordEmailCode(dispatch, email);
      setSendLoading(false);
    }
    else dispatch(actionsAlert.alert({
      Message: 'Please enter a valid email address',
      Type: 'warning'
    }));
  }

  const ChangePasswordHandler = async () => {
    if (!isEmail(email)) return dispatch(actionsAlert.alert({
      Message: 'Please enter a valid email!',
      Type: 'warning',
    }));

    if (!code) return dispatch(actionsAlert.alert({
      Message: 'Please enter a valid code!',
      Type: 'warning',
    }));

    if (!password) return dispatch(actionsAlert.alert({
      Message: 'Please enter a password!',
      Type: 'warning',
    }));

    if (password !== retypePassword) return dispatch(actionsAlert.alert({
      Message: 'Please be sure your passwords match!',
      Type: 'warning',
    }));

    if (!isValidPassword(password)) return dispatch(actionsAlert.alert({
      Message: 'The password you entered is not secure enough!',
      Text: 'Your password must be at least 8 characters long and contain at least one number, one special character, one lowercase letter and one uppercase letter',
      Type: 'warning',
    }));

    if (code && isValidPassword(password)) {
      setResetPasswordLoading(true);
      await userService.resetPassword(dispatch, history, { NewPassword: password, ConfirmationCode: code, Email: email });
      setResetPasswordLoading(false);
    }
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={6}>
          <form>
            <Card login animate>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>Reset your Password</h4>
              </CardHeader>
              <CardBody>
                <p className={classes.textCenter}>Hey there! Please enter your email and click the button below to receive a new confirmation code</p>
                <CustomInput labelText="Email" fullWidth onChange={e => { setEmail(e.target.value); }} />
                <Button color="primary" block onClick={SendEmailHandler} loading={sendLoading}>
                  Send Code
                </Button>
              </CardBody>
            </Card>
            <Card login animate>
              <CardBody>
                <p className={classes.textCenter}>Once you receive the confirmation code, please type it below alongside your new desired password</p>
                <CustomInput labelText="Confirmation Code" formControlProps={{ fullWidth: true }} onChange={e => { setCode(e.target.value); }} />
                <PasswordInput labelText="New Password" fullWidth onChange={e => { setPassword(e.target.value); }} />
                <PasswordInput labelText="Re-type your New Password" fullWidth onChange={e => { setRetypePassword(e.target.value); }} />
                <Button color="primary" block onClick={ChangePasswordHandler} loading={resetPasswordLoading}>
                  Reset Password
                </Button>
              </CardBody>
              <CardFooter>
                <p className={classes.textCenter}><small>Your password must be at least 8 characters long and contain at least one number, one special character, one lowercase letter and one uppercase letter</small></p>
              </CardFooter>
            </Card>
          </form>
          <Card login animate>
            <CardBody>
              <Button color="primary" size="sm" block onClick={() => { history.push('/auth/login'); }}>
                Back to Login Page
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
