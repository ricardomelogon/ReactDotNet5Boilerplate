import React, { useState, useCallback, useMemo, useEffect } from 'react';
import errorLogService from "../../services/errorLogService";
import { useDispatch } from 'react-redux';

// material icons
import { mdiAccountGroupOutline } from "@mdi/js";
import { Icon } from "@mdi/react";

//Components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button";
import Loader from "components/Loader/InlineLoader";
import ReactTable from "components/ReactTable/ReactTable";
import Section from "components/Section/Section";


export default function ErrorLogs() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [rawData, setRawData] = useState([]);
    const dispatch = useDispatch();
    const getErrorLogs = useCallback(async () => {
        await errorLogService.getErrorLogs(dispatch, async (data) => {
            setRawData(data);
            setLoading(false);
        }, () => { setError(true) });
    }, [dispatch]);

    const data = useMemo(() => {
        let temp = [];
        if (rawData.length) {
            for (let i = 0; i < rawData.length; i++) {
                temp.push({
                    Log: rawData[i].log ? rawData[i].log : '',
                    Method: rawData[i].method ? rawData[i].method : '',
                    Path: rawData[i].path ? rawData[i].path : '',
                    Date: rawData[i].date ? rawData[i].date : '',
                    User: rawData[i].username ? rawData[i].username : '',
                    UserEmail: rawData[i].useremail ? rawData[i].useremail : '',
                });
            }
        }
        return temp;
    }, [rawData]);

    const columns = useMemo(() => [
        {
            Header: 'Log',
            accessor: 'Log'
        },
        {
            Header: 'Method',
            accessor: 'Method'
        },
        {
            Header: 'Path',
            accessor: 'Path'
        },
        {
            Header: 'Date',
            accessor: 'Date'
        },
        {
            Header: 'User',
            accessor: 'User'
        },
        {
            Header: 'User Email',
            accessor: 'UserEmail'
        },
    ], []);

    useEffect(() => { getErrorLogs(); }, [getErrorLogs]);

    return (
        <GridContainer>
            <GridItem xs={12}>
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
                                    <div><Button color="primary" size="sm" onClick={() => { setLoading(true); setError(false); getErrorLogs(); }}>Refresh Page</Button></div>
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
                                            <h3>No Errors</h3>
                                            <p>There are no logs at this moment</p>
                                        </div>
                        }
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
