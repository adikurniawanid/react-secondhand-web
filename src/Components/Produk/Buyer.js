import React, { useState } from "react";
import style from "./product.module.css";
import styleTawar from "./modalTawar.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import NumberFormat from "react-number-format";

const Buyer = (props) => {
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

  // Tawar

  const { register, handleSubmit, formState } = useForm();

  const formTawarHandler = (data) => {
    const postData = {
      price: data.price,
    };
    axios
      .post(
        `${process.env.REACT_APP_URL_API}/v1/product/${param.id}/offer`,
        postData,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => console.log(res), setIsTawar(true))
      .catch((err) => console.log(err));
    modalTawarShow(false);
  };

  return (
    <div className={`card w-100 ${style.cardProductBuyer} mb-4`}>
      <div className="card-body mx-2">
        <div className={`d-flex flex-row justify-content-between`}>
          <h5 className={`${style.namaBarang}`}>{props.products.name}</h5>
          <div>
            {localStorage.getItem("jwtToken") &&
              props.products.status.sold === true && <></>}
            {localStorage.getItem("jwtToken") &&
              props.products.status.sold === false && (
                <AiFillStar
                  onClick={isWishlist ? formDeleteHandler : formSubmitHandler}
                  className={
                    isWishlist ? `${style.wishlistOn}` : `${style.wishlistOff}`
                  }
                />
              )}
          </div>
        </div>
        <p className={`${style.jenisBarang} d-flex flex-row flex-wrap`}>
          {props.products.category.map((productCategory) => {
            return (
              <div className={` ${style.commaText}`}>
                {productCategory.name}
              </div>
            );
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
        {localStorage.getItem("jwtToken") &&
          props.products.status.sold === true && (
            <button
              type="submit"
              disabled
              onClick={() => modalTawarShow(true)}
              className={`${style.buttonterbeli} w-100 text-white mb-3 mt-3`}
            >
              Barang telah terjual
            </button>
          )}
        {localStorage.getItem("jwtToken") &&
          isTawar === true &&
          props.products.status.sold === false && (
            <button
              type="submit"
              disabled
              onClick={() => modalTawarShow(true)}
              className={`${style.buttontunggu} w-100 text-white mb-3 mt-3`}
            >
              Tunggu respon penjual
            </button>
          )}
        {localStorage.getItem("jwtToken") &&
          isTawar === false &&
          props.products.status.sold === false && (
            <button
              type="submit"
              onClick={() => modalTawarShow(true)}
              className={`${style.buttonsimpan} w-100 text-white mb-3 mt-3`}
            >
              Saya tertarik dan ingin nego
            </button>
          )}
        {!localStorage.getItem("jwtToken") && (
          <button
            type="submit"
            onClick={() => navigate("/login")}
            className={`${style.buttonsimpan} w-100 text-white mb-3 mt-3`}
          >
            Silakan Login terlebih dahulu
          </button>
        )}

        <Modal
          show={modalTawar}
          onHide={() => modalTawarShow(false)}
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <div
              className={
                "d-flex flex-column justify-content-center align-items-center my-2"
              }
            >
              <div className={"d-flex flex-column my-2"}>
                <p className={"px-2 mb-2 font-weight-bold"}>
                  Masukkan Harga Tawarmu
                </p>
                <p className={"px-2 mb-2"}>
                  Harga tawaranmu akan diketahui penjual, jika penjual cocok
                  kamu akan segera dihubungi penjual.
                </p>
                <div
                  className={
                    "row data-container d-flex flex-row py-2 px-1 mx-0 mb-3 rounded justify-content-center align-items-center w-100 p-3"
                  }
                >
                  <div className={"text-center"} />
                  <div
                    className={`d-flex flex-row py-2 px-1 overflow-auto ${styleTawar.photoDetailContainer}`}
                  >
                    <div className={"col-auto px-2"}>
                      <img
                        className={"col-auto p-0 m-0 h-auto w-100"}
                        src="/img/Produk.svg"
                        alt=""
                      />
                    </div>
                    <div className={`col-auto ${styleTawar.photoDetailText}`}>
                      <div>{props.products.name}</div>
                      <div>Rp. {props.products.price}</div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit(formTawarHandler)}>
                  <div class={"form-group"}>
                    <label className={`mb-2 ${styleTawar.hargaTawarText}`}>
                      Harga Tawar
                    </label>
                    <input
                      type="text"
                      {...register("price", { required: true })}
                      className={"form-control mb-4"}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter price"
                    />
                    {/* jangan lupa ganti number */}
                  </div>
                  <button
                    type="submit"
                    className={`col-4 btn ${styleTawar.buttonKirim} w-100`}
                  >
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Buyer;
