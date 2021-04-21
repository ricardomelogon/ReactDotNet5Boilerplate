import React, { useState, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import produce from 'immer';
import { isEmail } from "../../helpers/regexHelpers";
import { useDispatch } from "react-redux";
import { actionsAlert } from "../../redux/modules";
import userService from "../../services/userService.js";

// material icons
import { mdiAccountPlusOutline } from "@mdi/js";
import { Icon } from "@mdi/react";

// components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

const RegisterUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    returnLink: `${window.location.origin}/auth/confirmemail`
  });

  const firstNameHandler = useCallback((e) => {
    let value = e.target.value;
    setUser(produce(user => {
      user.firstName = value;
    }));
  }, []);

  const lastNameHandler = useCallback((e) => {
    let value = e.target.value;
    setUser(produce(user => {
      user.lastName = value;
    }));
  }, []);

  const emailHandler = useCallback((e) => {
    let value = e.target.value;
    setUser(produce(user => {
      user.email = value;
    }));
  }, []);

  const createHandler = useCallback(async () => {
    if (!user.firstName) return dispatch(actionsAlert.alert({
      Message: 'Please enter a first name',
      Type: 'warning'
    }));

    if (!isEmail(user.email)) return dispatch(actionsAlert.alert({
      Message: 'Please enter a valid email address',
      Type: 'warning'
    }));

    setLoading(true);
    await userService.registerSystemAdmin(dispatch, user, () => {
      setLoading(false);
      dispatch(actionsAlert.alert({
        Message: 'Would you like to create another user?',
        Type: 'info',
        Confirm: true,
        ConfirmBtnText: 'Yes',
        CancelBtnText: 'No',
        ConfirmCallback: () => {
          setUser({
            firstName: '',
            lastName: '',
            email: '',
            permission: '',
            returnLink: `${window.location.origin}/auth/confirmemail`
          });
        },
        CancelCallback: () => {
          history.push('/home/sysadmin/list');
        }
      }));
    }, () => setLoading(false));
  }, [dispatch, user, history]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card animate fade>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon path={mdiAccountPlusOutline} />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <p>To add a new system administrator please fill the form below</p>
              <p>System Administrators are capable of managing all aspects of the application, including adding and disabling depots.</p>
              <GridContainer>
                <GridItem xs={12}>
                  <CustomInput labelText="First Name" fullWidth required onChange={firstNameHandler} value={user.firstName} />
                </GridItem>
                <GridItem xs={12}>
                  <CustomInput labelText="Last Name" fullWidth onChange={lastNameHandler} value={user.lastName} />
                </GridItem>
                <GridItem xs={12}>
                  <CustomInput labelText="Email" required fullWidth onChange={emailHandler} value={user.email} />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={createHandler} loading={loading}>Create User</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default RegisterUser;