import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Header} from "../Components/Common/Header";
import ErrorSnackbar from "../Components/Common/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppStoreType} from "../Store/store";
import InfoSnackbar from "../Components/Common/InfoSnackbar/InfoSnackbar";
import {TRegistrationStatus} from "../Store/registration-reducer";
//раз два три
export const App: React.FC<any> = props => {
    const error = useSelector<AppStoreType, string>((state => state.registration.registrationFormError))
    const info = useSelector<AppStoreType, TRegistrationStatus>((state => state.registration.registrationStatus))
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes/>
                <ErrorSnackbar error={error}/>
                {info !== 'Idle' && <InfoSnackbar info={info}/>}
            </HashRouter>
        </div>
    );
}