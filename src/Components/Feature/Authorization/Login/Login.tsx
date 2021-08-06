import React, {useEffect} from "react";
import {AppStoreType} from '../../../../Store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {login} from '../../../../Store/auth-reducer';
import {NavLink, Redirect} from 'react-router-dom';
import s from './Login.module.css'
import Sc from '../AuthCommon/Styles/CommonStyles.module.css'
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {MyCheckbox} from "../../../Common/MyCheckbox/MyCheckbox";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {setRegistrationStatus} from "../../../../Store/registration-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLoggedIn = useSelector<AppStoreType, boolean>((state) => state.auth.isLoggedIn)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setRegistrationStatus(false))
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or less';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm();
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/app/profile'}/>
    }

    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>IT - Incubator</h3>
                <h4>Sing In</h4>
                <form onSubmit={formik.handleSubmit}>
                    <div className={Sc.fields}>
                        <MyTextInput
                            variant="light"
                            placeholder={"Email"}
                            error={formik.touched.email ? formik.errors.email : null}
                            {...formik.getFieldProps('email')}
                            style={{minWidth: "300px"}}
                        />
                        <MyTextInput
                            type="password"
                            variant="light"
                            placeholder={"Password"}
                            error={formik.touched.password ? formik.errors.password : null}
                            {...formik.getFieldProps('password')}
                            style={{minWidth: "300px"}}
                        />
                        <NavLink className={s.forgot} to='/recovery'>Forgot Password</NavLink>
                    </div>
                    <div className={s.checkbox}>
                        <MyCheckbox  {...formik.getFieldProps('rememberMe')}>Remember Me</MyCheckbox>
                    </div>
                    <div className={Sc.button_box}>
                        {status === "loading"
                            ? <CircularProgress/>
                            : <MyButton className={s.button} type={'submit'} variant='purple'>Login</MyButton>
                        }
                    </div>
                </form>
                <div className={Sc.link_box}>
                    <span className={Sc.title}>Don't have an account?</span>
                    <NavLink to="/registration"><span className={Sc.link}>Sign Up</span></NavLink>
                </div>
            </div>
        </div>
    )
}