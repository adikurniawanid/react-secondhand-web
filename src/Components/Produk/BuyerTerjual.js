import React, { useState, useEffect } from "react";
import style from "./product.module.css";
import styleTawar from "./modalTawar.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import NumberFormat from "react-number-format";

const BuyerTerjual = (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const [modalTawar, modalTawarShow] = useState(false);

  const [isWishlist, setIsWishlist] = useState(props.products.status.wishlist);
  let [isTawar, setIsTawar] = useState(props.products.status.offer);

  const [wishlistStatus, setWishlistStatus] = useState({
    success: false,
    message: "",
  });

  const formDeleteHandler = () => {
    setIsWishlist(!isWishlist);
    axios
      .delete(
        `${process.env.REACT_APP_URL_API}/v1/product/${param.id}/wishlist`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) =>
        setWishlistStatus({
          success: false,
          message: "Sorry something is wrong, please try again.",
        })
      );
  };

  const formSubmitHandler = () => {
    setIsWishlist(!isWishlist);
    axios
      .post(
        `${process.env.REACT_APP_URL_API}/v1/product/${param.id}/wishlist`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) =>
        setWishlistStatus({
          success: false,
          message: "Sorry something is wrong, please try again.",
        })
      );
  };

  return (
    <div className={`card w-100 ${style.cardProductBuyer} mb-4`}>
      <div className="card-body mx-2">
        <div className={`d-flex flex-row justify-content-between`}>
          <h5 className={`${style.namaBarang}`}>{props.products.name}</h5>
          <div>
            {localStorage.getItem("jwtToken") && (
              <AiFillStar
                onClick={isWishlist ? formDeleteHandler : formSubmitHandler}
                className={
                  isWishlist ? `${style.wishlistOn}` : `${style.wishlistOff}`
                }
              />
            )}
          </div>
        </div>
        <p className={`${style.jenisBarang}`}>
          {props.products.category.map((productCategory) => {
            return <div>{productCategory.name}</div>;
          })}
        </p>
        <h5 className={`${style.hargaBarang}`}>
          <NumberFormat
            value={props.products.price}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp "}
          />
        </h5>

        {/* CONDITIONAL */}

        <button
          type="submit"
          disabled
          onClick={() => modalTawarShow(true)}
          className={`${style.buttonterbeli} w-100 text-white mb-3 mt-3`}
        >
          Barang telah dibeli
        </button>
      </div>
    </div>
  );
};

export default BuyerTerjual;
