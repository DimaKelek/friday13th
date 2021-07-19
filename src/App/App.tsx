import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Header} from "../Components/Common/Header";

export const App: React.FC<any> = props => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes/>
            </BrowserRouter>
        </div>
    );
}