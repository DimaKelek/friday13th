import React, {FC} from 'react'
import S from "../Packs.module.css";
import {MyButton} from "../../../../Common/MyButton/MyButton";
import {MyDoubleRange} from "../../../../Common/Ranges/MyDoubleRange/MyDoubleRange";
import {RequestStatusType} from "../../../../../Store/app-reducer";

type FiltersPropsType = {
    appStatus: RequestStatusType
    showOwnMode: boolean
    rangeValues: [number, number]
    minCardsCount: number
    maxCardsCount: number
    handleSetRangeValues: ([min, max]: Array<number>) => void
    handleToggleShowOwnMode: () => void
}
export const Filters: FC<FiltersPropsType> = ({appStatus,
                                                  showOwnMode,
                                                  rangeValues,
                                                  minCardsCount,
                                                  maxCardsCount,
                                                  handleSetRangeValues,
                                                  handleToggleShowOwnMode,}) => {
    return (
        <div className={S.filters__container}>
            <div className={S.filters__block}>
                <div className={S.filters__title}>Show packs cards</div>
                <div>
                    <MyButton onClick={handleToggleShowOwnMode}
                              variant={showOwnMode ? "purple" : "light"}>My</MyButton>
                    <MyButton onClick={handleToggleShowOwnMode}
                              variant={showOwnMode ? "light" : "purple"}>All</MyButton>
                </div>
            </div>
            <div className={S.filters__block}>
                <div className={S.filters__title}>Numbers of cards</div>
                <MyDoubleRange value={rangeValues}
                               onChangeRange={handleSetRangeValues}
                               min={minCardsCount}
                               max={maxCardsCount}/>
            </div>
        </div>
    )
}