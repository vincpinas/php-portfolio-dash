import React, { useEffect, Dispatch } from 'react';
import { MdOutlineScheduleSend, MdOutlineSend } from 'react-icons/md';
import { User } from '../../interface';
import Cookies from 'cookies-js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '../../requests';
import './Login.scss';


interface loginProps {
  setUser: Dispatch<React.SetStateAction<User>>;
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setUser, setIsLoggedIn }: loginProps) {
  const { mutate: reqLogin, isLoading, isSuccess, data } = useLogin();

  useEffect(() => {
    if(isSuccess && data.user) {
      setUser(data.user);
      setIsLoggedIn(true);
      Cookies.set('user_email', data.user.email);
    }
  }, [isSuccess]);

  const lAF = (e: any) => {
    const parent = e.target.parentElement;
    parent.classList.remove('iF-label'); parent.classList.remove('iFe-label');
    if (e.target.value) parent.classList.add('iF-label');
    else parent.classList.add('iFe-label');
  }
  const lAB = (e: any) => {
    const parent = e.target.parentElement;
    parent.classList.remove('iF-label'); parent.classList.remove('iFe-label');
  }
  const lOC = (e: any) => {
    formik.handleChange(e);
    lAF(e);
  }

  const formik = useFormik({
    initialValues: {
      email: Cookies.get('user_email'),
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email is niet geldig').required('Email is required'),
      password: Yup.string().min(6, 'Password has to be atleast 6 characters').required('Password is required'),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      const login = new URLSearchParams();
      login.append('email', values.email);
      login.append('password', values.password);

      reqLogin(login)
    },
  });

  return (
    <div id='loginContainer'>
      <div id='loginFormWrapper'>
        <form id='loginForm' onSubmit={formik.handleSubmit}>
          <label htmlFor='email' className={formik.errors.email ? 'iFerr-label' : ''}>
            Email*
            <input
              className={formik.errors.email ? 'iFerr-input' : ''}
              type='text' onFocus={lAF} onChange={lOC} onBlur={lAB}
              placeholder='example@gmail.com' id='email'
              defaultValue={formik.initialValues.email}
            />
            {formik.errors.email && <span className='errorMessage'>{formik.errors.email}</span>}
          </label>
          <label htmlFor='password' className={formik.errors.password ? 'iFerr-label' : ''}>
            Password*
            <input
              className={formik.errors.password ? 'iFerr-input' : ''}
              type='password' onFocus={lAF} onChange={lOC} onBlur={lAB}
              placeholder='Type your password...' id='password'
              defaultValue={formik.initialValues.password}
            />
            {formik.errors.password && <span className='errorMessage'>{formik.errors.password}</span>}
          </label>
          <button type='submit' disabled={isLoading}>
            {isLoading ? <MdOutlineScheduleSend /> : <MdOutlineSend />}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
