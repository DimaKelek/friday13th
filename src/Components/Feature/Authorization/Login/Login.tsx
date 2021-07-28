import React from "react";
import {AppStoreType} from '../../../../Store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {login} from '../../../../Store/auth-reducer';
import {Redirect, NavLink } from 'react-router-dom';
import s from './Login.module.css'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
  Grid,
  Paper, FormLabel
} from '@material-ui/core'


type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {

  const isLoggedIn = useSelector<AppStoreType, boolean>((state) => state.auth.isLoggedIn)

  const dispatch = useDispatch()

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
    return <Redirect to={'/profile'}/>
  }

  return (
  <Grid container justifyContent="center">
    <Grid item xs={3}>
      <Paper elevation={3} style={{marginTop: '100px', marginBottom: '10px'}} >
        <form onSubmit={formik.handleSubmit} className={s.login}>
          <FormControl className={s.formControl}>
            <FormLabel className={s.label}>
              <h3 className={s.h3}>IT - Incubator</h3>
              <p className={s.singIn}>Sing In</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />

              {formik.touched.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

              <FormControlLabel
                className={s.formMe}
                label={'Remember me'}
                control={
                  <Checkbox  {...formik.getFieldProps('rememberMe')}/>}/>
              <NavLink className={s.forgotPass}  to='/recovery'>
                Forgot Password
              </NavLink>
              <Button className={s.button}
                      type={'submit'} variant={'contained'}
                      color={'primary'}>Login</Button>
            </FormGroup>
          </FormControl>
        </form>
        <p className={s.text}>Don’t have an account?</p>
        <NavLink className={s.singUp}  to='/registration'>
            Sing Up
        </NavLink>
      </Paper>
    </Grid>
  </Grid>
  )
}