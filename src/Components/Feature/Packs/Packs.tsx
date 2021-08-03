import React, {FC} from 'react'
import Sc from "../Authorization/AuthCommon/Styles/CommonStyles.module.css";
import S from "./Packs.module.css";
import {MyButton} from "../../Common/MyButton/MyButton";
import {MyDoubleRange} from "../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {MyTextInput} from "../../Common/MyTextInput/MyTextInput";
import MyTable from "../../Common/MyTable/MyTable";
import MyTableHeader from "../../Common/MyTable/Components/MyTableHeader";
import MyTableRow from "../../Common/MyTable/Components/MyTableRow";
import {CardPackType} from "../../../Store/cardpacks-reducer";
import {timeparser} from "../../../Utils/timeparser";

type PacksPropsType = {
    data: Array<CardPackType>
    currentUserId?: string
}
export const Packs: FC<PacksPropsType> = ({data}) => {

    const headerTitles: Array<string | React.ReactNode> = [
        'Name',
        'Cards',
        <MyButton onClick={() => {}}>Last Updated</MyButton>,
        'Created by',
        'Actions']
    const cellData = data.map((el: any) => [
        el.name,
        el.cardsCount,
        timeparser(el.updated),
        el.user_name,
        <MyButton>Delete</MyButton>,
        <MyButton>Edit</MyButton>,
        <MyButton>Learn</MyButton>,])
    const columnSchema = `'h1 h2 h3 h4 h5 h5 h5'`
    const columnWeights = ['8fr', '2fr', '5fr', '5fr', '1fr', '1fr', '1fr',]
    const rowMinHeight = '48px'
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
                        <MyTable cellData={cellData}
                                 headerTitles={headerTitles}
                                 columnSchema={columnSchema}
                                 columnWeights={columnWeights}
                                 rowMinHeight={rowMinHeight}/>
                    </div>
                    <div className={S.packs__block}>

                    </div>
                </div>
            </div>
        </div>
    )
}
