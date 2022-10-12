import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";
import style from "./Penawaran.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

const Penawaran = (props) => {
  const [modalMatch, modalMatchShow] = useState(false);
  const [modalStatus, modalStatusShow] = useState(false);
  const [modalTawar, modalTawarShow] = useState(false);

  const param = useParams();
  const [offers, setOffers] = useState(null);
  const [status, setStatus] = useState();
  const [buttonStatus, setButtonStatus] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/offer/${param.id}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setOffers(res.data.data);
        setStatus(res.data.data.offer.status);
      });
  }, []);

  const { register, handleSubmit, formState } = useForm();

  const formTerimaHandler = () => {
    const postData = {
      statusOfferId: 1,
    };
    axios
      .put(`${process.env.REACT_APP_URL_API}/v1/offer/${param.id}`, postData, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => setStatus(1))
      .catch((err) => console.log(err));
  };

  const formTolakHandler = () => {
    const postData = {
      statusOfferId: 2,
    };
    axios
      .put(`${process.env.REACT_APP_URL_API}/v1/offer/${param.id}`, postData, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => setStatus(2))
      .catch((err) => console.log(err));
  };

  const formStatusHandler = () => {
    const postData = {
      statusOfferId: buttonStatus,
    };
    axios
      .put(`${process.env.REACT_APP_URL_API}/v1/offer/${param.id}`, postData, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => setStatus(buttonStatus))
      .catch((err) => console.log(err));
    modalStatusShow(false);
  };

  return (
    <>
      <Navbar />
      {offers !== null && (
        <div className="container">
          <div className={"container-fluid"}>
            <div className={"row mt-4 d-flex justify-content-center"}>
              <div className={"col-sm-6 col-md-12 col-lg-8 forminfo"}>
                <Link to="/notification" className={`text-decoration-none`}>
                  <IoMdArrowBack size={20} className={`${style.backlogo}`} />
                  Kembali
                </Link>
                <div className={`${style.produkText}`}>Data Pembeli</div>
                <div
                  className={`row d-flex flex-row shadow py-3 px-1 mb-3 rounded ${style.containerInfo}`}
                >
                  <div
                    className={
                      "col-auto px-2 d-flex justify-content-center align-items-center"
                    }
                  >
                    <img
                      className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                      src={offers.buyer.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className={"col-auto"}>
                    <div className={`${style.textNama}`}>
                      {offers.buyer.name}
                    </div>
                    <div className={`${style.textKota}`}>
                      {offers.buyer.city}
                    </div>
                  </div>
                </div>
                <div className={`${style.produkText}`}>
                  Daftar Produkmu Yang Ditawar
                </div>
                <div
                  className={`row d-flex flex-row shadow py-3 px-1 mt-3 rounded ${style.containerInfo}`}
                >
                  <div className={"d-flex flex-row"}>
                    <div className={"col-auto"}>
                      <img
                        className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                        src={
                          offers.product.imageUrl
                            ? offers.product.imageUrl
                            : "/img/imagena.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className={"col-10 mx-3"}>
                      <div className={"d-flex justify-content-between w-100"}>
                        <div className={`${style.textSecondary}`}>
                          Penawaran Produk
                        </div>
                        <div className={`${style.textSecondary} ml-auto`}>
                          {offers.offer.createdAt.substring(0, 10)}
                        </div>
                      </div>
                      <div>{offers.product.name}</div>

                      <div className={`mt-2 ${style.cardPrice}`}>
                        <div>Harga Penjualan</div>
                        <div className={`${style.cardPriceOriginal}`}>
                          <NumberFormat
                            value={offers.product.price}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"Rp "}
                          />
                        </div>
                      </div>
                      <div className={`mt-2 ${style.cardPrice}`}>
                        <div>Harga Penawaran</div>
                        <div className={`${style.cardPriceOffer}`}>
                          <NumberFormat
                            value={offers.offer.price}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"Rp "}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONDITIONAL BUTTON */}

                  {localStorage.getItem("jwtToken") && status == 0 && (
                    <div className={"d-flex flex-row justify-content-end pt-3"}>
                      <form onSubmit={handleSubmit(formTolakHandler)}>
                        <button
                          type="submit"
                          className={`col mx-2 btn ${style.buttonPenawaranTolak}`}
                        >
                          Tolak
                        </button>
                      </form>
                      <form onSubmit={handleSubmit(formTerimaHandler)}>
                        <button
                          type="submit"
                          className={`col btn ${style.buttonPenawaranTerima}`}
                        >
                          Terima
                        </button>
                      </form>
                    </div>
                  )}

                  {localStorage.getItem("jwtToken") && status == 1 && (
                    <div className={"d-flex flex-row justify-content-end pt-3"}>
                      <button
                        type="button"
                        className={`col-4 mx-2 btn ${style.buttonPenawaranTolak}`}
                        onClick={() => modalStatusShow(true)}
                      >
                        Status
                      </button>
                      <button
                        type="button"
                        className={`col-4 btn ${style.buttonPenawaranTerima}`}
                        onClick={() => modalMatchShow(true)}
                      >
                        Hubungi
                      </button>
                    </div>
                  )}

                  {localStorage.getItem("jwtToken") && status == 2 && (
                    <div className={"d-flex flex-row justify-content-end pt-3"}>
                      <form onSubmit={handleSubmit(formTolakHandler)}>
                        <button
                          type="submit"
                          className={`col mx-2 btn ${style.buttonTertolak}`}
                          disabled
                        >
                          Penawaran Sudah Ditolak
                        </button>
                      </form>
                    </div>
                  )}

                  {localStorage.getItem("jwtToken") && status == 3 && (
                    <div className={"d-flex flex-row justify-content-end pt-3"}>
                      <form onSubmit={handleSubmit(formTolakHandler)}>
                        <button
                          type="submit"
                          className={`col mx-2 btn ${style.buttonSudahTerjual}`}
                          disabled
                        >
                          Barang Sudah Terjual
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Modal Hubungi via WhattsApp */}
                  <Modal
                    show={modalMatch}
                    onHide={() => modalMatchShow(false)}
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
                        <p className={`px-2 mb-2 ${style.modalTitle}`}>
                          Yeay kamu berhasil mendapat harga yang sesuai
                        </p>
                        <p className={`px-2 mb-2 ${style.modalDescription}`}>
                          Segera hubungi pembeli melalui whatsapp untuk
                          transaksi selanjutnya
                        </p>
                        <div
                          className={`row ${style.dataContainer} d-flex flex-row pt-3 px-2 mx-0 mb-3 rounded justify-content-center align-items-center w-80`}
                        >
                          <div className={`text-center ${style.modalTitle}`}>
                            Product Match
                          </div>
                          <div className={"d-flex flex-row py-2 px-1"}>
                            <div className={"col-auto p-0 me-2"}>
                              <img
                                className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                                src={offers.buyer.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className={`${style.text}`}>
                              <div>{offers.buyer.name}</div>
                              <div>{offers.buyer.city}</div>
                            </div>
                          </div>
                          <div
                            className={`d-flex flex-row py-2 px-1 ${style.dataContainer} overflow-auto `}
                          >
                            <div className={"col-auto p-0 me-2"}>
                              <img
                                className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                                src={
                                  offers.product.imageUrl
                                    ? offers.product.imageUrl
                                    : "/img/imagena.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className={`col-auto ${style.text}`}>
                              <div className={``}>{offers.product.name}</div>
                              <div>Rp. {offers.product.price}</div>
                              <div>Ditawar Rp. {offers.offer.price}</div>
                            </div>
                          </div>
                        </div>
                        <a
                          href={`https://wa.me/${offers.buyer.handphone}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button
                            type="button"
                            className={`col-12 btn ${style.buttonMatchTerima}`}
                          >
                            Hubungi via WhattsApp{" "}
                            <BsWhatsapp className={"mb-1 mx-1"} />
                          </button>
                        </a>
                      </div>
                    </Modal.Body>
                  </Modal>

                  {/* Modal Cek Status */}
                  <Modal
                    show={modalStatus}
                    onHide={() => modalStatusShow(false)}
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton />
                    <Modal.Body>
                      <div
                        className={`d-flex flex-column justify-content-center align-items-center my-2`}
                      >
                        <form
                          onSubmit={handleSubmit(formStatusHandler)}
                          className={
                            "d-flex flex-column justify-content-center align-items-center my-2"
                          }
                        >
                          <p className={`px-2 mb-4 ${style.modalStatusTitle}`}>
                            Perbarui status penjualan produkmu
                          </p>
                          <div className={"d-flex flex-row px-2"}>
                            <div className={"form-check"}>
                              <input
                                className={"form-check-input"}
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value={3}
                                onChange={(e) =>
                                  setButtonStatus(e.target.value)
                                }
                              />
                              <label
                                className={"form-check-label px-2"}
                                for="flexRadioDefault1"
                              />
                            </div>
                            <div className="">
                              <div className="">Berhasil Terjual</div>
                              <div className={"pt-2 mb-4"}>
                                Kamu telah sepakat menjual produk ini kepada
                                pembeli
                              </div>
                            </div>
                          </div>
                          <div className={"d-flex flex-row px-2"}>
                            <div className={"form-check"}>
                              <input
                                className={"form-check-input"}
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value={2}
                                onChange={(e) =>
                                  setButtonStatus(e.target.value)
                                }
                              />
                              <label
                                className={"form-check-label px-2"}
                                for="flexRadioDefault1"
                              />
                            </div>
                            <div className="">
                              <div className="">Batalkan transaksi</div>
                              <div className={"pt-2 mb-4"}>
                                Kamu membatalkan transaksi produk ini dengan
                                pembeli
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className={`col-4 btn ${style.buttonKirim} w-100`}
                          >
                            Kirim
                          </button>
                        </form>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Penawaran;
