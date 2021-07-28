import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Profile} from "../Components/Feature/Profile/Profile";
import {Login} from "../Components/Feature/Authorization/Login/Login";
import {Registration} from "../Components/Feature/Authorization/Registration/Registration";
import {SandBox} from "../Components/Common/SandBox/SandBox";
import {Page404} from "../Components/Common/Page404/Page404";
import {RecoveryContainer} from "../Components/Feature/Authorization/RecoveryPass/RecoveryContainer";
import {NewPassContainer} from "../Components/Feature/Authorization/NewPass/NewPassContainer";

export const Routes: React.FC<any> = props => {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>
                <Route path={"/profile"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/recovery"} render={() => <RecoveryContainer />}/>
                <Route path={"/new-password"} render={() => <NewPassContainer/>}/>
                <Route path={"/sand-box"} render={() => <SandBox/>}/>
                <Route path={"/404"} render={() => <Page404/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </div>
    )
}