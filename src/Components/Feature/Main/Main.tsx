import React from "react";
import S from "./Main.module.css"
import {Header} from "./Header/Header";
import {HashRouter, Route} from "react-router-dom";
import {Decks} from "./Decks/Decks";
import {Cards} from "./Cards/Cards";
import {Profile} from "./Profile/Profile";
import {LearningMode} from "./Learning/LearningMode";

export const Main: React.FC = props => {
    return (
        <div className={S.main}>
            <Header />
            <div className={S.content}>
                <HashRouter>
                    <Route path={"/app/profile"} render={() => <Profile />}/>
                    <Route path={"/app/decks"} render={() => <Decks />}/>
                    <Route path={"/app/cards/:deckID"} render={() => <Cards />}/>
                    <Route path={"/app/learning/:deckID"} render={() => <LearningMode />}/>
                </HashRouter>
            </div>
        </div>
    )
}