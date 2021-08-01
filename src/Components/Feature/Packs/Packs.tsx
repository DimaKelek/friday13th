import React, {FC} from 'react'
import Sc from "../Authorization/AuthCommon/Styles/CommonStyles.module.css";
import S from "./Packs.module.css";
import {MyButton} from "../../Common/MyButton/MyButton";
import {MyDoubleRange} from "../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {MyTextInput} from "../../Common/MyTextInput/MyTextInput";
import MyTable from "../../Common/MyTable/MyTable";
import MyTableHeader from "../../Common/MyTable/Components/MyTableHeader";
import MyTableRow from "../../Common/MyTable/Components/MyTableRow";

type PacksPropsType = {
    data: any
}
export const Packs: FC<PacksPropsType> = ({data}) => {
    const dataB = [
        {

            name:" cardDDDDDDDD",
            cardsCount:'1534543535435',
            created:"2021-07-31T16:52:24.159Z",
            updated:"2021-07-31T16:53:57.206Z",
            "_id":"61",
        },
        {

            name:"new pack 2.0",
            cardsCount:'0',
            created:"2021-07-31T16:39:19.718Z",
            updated:"2021-07-31T16:39:19.718Z",
            "_id":"610",
        },
        {
            name:"test",
            cardsCount:'0',
            created:"2021-07-31T07:53:29.570Z",
            updated:"2021-07-31T07:53:29.570Z",
            "_id":"610",
        },
        {
            name:"Updated deck",
            cardsCount:'22222222222222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"60",
        },
        {
            name:"Updated deck",
            cardsCount:'222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"6",
        },
        {
            name:"Updated deck",
            cardsCount:'22222222222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"60",
        },

        {
            name:"Updated deck",
            cardsCount:'22222222222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"60",
        },

        {
            name:"Updated deck",
            cardsCount:'22222222222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"60",
        },

        {
            name:"Updated deck",
            cardsCount:'22222222222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"60",
        },

        {
            name:"Updated deck",
            cardsCount:'22222222222',
            created:"2021-07-14T17:57:29.263Z",
            updated:"2021-07-31T07:52:04.280Z",
            "_id":"60ef25898c169e00046b0dd6",
        },
    ]
    const headerTitles: Array<string | React.ReactNode> = [
        'Name',
        'Cards',
        <MyButton>Last Updated</MyButton>,
        'Created by',
        'Actions']
    const cellData = data.map((el: any) => [
        el.name,
        el.cardsCount,
        el.updated,
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
