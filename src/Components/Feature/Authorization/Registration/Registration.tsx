import React, {useState} from "react";
import {useFormik} from 'formik';
import S from "./Registration.module.css"
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type RegistrationPropsType = {}

type SignupFormErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}

 // TODO: add common fields validators


export const Registration: React.FC<RegistrationPropsType> = props => {
    const [isAuth, setIsAuth] = useState(false) // TODO: get isAuth prop from authReducer
    const [signupCancelled, cancelSignup] = useState(false)
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
                errors.email = 'Field is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
                errors.email = 'Invalid email address. Please try again';
            }

            if (!formData.password) {
                errors.password = 'Required'
            } else if (formData.password.length < 8) {
                errors.password = 'Password must be at least 8 characters'
            }

            if (formData.password !== formData.confirmedPassword) {
                errors.confirmedPassword = 'You entered two different passwords. Please try again'
            }

            return errors;
        },

        onSubmit: values => {
//            dispatch(signup(values))
            signupForm.resetForm()
        },
    })

    if (isAuth || signupCancelled) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={S.registration}>
            <div className={S.formContainer}>
                <form onSubmit={signupForm.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <h2>
                                <span>Sign Up</span>
                                <span style={{opacity: 0.04}}>, bitch!</span>
                            </h2>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                name={'email'}
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.email}
                            />
                            {signupForm.touched.email && signupForm.errors.email
                                ? <div style={{color: 'red'}}>{signupForm.errors.email}</div>
                                : null}
                            <TextField
                                label="Password"
                                type="password"
                                margin="normal"
                                name={'password'}
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.password}
                            />
                            {signupForm.touched.password && signupForm.errors.password
                                ? <div style={{color: 'red'}}>{signupForm.errors.password}</div>
                                : null}
                            <TextField
                                label="Confirm password"
                                type="password"
                                margin="normal"
                                name={'confirmedPassword'}
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                value={signupForm.values.confirmedPassword}
                            />
                            {signupForm.touched.confirmedPassword && signupForm.errors.confirmedPassword
                                ? <div style={{color: 'red'}}>{signupForm.errors.confirmedPassword}</div>
                                : null}
                            <div className={S.formButtonsContainer}>
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
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}