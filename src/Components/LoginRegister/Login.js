import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import userSlice from '../../store/user'

import style from './LogReg.module.css'

const Login = () => {

  const { register, handleSubmit, formState } = useForm()

  const [loginStatus, setLoginStatus] = useState({
      success: false,
      message: '',
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (data) => {
    const postData = {
      email: data.email,
      password: data.password
    }

    axios.post('https://fafifu-backend-api.herokuapp.com/v1/auth/login', postData )
    .then( res => {
      if ( typeof res.data.data.token != 'undefined' ) {
        localStorage.setItem('finalprojectToken', res.data.data.token)
        console.log(res)
        dispatch( userSlice.actions.addUser({ userData: res.data.data.user}) )
        navigate('/')
      }
    })
    .catch ( err =>
      setLoginStatus({
        success: false,
        message: 'Sorry something is wrong, please try again.'
      })
    )
  }

  return (
    <div className={`row justify-content-center align-items-center h-100 ${style.logregRes}`}>
        <div className='col-10 col-sm-8 col-lg-6'>
            <h1 className='mb-3'>Masuk</h1>
            { (!loginStatus.success && loginStatus.message) && <p className='text-sm text-red-500 italic'>{loginStatus.message}</p>} 
            <form onSubmit={ handleSubmit(formSubmitHandler) }>
                <div class="mb-3">
                    <label for="InputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="InputEmail" placeholder='Contoh: johndee@gmail.com' {...register('email', {required: true})} autoComplete="true"/>
                </div>
                <div class="mb-3">
                  <label for="InputPassword" class="form-label">Password</label>
                  <input type="password" class="form-control" id="InputPassword" placeholder='Masukkan password' {...register('password',  {required: true})} autoComplete="true"/>
                </div>
                <button type="submit" class={`${style.buttonsimpan} w-100 text-white mb-5`}>Submit</button>
                <div className='wrapper-signup text-center'>
                  <span>Belum punya akun? <a href='#' className='text-decoration-none'>Daftar di sini</a></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login