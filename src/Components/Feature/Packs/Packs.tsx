import React, {FC} from 'react'
import Sc from "../Authorization/AuthCommon/Styles/CommonStyles.module.css";
import S from "./Packs.module.css";
import {MyButton} from "../../Common/MyButton/MyButton";
import {MyDoubleRange} from "../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {MyTextInput} from "../../Common/MyTextInput/MyTextInput";
import MyTable from "../../Common/MyTable/MyTable";

type PacksPropsType = {

}
export const Packs: FC<PacksPropsType> = ({}) => {
    return (
        <div className={Sc.page_container}>
            <div className={S.page}>
                <div className={S.filters__container}>
                    <div className={S.filters__block}>
                        <div className={S.filters__title}>Show packs cards</div>
                        <div>
                            <MyButton>My</MyButton>
                            <MyButton>All</MyButton>
                        </div>
                    </div>
                    <div className={S.filters__block}>
                        <div className={S.filters__title}>Numbers of cards</div>
                        <MyDoubleRange value={[4, 112]}/>
                    </div>
                </div>
                <div className={S.packs__container}>
                    <div className={S.packs__block}>
                        <h3 className={S.packs__title}>Packs list</h3>
                    </div>
                    <div className={S.packs__block}>
                        <div className={S.packs__search}>
                            <MyTextInput/>
                            <MyButton>Add new pack</MyButton>
                        </div>
                    </div>
                    <div className={S.packs__block}>
                        <MyTable />
                    </div>
                    <div className={S.packs__block}>

                    </div>
                </div>
            </div>
        </div>
    )
}
