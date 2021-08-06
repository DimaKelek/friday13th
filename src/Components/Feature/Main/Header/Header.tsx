
import React from "react";
import S from "./Header.module.css";
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={S.header_container}>
            <div className={S.nav_container}>
                <h2>It-incubator</h2>
                <nav>
                    <NavLink to={"/packs"}>Card Packs</NavLink>
                    <NavLink to={"/profile"}>Profile</NavLink>
                </nav>
            </div>
        </div>
    )
}