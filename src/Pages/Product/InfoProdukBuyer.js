import React, { useState, useEffect } from "react";
import CarouselProduct from "../../Components/Produk/Carousel";
import Desc from "../../Components/Produk/Desc";
import Buyer from "../../Components/Produk/Buyer";
import Seller from "../../Components/Produk/Seller";
import style from "./fixingcss.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const InfoProdukBuyer = () => {
  const param = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(`${process.env.REACT_APP_URL_API}/v1/product/${param.id}`, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((res) => {
          setProducts(res.data.data);
          console.log("ini productss: ", res.data.data);
        });
    } else {
      axios
        .get(`${process.env.REACT_APP_URL_API}/v1/product/${param.id}`)
        .then((res) => {
          setProducts(res.data.data);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      {products !== null && (
        <div
          className={`container d-sm-flex justify-content-center mt-4 ${style.containerProduct}`}
        >
          <div className="row">
            <div className="col-12 col-md-8">
              <CarouselProduct products={products} />
              <Desc products={products} />
            </div>
            <div className="col-12 col-md-4">
              <Buyer products={products} />
              <Seller products={products} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoProdukBuyer;
