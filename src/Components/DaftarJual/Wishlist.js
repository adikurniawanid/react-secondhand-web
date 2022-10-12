import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./WishlistCard";
import axios from "axios";
import style from "./DaftarJual.module.css";

const Wishlist = () => {
  const [productsWishlist, setProductsWishlist] = useState([]);
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/product/wishlist`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setStatusCode(res.status);
        setProductsWishlist(res.data.data);
      })
      .catch((err) => {
        setStatusCode(err.response.status);
        setProductsWishlist(err.response.data.message);
      });
  }, []);

  if (statusCode === 404) {
    return (
      <>
        <div className="container d-flex justify-content-center">
          <div className="row d-flex flex-column ">
            <img src="/img/wishlist.png" className={`${style.wishlistImage}`} />
            <div className={`${style.wishlistText} text-center`}>
              Wishlist mu masih kosong nih D:
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
        {productsWishlist.map((productWishlist) => {
          return (
            <>
              <div className="d-flex">
                <div className={`box h-100 d-flex flex-row flex-wrap`}>
                  <Link
                    to={`/infopb/${productWishlist.publicId}`}
                    className={`text-decoration-none`}
                  >
                    <Card productWishlist={productWishlist} />
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

export default Wishlist;
