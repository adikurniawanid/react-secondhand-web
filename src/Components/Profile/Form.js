import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import style from "./InfoProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const Form = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [handphone, setHandphone] = useState();
  const [image, setImage] = useState();
  const [validation, setValidation] = useState();

  const handleUploadChange = (e) => {
    setImage(e.target.files);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/user`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setName(res.data.data.name);
        setAddress(res.data.data.address);
        setCity(res.data.data.city);
        setHandphone(res.data.data.handphone);
        setImage(res.data.data.imageUrl);
      });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();

    const postData = {
      name: name,
      address: address,
      city: city,
      handphone: handphone,
      image:
        "https://res.cloudinary.com/adikurniawan/image/upload/v1658674915/WhatsApp_Image_2022-07-24_at_21.59.45_dqjdho.jpg",
    };

    try {
      await axios
        .put("${process.env.REACT_APP_URL_API}/v1/user/update", postData, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then(() => {
          navigate("/profile/semua");
        });
    } catch (error) {
      setValidation(error.response.data.errors);
      console.log(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={saveProfile} className={`mb-8`}>
      <section className="container d-block">
        <div
          className={`d-flex justify-content-center rounded ${style.xGatau}`}
        >
          {image == null && (
            <img
              src="/img/imagena.png"
              alt=""
              className={`${style.imgPhoto}`}
            />
          )}
          {image != null && (
            <img src={image} alt="" className={`${style.imgPhoto}`} />
          )}
        </div>
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={handleUploadChange}
        />
      </section>
      <div className="col-sm-12 mb-3 col-md-12 mt-4">
        <label htmlFor="inputName" className="form-label">
          Nama
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="First name"
          // required
        />
      </div>
      <div className="col-sm-12 mb-3 col-md-12">
        <label htmlFor="inputState" className="form-label">
          Kota
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="kota"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="Kota"
          // required
        />
      </div>
      <div className="mb-3 col-sm-12 col-md-12">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Alamat
        </label>
        <textarea
          // required
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-12 mb-3">
        <label htmlFor="inputName" className="form-label">
          No Handphone
        </label>
        <input
          type="text" // PR VALIDASI NOMOR TELEPON - GA BOLEH HURUF
          className="form-control"
          aria-label="First name"
          // required
          placeholder="Contoh: 08123456789"
          value={handphone}
          onChange={(e) => setHandphone(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className={`${style.buttonsimpan} col-sm-12 col-12 mt-2`}
      >
        Simpan
      </button>
    </form>
  );
};

export default Form;
