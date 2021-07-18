import React from 'react';
import './App.css';
import {SandBox} from "../Components/SandBox/SandBox";

export const App: React.FC<any> = props => {
    return (
        <div className="App">
            <SandBox/>
        </div>
    );
}