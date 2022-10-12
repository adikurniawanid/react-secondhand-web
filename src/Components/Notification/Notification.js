import React, { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { GoPrimitiveDot } from "react-icons/go";
import style from "./Notification.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import NumberFormat from "react-number-format";
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";

const Notification = () => {
  const [offerList, setOfferList] = useState([]);
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/notification/all`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setStatusCode(res.status);
        setOfferList(res.data.data);
      })
      .catch((err) => {
        //
      });
  }, []);

  const ref = useRef(null);

  const filterNotification = (event) => {
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(
          `${process.env.REACT_APP_URL_API}/v1/notification/all?status=${event.currentTarget.id}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((res) => {
          setStatusCode(res.status);
          setOfferList(res.data.data);
        })
        .catch((err) => {
          setStatusCode(err.response.status);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_URL_API}/v1/notification/all?status=${event.currentTarget.id}`
        )
        .then((res) => {
          setOfferList(res.data.data);
        })
        .catch((err) => {
          setStatusCode(err.response.status);
        });
    }
  };

  return (
    <div className={"container-fluid"}>
      <div className={"row mt-4 d-flex justify-content-center"}>
        <div className={"col-12 col-md-12 col-lg-8 forminfo"}>
          <Link to="/" className={`text-decoration-none text-dark`}>
            <IoMdArrowBack size={20} className={`${style.backlogo}`} />
            Kembali
          </Link>

          {/* Button Kategori Notifikasi */}
          <div className={`d-flex flex-row my-3 overflow-auto`}>
            <button
              type="button"
              ref={ref}
              onClick={filterNotification}
              className={`${style.btn}`}
            >
              <FiSearch className={"fi m-1"} />
              Semua
            </button>
            <button
              type="button"
              ref={ref}
              id="1"
              onClick={filterNotification}
              className={`${style.btn}`}
            >
              <FiSearch className={"fi m-1"} />
              Incoming Offer
            </button>
            <button
              type="button"
              ref={ref}
              id="2"
              onClick={filterNotification}
              className={`${style.btn}`}
            >
              <FiSearch className={"fi m-1"} />
              Accepted Offer
            </button>
            <button
              type="button"
              ref={ref}
              id="3"
              onClick={filterNotification}
              className={`${style.btn}`}
            >
              <FiSearch className={"fi m-1"} />
              Published Product
            </button>
            <button
              type="button"
              ref={ref}
              id="4"
              onClick={filterNotification}
              className={`${style.btn}`}
            >
              <FiSearch className={"fi m-1"} />
              Published Offer
            </button>
          </div>

          {/* Div Notifikasi */}

          {statusCode != 200 && (
            <>
              <div className="container d-flex justify-content-center">
                <div className="row d-flex flex-column ">
                  <img
                    src="/img/product.png"
                    className={`${style.notifikasiImage}`}
                  />
                  <div className={`${style.blankMessage} text-center`}>
                    Tidak ada notifikasi tersebut
                  </div>
                </div>
              </div>
            </>
          )}
          {statusCode == 200 && (
            <>
              {offerList.map((offerLists) => {
                return (
                  <>
                    {offerLists.statusNotification === "Incoming Offer" && (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/penawaran/${offerLists.offer.publicId}`}
                        className={`text-dark text-decoration-none`}
                        onClick={() => {
                          axios.post(
                            `${process.env.REACT_APP_URL_API}/v1/notification/${offerLists.publicId}/read`,
                            {},
                            {
                              headers: {
                                Authorization: localStorage.getItem("jwtToken"),
                              },
                            }
                          );
                        }}
                      >
                        <div
                          className={`row d-flex flex-row shadow py-3 px-1 mt-3 rounded ${style.notificationContainer}`}
                        >
                          <div className={"d-flex flex-row"}>
                            <div className={"col-auto"}>
                              <img
                                className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                                src={
                                  offerLists.product.imageUrl
                                    ? offerLists.product.imageUrl
                                    : "/img/imagena.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className={"col-10 mx-3"}>
                              <div
                                className={
                                  "d-flex justify-content-between w-100"
                                }
                              >
                                <div className={`${style.textSecondary}`}>
                                  {offerLists.statusNotification}
                                </div>
                                <div
                                  className={`${style.textSecondary} ml-auto d-flex`}
                                >
                                  <div
                                    className={`${style.textSecondary} mx-2`}
                                  >
                                    {offerLists.createdAt.substring(0, 10)}
                                  </div>
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === false && (
                                      <div className={`${style.iconUnread}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === true && (
                                      <div className={`${style.iconRead}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div>{offerLists.product.name}</div>
                              <div className={`d-flex flex-row`}>
                                <div
                                  className={`d-flex flex-row ${style.textDitawar}`}
                                >
                                  Ditawar
                                </div>
                                <div>
                                  <NumberFormat
                                    className={`d-flex flex-row ${style.hargaDitawar}`}
                                    value={offerLists.offer.price}
                                    displayType={"text"}
                                    thousandSeparator={"."}
                                    decimalSeparator={","}
                                    prefix={"Rp "}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    {offerLists.statusNotification === "Accepted Offer" && (
                      <Link
                        className={`text-dark text-decoration-none`}
                        style={{ textDecoration: "none" }}
                        to={`/infopb/${offerLists.product.publicId}`}
                        onClick={() => {
                          axios.post(
                            `${process.env.REACT_APP_URL_API}/v1/notification/${offerLists.publicId}/read`,
                            {},
                            {
                              headers: {
                                Authorization: localStorage.getItem("jwtToken"),
                              },
                            }
                          );
                        }}
                      >
                        <div
                          className={
                            "row d-flex flex-row shadow py-3 px-1 mt-3 rounded"
                          }
                        >
                          <div className={"d-flex flex-row"}>
                            <div className={"col-auto"}>
                              <img
                                className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                                src={
                                  offerLists.product.imageUrl
                                    ? offerLists.product.imageUrl
                                    : "/img/imagena.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className={"col-10 mx-3"}>
                              <div
                                className={
                                  "d-flex justify-content-between w-100"
                                }
                              >
                                <div className={`${style.textSecondary}`}>
                                  {offerLists.statusNotification}
                                </div>
                                <div
                                  className={`${style.textSecondary} ml-auto d-flex`}
                                >
                                  <div
                                    className={`${style.textSecondary} mx-2`}
                                  >
                                    {offerLists.createdAt.substring(0, 10)}
                                  </div>
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === false && (
                                      <div className={`${style.iconUnread}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === true && (
                                      <div className={`${style.iconRead}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div>{offerLists.product.name}</div>
                              <div>
                                <NumberFormat
                                  value={offerLists.product.price}
                                  displayType={"text"}
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  prefix={"Rp "}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    {offerLists.statusNotification === "Published Product" && (
                      <Link
                        className={`text-dark text-decoration-none`}
                        style={{ textDecoration: "none" }}
                        to={`/infop/${offerLists.product.publicId}`}
                        onClick={() => {
                          axios.post(
                            `${process.env.REACT_APP_URL_API}/v1/notification/${offerLists.publicId}/read`,
                            {},
                            {
                              headers: {
                                Authorization: localStorage.getItem("jwtToken"),
                              },
                            }
                          );
                        }}
                      >
                        <div
                          className={
                            "row d-flex flex-row shadow py-3 px-1 mt-3 rounded"
                          }
                        >
                          <div className={"d-flex flex-row"}>
                            <div className={"col-auto"}>
                              <img
                                className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                                src={
                                  offerLists.product.imageUrl
                                    ? offerLists.product.imageUrl
                                    : "/img/imagena.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className={"col-10 mx-3"}>
                              <div
                                className={
                                  "d-flex justify-content-between w-100"
                                }
                              >
                                <div className={`${style.textSecondary}`}>
                                  {offerLists.statusNotification}
                                </div>
                                <div
                                  className={`${style.textSecondary} ml-auto d-flex`}
                                >
                                  <div
                                    className={`${style.textSecondary} mx-2`}
                                  >
                                    {offerLists.createdAt.substring(0, 10)}
                                  </div>
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === false && (
                                      <div className={`${style.iconUnread}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === true && (
                                      <div className={`${style.iconRead}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div>{offerLists.product.name}</div>
                              <div>
                                <NumberFormat
                                  value={offerLists.product.price}
                                  displayType={"text"}
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  prefix={"Rp "}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    {offerLists.statusNotification === "Published Offer" && (
                      <Link
                        className={`text-dark text-decoration-none`}
                        style={{ textDecoration: "none" }}
                        to={`/infopb/${offerLists.product.publicId}`}
                        onClick={() => {
                          axios.post(
                            `${process.env.REACT_APP_URL_API}/v1/notification/${offerLists.publicId}/read`,
                            {},
                            {
                              headers: {
                                Authorization: localStorage.getItem("jwtToken"),
                              },
                            }
                          );
                        }}
                      >
                        <div
                          className={
                            "row d-flex flex-row shadow py-3 px-1 mt-3 rounded"
                          }
                        >
                          <div className={"d-flex flex-row"}>
                            <div className={"col-auto"}>
                              <img
                                className={`col-auto p-0 m-0 h-auto ${style.profilePhoto}`}
                                src={
                                  offerLists.product.imageUrl
                                    ? offerLists.product.imageUrl
                                    : "/img/imagena.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className={"col-10 mx-3"}>
                              <div
                                className={
                                  "d-flex justify-content-between w-100"
                                }
                              >
                                <div className={`${style.textSecondary}`}>
                                  {offerLists.statusNotification}
                                </div>
                                <div
                                  className={`${style.textSecondary} ml-auto d-flex`}
                                >
                                  <div
                                    className={`${style.textSecondary} mx-2`}
                                  >
                                    {offerLists.createdAt.substring(0, 10)}
                                  </div>
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === false && (
                                      <div className={`${style.iconUnread}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                  {localStorage.getItem("jwtToken") &&
                                    offerLists.isRead === true && (
                                      <div className={`${style.iconRead}`}>
                                        <GoPrimitiveDot />
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div>{offerLists.product.name}</div>
                              <div>
                                <NumberFormat
                                  value={offerLists.product.price}
                                  displayType={"text"}
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  prefix={"Rp "}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
