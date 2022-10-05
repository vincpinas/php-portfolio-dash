import React, { useEffect, useState } from 'react';
import { MdOutlineScheduleSend, MdOutlineSend } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegister } from '../../requests';
import './Register.scss';

interface RegProps {
  refetch: () => void;
}

function Register({ refetch }: RegProps) {
  const { mutate: reqReg, isLoading } = useRegister();

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
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      start_career: '',
      completed_projects: 0,
      satisfied_customers: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email('Email is niet geldig').required('Email is required'),
      password: Yup.string().min(6, 'Password has to be atleast 6 characters').required('Password is required'),
      phone: Yup.string().required(),
      address: Yup.string().required(),
      start_career: Yup.string().required(),
      completed_projects: Yup.number().required(),
      satisfied_customers: Yup.number().required(),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values: any) => {
      const register = new URLSearchParams();
      Object.keys(values).forEach(function (key) {
        register.append(key, values[key])
      });
      reqReg(register);
      setTimeout(() => {
        refetch();
      }, 200)
    },
  });

  return (
    <div id='registerContainer'>
      <h3>Please fill out some information about <br /> the owner of this portfolio</h3>
      <div id='registerFormWrapper'>
        <form id='registerForm' onSubmit={formik.handleSubmit}>
          <div className="inputRow">
            <label htmlFor='name' className={formik.errors.name ? 'iFerr-label' : ''}>
              Name*
              <input
                className={formik.errors.name ? 'iFerr-input' : ''}
                type='text' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='Type in your name...' id='name'
                defaultValue={formik.initialValues.name}
              />
              {formik.errors.name && <span className='errorMessage'>{formik.errors.name}</span>}
            </label>
          </div>
          <div className="inputRow">
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
          </div>
          <div className="inputRow">
            <label htmlFor='phone' className={formik.errors.phone ? 'iFerr-label' : ''}>
              phone*
              <input
                className={formik.errors.phone ? 'iFerr-input' : ''}
                type='phone' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='+31682794205' id='phone'
                defaultValue={formik.initialValues.phone}
              />
              {formik.errors.phone && <span className='errorMessage'>{formik.errors.phone}</span>}
            </label>
            <label htmlFor='address' className={formik.errors.address ? 'iFerr-label' : ''}>
              address*
              <input
                className={formik.errors.address ? 'iFerr-input' : ''}
                type='address' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='Randomstraat 11, 3910 VK Amsterdam' id='address'
                defaultValue={formik.initialValues.address}
              />
              {formik.errors.address && <span className='errorMessage'>{formik.errors.address}</span>}
            </label>
          </div>
          <div className="inputRow">
            <label htmlFor='start_career' className={formik.errors.start_career ? 'iFerr-label' : ''}>
              start_career*
              <input
                className={formik.errors.start_career ? 'iFerr-input' : ''}
                type='start_career' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='2019-08-21' id='start_career'
                defaultValue={formik.initialValues.start_career}
              />
              {formik.errors.start_career && <span className='errorMessage'>{formik.errors.start_career}</span>}
            </label>
            <label htmlFor='completed_projects' className={formik.errors.completed_projects ? 'iFerr-label' : ''}>
              completed_projects*
              <input
                className={formik.errors.completed_projects ? 'iFerr-input' : ''}
                type='completed_projects' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='Type your completed_projects...' id='completed_projects'
                defaultValue={formik.initialValues.completed_projects}
              />
              {formik.errors.completed_projects && <span className='errorMessage'>{formik.errors.completed_projects}</span>}
            </label>
            <label htmlFor='satisfied_customers' className={formik.errors.satisfied_customers ? 'iFerr-label' : ''}>
              satisfied_customers*
              <input
                className={formik.errors.satisfied_customers ? 'iFerr-input' : ''}
                type='satisfied_customers' onFocus={lAF} onChange={lOC} onBlur={lAB}
                placeholder='Type your satisfied_customers...' id='satisfied_customers'
                defaultValue={formik.initialValues.satisfied_customers}
              />
              {formik.errors.satisfied_customers && <span className='errorMessage'>{formik.errors.satisfied_customers}</span>}
            </label>
          </div>
          <button type='submit' disabled={isLoading}>
            {isLoading ? <MdOutlineScheduleSend /> : <MdOutlineSend />}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;
