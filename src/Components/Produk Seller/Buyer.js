import React, { useState, useEffect } from "react";
import style from "./product.module.css";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import axios from "axios";

const Buyer = (props) => {
  const param = useParams();
  const [isPublished, setIsPublished] = useState(
    props.productsProfile.status.published
  );

  const handlePublish = () => {
    axios
      .put(
        `${process.env.REACT_APP_URL_API}/v1/product/${param.id}/publish`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        setIsPublished(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`card w-100 ${style.cardProductBuyer} mb-4`}>
      <div className="card-body mx-2">
        <h5 className={`${style.namaBarang}`}>{props.productsProfile.name}</h5>
        <p className={`${style.jenisBarang} d-flex flex-row flex-wrap`}>
          {props.productsProfile.category.map((productCategory) => {
            return (
              <div className={`${style.commaText}`}>{productCategory.name}</div>
            );
          })}
        </p>
        <h5 className={`${style.hargaBarang}`}>
          <NumberFormat
            value={props.productsProfile.price}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp "}
          />
        </h5>
        {localStorage.getItem("jwtToken") && isPublished === false && (
          <button
            type="submit"
            class={`${style.buttonsimpan} w-100 text-white mb-3 mt-3`}
            onClick={handlePublish}
          >
            Terbitkan
          </button>
        )}
        <button type="submit" class={`${style.buttonedit} w-100 mb-3 `}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Buyer;
