import React, { useState } from "react";
import style from "./LogReg.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

const Register = () => {
  const [statusCode, setStatusCode] = useState();

  const { register, handleSubmit, formState } = useForm();
  const [regStatus, setRegStatus] = useState({
    success: false,
    message: "",
  });
  const navigate = useNavigate();

  const formSubmitHandler = (data) => {
    const postData = {
      email: data.email,
      password: data.password,
      name: data.name,
    };
    axios
      .post(`${process.env.REACT_APP_URL_API}/v1/auth/register`, postData)
      .then((res) => {
        setStatusCode(res.status);
        if (statusCode === 20) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setStatusCode(err.response.status);
        if (err.response.status === 422) {
          let pesanError = "";
          for (let key in err.response.data.errors) {
            pesanError += "<p>";
            pesanError += err.response.data.errors[key].msg;
            pesanError += "</p>";
          }

          setRegStatus({
            success: false,
            message: pesanError,
          });
        } else {
          setRegStatus({
            success: false,
            message: err.response.data,
          });
        }
      });
  };

  return (
    <div className="row justify-content-center align-items-center h-100 logregRes">
      <div className="col-10 col-sm-8 col-lg-6">
        <h1 className="mb-3">Daftar</h1>
        {!regStatus.success && regStatus.message && (
          <div className="text-danger">{parse(regStatus.message)}</div>
        )}
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="mb-3">
            <label for="inputName" className="form-label">
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama Lengkap"
              aria-label="First name"
              {...register("name", { required: true })}
              autoComplete="true"
              required
            />
          </div>
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
              required
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
              placeholder="Masukkan password 8-21 karakter"
              {...register("password", { required: true })}
              autoComplete="true"
              required
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
              Sudah punya akun?{" "}
              <Link to="/login" className="text-decoration-none">
                Masuk di sini
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
