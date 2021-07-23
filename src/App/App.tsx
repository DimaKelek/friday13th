import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Header} from "../Components/Common/Header";
//1
export const App: React.FC<any> = props => {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes/>
            </HashRouter>
        </div>
    );
}