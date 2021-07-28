import React from 'react';
import S from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../Store/store';
import {UserDataType} from '../../../API/authAPI';
import {Redirect} from 'react-router-dom';
import {logout} from '../../../Store/auth-reducer';
import {Button} from '@material-ui/core';

type ProfilePropsType = {}

export const Profile: React.FC<ProfilePropsType> = props => {

  const userData = useSelector<AppStoreType, UserDataType | null>(state => state.auth.userData)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }


  if(userData === null) {
    return <Redirect to='/login'/>
  }

  return (
    <div className={S.profile}>
      <div className={S.profileWrap}>
        <h4>Profile page!</h4>
        <div className={S.avatar}>
          <img src={userData.avatar} alt='avatar'/>
        </div>
        <div className={S.name}>
          <p>
            {userData.name}
          </p>
        </div>
        <div>
          <Button className={S.button} color={'primary'}
                  variant={'contained'}
                  onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
    </div>
  )
}