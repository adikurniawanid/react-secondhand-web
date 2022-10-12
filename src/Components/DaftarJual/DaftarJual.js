import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import { BsBox } from "react-icons/bs";
import axios from "axios";
import { FiDollarSign } from "react-icons/fi";
import style from "./DaftarJual.module.css";
import Navbar from "../Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";

const DaftarJual = () => {
  const [isActive, setIsActive] = useState(false);

  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [image, setImage] = useState();

  const handleStyle = () => {
    setIsActive((current) => !current);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/user`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setName(res.data.data.name);
        setCity(res.data.data.city);
        setImage(res.data.data.imageUrl);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className={"container"}>
        <div className={"row mt-2 d-flex justify-content-center"}>
          <div className={"col-10 col-sm-12 col-md-12 col-lg-9 forminfo"}>
            <h4 className={`${style.daftarJualSaya} my-3 font-weight-bold`}>
              Daftar Jual Saya
            </h4>
            <div
              className={
                "row d-flex flex-column flex-sm-row shadow rounded p-3"
              }
            >
              <img
                className={`col-auto p-0 m-0 d-flex justify-content-center align-items-center h-auto me-3 shadow ${style.profilePhoto}`}
                src={image ? image : "/img/imagena.png"}
                alt="Penjual"
              />
              <div
                className={
                  "col d-flex flex-row justify-content-between align-items-center p-0 m-0"
                }
              >
                <div className={"col-auto"}>
                  <div>{name}</div>
                  <div className={`${style.kota}`}>{city}</div>
                </div>
                <div className={"col-auto d-flex flex-column flex-md-row"}>
                  <Link to="/add" className="text-decoration-none">
                    <button
                      type="button"
                      className={`btn ${style.addProductButton} d-flex justify-content-center align-items-center`}
                    >
                      Tambah Produk
                    </button>
                  </Link>
                  <Link to="/info" className="text-decoration-none">
                    <button
                      type="button"
                      className={`btn ${style.editButton} d-flex justify-content-center align-items-center`}
                    >
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* <Hubungi/> */}
            <div
              className={`row py-3 mb-3 d-flex justify-content-center ${style.containerProfile}`}
            >
              <div
                className={`col-xl-3 col-lg-4 col-11 col-sm-8 px-4 shadow rounded h-50 ${style.cardContainer}`}
              >
                <div className={`row my-3 ${style.titleCategory}`}>
                  Kategori
                </div>
                <Link
                  to="/profile/semua"
                  className={`${style.categoryContainer}`}
                >
                  <div className={`row py-0  d-flex align-items-center`}>
                    <div
                      className={`col-auto p-0 m-0 d-flex align-items-center ms-3 ${style.iconCategory}`}
                    >
                      <BsBox className={`w-100 h-auto`} />
                    </div>
                    <div className={`col ${style.textCategory} py-2 `}>
                      Semua Produk
                    </div>
                    <div
                      className={`col-auto p-0 m-0 ${style.svg} d-flex align-items-center`}
                    >
                      <RiArrowRightSLine
                        className={`w-100 h-auto ${style.arrow} me-2`}
                      />
                    </div>
                  </div>
                </Link>
                <hr />
                <Link
                  to="/profile/diminati"
                  className={`${style.categoryContainer}`}
                >
                  <div className={`row py-0 d-flex align-items-center`}>
                    <div
                      className={`col-auto p-0 m-0 d-flex align-items-center ms-3 ${style.iconCategory}`}
                    >
                      <AiOutlineHeart className={`w-100 h-auto`} />
                    </div>
                    <div className={`col ${style.textCategory} py-2`}>
                      Diminati
                    </div>
                    <div
                      className={`col-auto p-0 m-0 ${style.svg} d-flex align-items-center`}
                    >
                      <RiArrowRightSLine
                        className={`w-100 h-auto ${style.arrow} me-2`}
                      />
                    </div>
                  </div>
                </Link>
                <hr />
                <Link
                  to="/profile/terjual"
                  className={`${style.categoryContainer}`}
                >
                  <div
                    className={`row py-0 mb-4 ${style.categoryContainer} d-flex align-items-center`}
                  >
                    <div
                      className={`col-auto p-0 m-0 d-flex align-items-center ms-3 ${style.iconCategory}`}
                    >
                      <FiDollarSign className={`w-100 h-auto ${style.arrow}`} />
                    </div>
                    <div className={`col ${style.textCategory} py-2`}>
                      Terjual
                    </div>
                    <div
                      className={`col-auto p-0 m-0 ${style.svg} d-flex align-items-center`}
                    >
                      <RiArrowRightSLine
                        className={`w-100 h-auto ${style.arrow} me-2`}
                      />
                    </div>
                  </div>
                </Link>
                <hr />
                <Link
                  to="/profile/wishlist"
                  className={`${style.categoryContainer} `}
                >
                  <div
                    className={`row py-0 mb-4 ${style.categoryContainer} d-flex align-items-center`}
                  >
                    <div
                      className={`col-auto p-0 m-0 d-flex align-items-center ms-3 ${style.iconCategory}`}
                    >
                      <AiOutlineStar
                        className={`w-100 h-auto ${style.arrow}`}
                      />
                    </div>
                    <div className={`col ${style.textCategory} py-2`}>
                      Wishlist
                    </div>
                    <div
                      className={`col-auto p-0 m-0 ${style.svg} d-flex align-items-center`}
                    >
                      <RiArrowRightSLine
                        className={`w-100 h-auto ${style.arrow} me-2`}
                      />
                    </div>
                  </div>
                </Link>
              </div>
              <div
                className={`col-xl-9 col-lg-8 py-0 d-flex flex-wrap justify-content-center justify-content-xl-start ${style.productContainer}`}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaftarJual;
