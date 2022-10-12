import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userSlice from "../../store/user";

import style from "./LogReg.module.css";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();

  const [loginStatus, setLoginStatus] = useState({
    success: false,
    message: "",
  });

  const [statusCode, setStatusCode] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (data) => {
    const postData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("${process.env.REACT_APP_URL_API}/v1/auth/login", postData)
      .then((res) => {
        if (typeof res.data.data.token != "undefined") {
          localStorage.setItem("jwtToken", res.data.data.token);
          localStorage.setItem("sessionId", res.data.data.user.publicId);
          localStorage.setItem("sessionName", res.data.data.user.name);
          localStorage.setItem("sessionCity", res.data.data.user.city);
          localStorage.setItem("sessionImage", res.data.data.user.imageUrl);
          localStorage.setItem("sessionAddress", res.data.data.user.address);
          localStorage.setItem("sessionPhone", res.data.data.user.handphone);
          dispatch(userSlice.actions.addUser({ userData: res.data.data.user }));
          setStatusCode(res.status);
        }
      })
      .catch((err) => {
        setStatusCode(err.response.status);
        if (err.response.status === 401) {
          setLoginStatus({
            success: false,
            message: err.response.data.message,
          });
        } else if (err.response.status === 422) {
          let pesanError = "";

          for (let key in err.response.data.errors) {
            pesanError += err.response.data.errors[key].msg + "\n";
          }
          setLoginStatus({
            success: false,
            message: pesanError,
          });
        } else {
          setLoginStatus({
            success: false,
            message: err.response.data,
          });
        }
      });
  };

  return (
    <div
      className={`row justify-content-center align-items-center h-100 ${style.logregRes}`}
    >
      <div className="col-10 col-sm-8 col-lg-6">
        <h1 className="mb-3">Masuk</h1>
        {!loginStatus.success && loginStatus.message && (
          <p className="text-danger">{loginStatus.message}</p>
        )}
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div class="mb-3">
            <label for="InputEmail" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="InputEmail"
              placeholder="Contoh: johndee@gmail.com"
              {...register("email", { required: true })}
              autoComplete="true"
            />
          </div>
          <div class="mb-3">
            <label for="InputPassword" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="InputPassword"
              placeholder="Masukkan password"
              {...register("password", { required: true })}
              autoComplete="true"
            />
          </div>
          <button
            type="submit"
            class={`${style.buttonsimpan} w-100 text-white mb-5`}
          >
            Submit
          </button>
          <div className="wrapper-signup text-center">
            <span>
              Belum punya akun?{" "}
              <Link to="/register" className="text-decoration-none">
                Daftar di sini
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
