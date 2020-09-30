import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const Product = ({ productList }) => {
  const { product } = useParams();

  return (
    <div className="product-card-wrapper">
      <div className="inner-product-card-wrapper">
        {productList.map((product) => (
          <Card
            key={product.product_id}
            product_name={product.product_name}
            product_price={product.price}
            product_desc={product.desc}
          ></Card>
        ))}
      </div>
    </div>
  );
};

const Card = ({ product_name, product_price, product_desc }) => {
  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img
          src={require("../../assets/img/product/BIOVORTEX10.jpg")}
          alt="Product"
          className="card-img-top"
        />
      </div>
      <div className="card-body">
        <h1 className="card-title" title={product_name}>
          {product_name}
        </h1>
        <p className="card-desc">{product_desc}</p>
        <span className="card-price">{product_price}</span>
      </div>
    </div>
  );
};
export default Product;
