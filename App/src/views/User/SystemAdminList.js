import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionsAlert, actionsLoader } from "../../redux/modules";
import userService from "../../services/userService.js";
import Section from "../../components/Section/Section";

// material icons
import { mdiAccountGroupOutline } from "@mdi/js";
import { Icon } from "@mdi/react";

// components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button";
import Loader from "components/Loader/InlineLoader";
import ReactTable from "components/ReactTable/ReactTable";

let isMounted = true;

const UserList = () => {
  useEffect(() => { isMounted = true; return () => { isMounted = false }; }, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rawData, setRawData] = useState([]);
  const userId = useSelector(a => a.auth.User.Id);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    await userService.getSysAdmins(dispatch, async (data) => {
      if (isMounted) {
        setRawData(data);
        setLoading(false);
      }
    }, () => { if (isMounted) { setError(true); setLoading(false); } });
  }, [dispatch]);

  const resendEmailConfirmationCode = useCallback(async (id) => {
    dispatch(actionsLoader.loading());
    await userService.resendEmailConfirmationCode(dispatch, {
      id: id,
      returnLink: `${window.location.origin}/auth/confirmemail`
    });
    dispatch(actionsLoader.hideLoading());
  }, [dispatch]);

  const removeUser = useCallback(async (id) => {
    dispatch(actionsAlert.alert({
      Message: 'Are you sure you want to remove this user?',
      Text: 'This will permanently delete this user from the system',
      Confirm: true,
      ConfirmCallback: async () => {
        dispatch(actionsLoader.loading());
        await userService.removeUser(dispatch, id, () => {
          if (isMounted) {
            setLoading(true);
            setError(false);
            getData();
          }
        });
        dispatch(actionsLoader.hideLoading());
      },
      ConfirmBtnText: 'Yes'
    }));
  }, [dispatch, getData]);

  const data = useMemo(() => {
    let temp = [];
    if (rawData.length) {
      for (let i = 0; i < rawData.length; i++) {
        let currentItem = i;
        temp.push({
          FirstName: rawData[i].firstName ? rawData[i].firstName : '',
          LastName: rawData[i].lastName ? rawData[i].lastName : '',
          Email: rawData[i].email ? rawData[i].email : '',
          Actions: <Section dFlex justifyContentEnd flexWrap>
            {rawData[i].emailConfirmed ? null : <Button color="info" size="sm" onClick={() => { resendEmailConfirmationCode(rawData[currentItem].id); }}>Resend Email</Button>}
            {userId === rawData[currentItem].id ? null : <Button color="primary" size="sm" onClick={() => { removeUser(rawData[currentItem].id) }}>Remove</Button>}
          </Section>
        });
      }
    }
    return temp;
  }, [rawData, removeUser, resendEmailConfirmationCode, userId]);

  const columns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'FirstName'
    },
    {
      Header: 'Last Name',
      accessor: 'LastName'
    },
    {
      Header: 'Email',
      accessor: 'Email'
    },
    {
      Header: 'Actions',
      accessor: 'Actions'
    },
  ], []);

  useEffect(() => { getData(); }, [getData]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card animate fade>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon path={mdiAccountGroupOutline} />
              </CardIcon>
            </CardHeader>
            <CardBody>
              {
                error ?
                  <Section dFlex justifyContentCenter flexColumn>
                    <h3>Error</h3>
                    <p>Could not load user list</p>
                    <div><Button color="primary" size="sm" onClick={() => { setLoading(true); setError(false); getData(); }}>Refresh Page</Button></div>
                  </Section>
                  :
                  loading ?
                    <Loader />
                    :
                    data.length ?
                      <ReactTable
                        columns={columns}
                        data={data}
                        minWidth={250}
                      />
                      :
                      <div>
                        <h3>No System Administrators</h3>
                        <p>There are no system admins available at this moment</p>
                      </div>
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default UserList;