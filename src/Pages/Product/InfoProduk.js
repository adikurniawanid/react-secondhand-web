import React, { useState, useEffect } from "react";
import CarouselProduct from "../../Components/Produk Seller/Carousel";
import Desc from "../../Components/Produk Seller/Desc";
import Buyer from "../../Components/Produk Seller/Buyer";
import Seller from "../../Components/Produk Seller/Seller";
import style from "./fixingcss.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

// SELLER

const InfoProduk = () => {
  const param = useParams();
  const [productsProfile, setProductsProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/v1/product/${param.id}`)
      .then((res) => {
        setProductsProfile(res.data.data);
      });
  }, []);

  return (
    <>
      <Navbar />
      {productsProfile !== null && (
        <div
          className={`container d-sm-flex justify-content-center mt-4 ${style.containerProduct}`}
        >
          <div className="row">
            <div className="col-12 col-md-8">
              <CarouselProduct productsProfile={productsProfile} />
              <Desc productsProfile={productsProfile} />
            </div>
            <div className="col-12 col-md-4">
              <Buyer productsProfile={productsProfile} />
              <Seller productsProfile={productsProfile} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoProduk;
