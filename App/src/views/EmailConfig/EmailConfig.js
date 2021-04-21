import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import emailConfigService from "../../services/emailConfigService.js";
import produce from 'immer';
import { actionsAlert } from "../../redux/modules";
import { isEmail } from "../../helpers/regexHelpers";

//Components
import Container from "../../components/Grid/GridContainer.js";
import Item from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button";
import Section from "../../components/Section/Section";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/CustomInput/PasswordInput";
import Loader from "../../components/Loader/InlineLoader";
import Danger from "../../components/Typography/Danger";
import Switch from "../../components/Switch/Switch";

export default function EmailConfig() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    receiver: {
      id: '',
      email: '',
      displayName: '',
      host: '',
      port: 0,
      username: '',
      password: '',
      enableSsl: false,
    },
    sender: {
      id: '',
      email: '',
      displayName: '',
      host: '',
      port: 0,
      username: '',
      password: '',
      enableSsl: false,
    }
  });
  const dispatch = useDispatch();

  const handleInput = useCallback((parent, key, e) => {
    let value = e.target.value;
    setData(produce(data => {
      data[parent][key] = value;
    }));
  }, []);

  const handleSwitch = useCallback((parent, key) => {
    setData(produce(data => {
      data[parent][key] = !data[parent][key];
    }));
  }, []);

  const getData = useCallback(async () => {
    await emailConfigService.getConfiguration(dispatch, async (data) => {
      setData(data);
      setLoading(false);
    }, () => { setError(true) });
  }, [dispatch]);

  const updateEmailConfiguration = useCallback(() => {
    if (!data.sender.id || !data.receiver.id) return dispatch(actionsAlert.alert({
      Message: 'Unexpected error',
      Text: 'Please reload the page and try again',
      Type: 'error'
    }));
    let missingVariables = [];

    if (!data.sender.email || !isEmail(data.sender.email)) missingVariables.push("Email");
    if (!data.sender.displayName) missingVariables.push("Display Name");
    if (!data.sender.host) missingVariables.push("Host");
    if (!data.sender.username) missingVariables.push("Username");

    if (!data.receiver.email || !isEmail(data.receiver.email)) missingVariables.push("Email");
    if (!data.receiver.displayName) missingVariables.push("Display Name");
    if (!data.receiver.host) missingVariables.push("Host");
    if (!data.receiver.username) missingVariables.push("Username");

    if (missingVariables.length !== 0) return dispatch(actionsAlert.alert({
      Message: 'Required inputs missing',
      Text: `Please enter valid values for: ${missingVariables.join(', ')}`,
      Type: 'warning'
    }));

    emailConfigService.updateEmailInfo(dispatch, data, () => {
      setLoading(true);
      getData();
    });
  }, [data, dispatch, getData]);



  useEffect(() => { getData(); }, [getData]);

  return (
    <Container>
      <Item xs={12}>
        <Card animate fade>
          <CardHeader color="primary">
            <h5>Configure your Email Sender and Receiver</h5>
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
                  <Container>
                    <Item xs={12}>
                      <p>Changing these configurations will change which emails are used to send or receiver emails. If changes have to be made and you are not sure how to proceed, please contact support.</p>
                      <p>The usage of different emails for sending and receiving messages is highly advised. Using the same address may cause unwanted effects.</p>
                      <Section dFlex><Danger>Attention: </Danger> leave password blank if you do not wish to change it</Section>
                    </Item>
                    <Item xs={12}>
                      <Container>
                        <Item xs={12}>
                          <h3>Sender Email</h3>
                          <ul>
                            <li>The Sender Email uses the SMTP protocol</li>
                            <li>The Sender Email service must be configured to allow sending emails through SMTP</li>
                            <li>Depending on the email service utilized, extra configurations might be necessary to make sure sent emails are considered secure and not spam. These extra changes are entirely dependent on the email sending provider selected and under your responsibility.</li>
                            <li>If the current sender is changed, all future emails will be sent through the new configuration. If the configuration is not done properly, emails will not be sent. This includes password reset, registration confirmations, and any other email type.</li>
                          </ul>
                          <hr />
                        </Item>
                      </Container>
                      <Container>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Email"} fullWidth type="text" required value={data.sender.email} onChange={(e) => { handleInput("sender", "email", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Display Name"} fullWidth type="text" required value={data.sender.displayName} onChange={(e) => { handleInput("sender", "displayName", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Host"} fullWidth type="text" required value={data.sender.host} onChange={(e) => { handleInput("sender", "host", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Port"} fullWidth type="number" required value={data.sender.port} onChange={(e) => { handleInput("sender", "port", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Username"} fullWidth type="text" required value={data.sender.username} onChange={(e) => { handleInput("sender", "username", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <PasswordInput labelText={"Password"} fullWidth type="text" value={data.sender.password} onChange={(e) => { handleInput("sender", "password", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <Switch checked={data.sender.enableSsl} onChange={() => { handleSwitch("sender", "enableSsl") }} name="SenderEnableSSL" labelRight="Yes" labelLeft="No" labelTop="Enable SSL" />
                        </Item>
                      </Container>
                    </Item>
                    <Item xs={12}>
                      <Container>
                        <Item xs={12}>
                          <h3>Receiver Email</h3>
                          <ul>
                            <li>The Receiver Email uses the IMAP protocol</li>
                            <li>The Receiver Email service must be configured to allow access through IMAP</li>
                            <li>Only the email main inbox will be verified</li>
                            <li>If this email is changed, any emails not currently read or received thereafter to the previous address will not be obtained</li>
                          </ul>
                          <hr />
                        </Item>
                      </Container>
                      <Container>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Email"} fullWidth type="text" required value={data.receiver.email} onChange={(e) => { handleInput("receiver", "email", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Display Name"} fullWidth type="text" required value={data.receiver.displayName} onChange={(e) => { handleInput("receiver", "displayName", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Host"} fullWidth type="text" required value={data.receiver.host} onChange={(e) => { handleInput("receiver", "host", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Port"} fullWidth type="number" required value={data.receiver.port} onChange={(e) => { handleInput("receiver", "port", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <CustomInput labelText={"Username"} fullWidth type="text" required value={data.receiver.username} onChange={(e) => { handleInput("receiver", "username", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <PasswordInput labelText={"Password"} fullWidth type="text" value={data.receiver.password} onChange={(e) => { handleInput("receiver", "password", e) }} />
                        </Item>
                        <Item sm={12} md={6} lg={4}>
                          <Switch checked={data.receiver.enableSsl} onChange={() => { handleSwitch("receiver", "enableSsl") }} name="SenderEnableSSL" labelRight="Yes" labelLeft="No" labelTop="Enable SSL" />
                        </Item>
                      </Container>
                    </Item>
                    <Item xs={12}>
                      <hr />
                      <Section dFlex>
                        <Button color="primary" onClick={updateEmailConfiguration}>Update Emails</Button>
                      </Section>
                    </Item>
                  </Container>
            }
          </CardBody>
        </Card>
      </Item>
    </Container>
  )
}
