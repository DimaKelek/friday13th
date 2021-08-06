
import React from "react";
import S from "./Main.module.css"
import {Header} from "./Header/Header";
import {Route} from "react-router-dom";
import {Profile} from "./Profile/Profile";
import {PacksContainer} from "./Packs/PacksContainer";
import {Cards} from "./Cards/Cards";

export const Main = () => {
    return (
        <div className={S.main}>
            <Header />
            <div className={S.content}>
                    <Route path={"/profile"} render={() => <Profile />}/>
                    <Route path={"/packs"} render={() => <PacksContainer />}/>
                    <Route path={"/cards"} render={() => <Cards />}/>
            </div>
        </div>
    )
}