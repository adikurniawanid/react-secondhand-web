import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import userSlice from "../../store/user";
import style from "./AddProduct.module.css";

const FormAddProduct = () => {
  const [name, setName] = useState();
  const [file, setImage] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [saveImage, setSaveImage] = useState(null);

  // NAVIGATE
  const navigate = useNavigate();
  //state validation
  const [validation, setValidation] = useState();

  const handleUploadChange = (e) => {
    setImage(e.target.files);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("name: ", name);
    formData.append("name", name);
    formData.append("categoryId", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("isPublished", true);

    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      await axios
        .post(`${process.env.REACT_APP_URL_API}/v1/product/`, formData, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
            "content-type": "multipart/form-data",
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
    <>
      <form
        onSubmit={saveProduct}
        className={`mb-8`}
        encType="multipart/form-data"
      >
        <div className="col-sm-12 mb-3 col-md-12">
          <label className="form-label">Nama Produk</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-sm-12 mb-3 col-md-12">
          <label className="form-label">Harga Produk</label>
          <input
            type="number"
            className="form-control"
            placeholder="Product Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
          />
        </div>
        <div className="col-sm-12 mb-3 col-md-12">
          <label hclassName="form-label">Kategori</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option defaultValue hidden>
              Select Category
            </option>
            <option value="1">Hobi</option>
            <option value="2">Kendaraan</option>
            <option value="3">Baju</option>
            <option value="4">Elektronik</option>
            <option value="5">Kesehatan</option>
          </select>
        </div>
        <div className="col-sm-12 mb-3 col-md-12">
          <label className="form-label">Deskripsi</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-sm-12 mb-3 col-md-12">
          <img src={file} alt="" className="img-thumbnail rounded-15" />
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Gambar
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              multiple
              onChange={handleUploadChange}
            />
          </div>
        </div>
        <div className="button__wrap d-flex justify-content-center">
          <button
            type="submit"
            className={`${style.buttonTerbitkan} col-6 mt-3`}
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </>
  );
};

export default FormAddProduct;
