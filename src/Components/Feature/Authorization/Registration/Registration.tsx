import React, {useEffect, useState} from "react";
import {useFormik} from 'formik';
import S from "./Registration.module.css"
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {setRegistrationFormError, signup} from "../../../../Store/registration-reducer";
import withStyles from "@material-ui/core/styles/withStyles";
import {AppStoreType} from "../../../../Store/store";

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

// TODO: add common fields validators


export const Registration: React.FC<RegistrationPropsType> = props => {
    const [isAuth, setIsAuth] = useState(false) // TODO: get isAuth prop from authReducer
    const [signupCancelled, cancelSignup] = useState(false)
    const status = useSelector<AppStoreType, string>((state => state.registration.registrationStatus))
    const cancelRegistration = () => {
        cancelSignup(true)
    }
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
                errors.email = 'Invalid email address. Please try again';
            }
            if (!formData.password) {
                errors.password = 'Password is required'
            } else if (formData.password.length < 8) {
                errors.password = 'Password must be at least 8 characters'
            }
            if (formData.password && !formData.confirmedPassword) {
                errors.confirmedPassword = 'Confirm your password'
            } else if (formData.password !== formData.confirmedPassword) {
                errors.confirmedPassword = 'You entered two different passwords. Please try again'
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(signup({email: values.email, password: values.password}))
        },
    })

    useEffect(() => {
        if (status === "Succeeded!") signupForm.resetForm()
    }, [])

    if (Object.values(signupForm.errors).length > 0 && signupForm.isSubmitting) {
        let errorsArr = Object.values(signupForm.errors)
        errorsArr.length > 1
            ? dispatch(setRegistrationFormError('Fill all fields correctly'))
            : dispatch(setRegistrationFormError(errorsArr[0]))
    }

    if (signupCancelled) {
        return <Redirect to={'/login'}/>
    }
    if (isAuth) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={S.registration}>
            <div className={S.formContainer}>
                <form onSubmit={signupForm.handleSubmit}
                      className={S.form}
                      autoComplete={'off'}>
                    <div className={S.row}>
                        <h2>
                            <span>Sign Up</span>
                            {/*<span style={{opacity: 0.04}}>, bitch!</span>*/}
                        </h2>
                    </div>
                    <div className={S.row}>
                        <CTextField error={!!signupForm.errors.email && signupForm.touched.email}
                            variant="outlined"
                            label="Email"
                            margin="normal"
                            name={'email'}
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.email}
                        />
                    </div>
                    <div className={S.row}>
                        <CTextField error={!!signupForm.errors.password && signupForm.touched.password}
                            variant="outlined"
                            label="Password"
                            type="password"
                            margin="normal"
                            name={'password'}
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.password}
                        />
                    </div>
                    <div className={S.row}>
                        <CTextField error={!!signupForm.errors.confirmedPassword && signupForm.touched.confirmedPassword}
                            variant="outlined"
                            label="Confirm password"
                            type="password"
                            margin="normal"
                            name={'confirmedPassword'}
                            onChange={signupForm.handleChange}
                            onBlur={signupForm.handleBlur}
                            value={signupForm.values.confirmedPassword}
                        />
                    </div>
                    <div className={S.row}>
                        <Button onClick={cancelRegistration}
                                variant={'contained'}
                                color={'secondary'}>
                            Cancel
                        </Button>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const CTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#000',

        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#000',
            borderWidth: '3px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                color: '#000',
                borderColor: '#000',
                borderWidth: '3px',
            },
            '&:hover fieldset': {
                borderColor: '#000',
                borderWidth: '3px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#000',
                borderWidth: '3px',
            },
            '&.Mui-error fieldset': {
                borderColor: '#ff0000',
                animation: 'blinking 1s infinite',
            }
        },
    },
})(TextField)