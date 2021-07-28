import React from "react";
import {AppStoreType} from '../../../../Store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {login} from '../../../../Store/auth-reducer';
import {Redirect} from 'react-router-dom';
import s from './Login.module.css'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Button,
  Grid,
  Paper
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
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
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
  <Grid container justify="center">
    <Grid item xs={4}>
      <Paper elevation={3} style={{marginTop: '100px'}}>
        <form onSubmit={formik.handleSubmit} className={s.login}>
          <FormControl>
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
                label={'Remember me'}
                control={
                  <Checkbox {...formik.getFieldProps('rememberMe')}/>}

              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
            </FormGroup>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  </Grid>
  )
}