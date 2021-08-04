
import React from "react";
import S from "./Header.module.css";
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={S.header_container}>
            <div className={S.nav_container}>
                <h2>It-incubator</h2>
                <nav>
                    <NavLink to={"/main/packs"}>Card Packs</NavLink>
                    <NavLink to={"/main/profile"}>Profile</NavLink>
                </nav>
            </div>
        </div>
    )
}