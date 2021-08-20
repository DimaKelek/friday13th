import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../Store/store";
import {ErrorSnackbar} from "../Components/Common/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "../Store/app-reducer";
import {CircularProgress} from "@material-ui/core";
import {checkingAuthorization} from "../Store/auth-reducer";
//раз два три
export const App: React.FC<any> = props => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkingAuthorization())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '50%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            {status === "failed" && <ErrorSnackbar/>}
            <HashRouter>
                <Routes />
            </HashRouter>
        </div>
    );
}