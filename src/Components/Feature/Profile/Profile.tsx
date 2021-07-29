import React, {useCallback} from 'react';
import S from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../Store/store';
import {UserDataType} from '../../../Api/authAPI';
import {Redirect} from 'react-router-dom';
import {logout} from '../../../Store/auth-reducer';
import {MyButton} from "../../Common/MyButton/MyButton";

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = props => {
    const userData = useSelector<AppStoreType, UserDataType | null>(state => state.auth.userData)
    const dispatch = useDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if (userData === null) {
        return <Redirect to='/login'/>
    }

    return (
        <div className={S.profile}>
            <div className={S.profileWrap}>
                <h4>Profile page!</h4>
                <div className={S.avatar}>
                    <img src={userData.avatar || ""} alt='avatar'/>
                </div>
                <div className={S.name}>
                    <p>{userData.name}</p>
                </div>
                <div>
                    <MyButton className={S.button} onClick={logoutHandler}>Logout</MyButton>
                </div>
            </div>
        </div>
    )
}