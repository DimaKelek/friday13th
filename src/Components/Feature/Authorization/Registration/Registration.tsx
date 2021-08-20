import React from "react";
import {useFormik} from 'formik';
import S from "./Registration.module.css"
import Sc from "../AuthCommon/Styles/CommonStyles.module.css"
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {AppStoreType} from "../../../../Store/store";
import {MyButton} from "../../../Common/MyButton/MyButton";
import {MyTextInput} from "../../../Common/MyTextInput/MyTextInput";
import {RequestStatusType} from "../../../../Store/app-reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {login} from "../../../../Store/auth-reducer";
import {registration} from "../../../../Store/registration-reducer";

type RegistrationPropsType = {}

type SignupFormErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}

export type SignupFormDataType = {
    email: string
    password: string
}

export const Registration: React.FC<RegistrationPropsType> = props => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const register = useSelector<AppStoreType, boolean>(state => state.registration.register)
    const dispatch = useDispatch()

    const signupForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPassword: '',
        },
        validate: (formData) => {
            const errors: SignupFormErrorType = {};
            if (!formData.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
                errors.email = 'Invalid email address.';
            }
            if (!formData.password) {
                errors.password = 'Password is required'
            } else if (formData.password.length < 8) {
                errors.password = 'Password must be at least 8 symbols'
            }
            if (formData.password && !formData.confirmedPassword) {
                errors.confirmedPassword = 'Confirm your password'
            } else if (formData.password !== formData.confirmedPassword) {
                errors.confirmedPassword = 'You entered two different passwords.'
            }
            return errors;
        },
        onSubmit: values => {
            if (values.password === values.confirmedPassword) {
                dispatch(registration({email: values.email, password: values.password}))
                signupForm.resetForm()
            }
        },
    })

    if (register) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div className={Sc.page_container}>
            <div className={Sc.form_container}>
                <h3>It-incubator</h3>
                <h4>Sign Up</h4>
                <form onSubmit={signupForm.handleSubmit} className={S.form} autoComplete={'off'}>
                    <div className={Sc.fields}>
                        <MyTextInput
                            error={signupForm.touched.email ? signupForm.errors.email : null}
                            {...signupForm.getFieldProps('email')}
                            variant={"light"}
                            placeholder={"Email"}
                            style={{minWidth: "300px"}}
                        />
                        <MyTextInput
                            type="password"
                            error={signupForm.touched.password ? signupForm.errors.password : null}
                            {...signupForm.getFieldProps('password')}
                            variant={"light"}
                            placeholder={"Password"}
                            style={{minWidth: "300px"}}
                        />
                        <MyTextInput
                            type="password"
                            error={signupForm.touched.confirmedPassword ? signupForm.errors.confirmedPassword : null}
                            {...signupForm.getFieldProps('confirmedPassword')}
                            variant={"light"}
                            placeholder={"Confirm password"}
                            style={{minWidth: "300px"}}
                        />
                    </div>
                    {status === "loading"
                        ? <CircularProgress/>
                        : <div>
                            <NavLink to={'/login'}><MyButton type={'button'} variant={"light"}>Cancel</MyButton></NavLink>
                            <MyButton type={'submit'} variant={"purple"}>Sign Up</MyButton>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}