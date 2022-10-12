import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./TerjualCard";
import axios from "axios";
import style from "./DaftarJual.module.css";

const Terjual = () => {
  const [productsTerjual, setProductsTerjual] = useState([]);
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/product/user/sold`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setStatusCode(res.status);
        setProductsTerjual(res.data.data);
      })
      .catch((err) => {
        setStatusCode(err.response.status);
        setProductsTerjual(err.response.data.message);
      });
  }, []);

  if (statusCode === 404) {
    return (
      <>
        <div className="container d-flex justify-content-center">
          <div className="row d-flex flex-column ">
            <img src="/img/diminati.png" className={`${style.wishlistImage}`} />
            <div className={`${style.wishlistText} text-center`}>
              Barang mu terjual nih D:
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`col-lg-12 py-0 d-flex flex-wrap justify-content-between`}
      >
        {productsTerjual.map((productTerjual) => {
          return (
            <>
              <div className="d-flex justify-content-start">
                <div className={`box h-100 d-flex flex-row flex-wrap`}>
                  <Link
                    to={`/infopb/${productTerjual.productPublicId}`}
                    className={`text-decoration-none`}
                  >
                    <Card productTerjual={productTerjual} />
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Terjual;
