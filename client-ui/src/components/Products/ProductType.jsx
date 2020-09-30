import React from "react";
import PropTypes from "prop-types";
import { animated } from "react-spring";
import { useRouteMatch, useHistory } from "react-router-dom";

import { ThreeDimensionCard as Card } from "../Factories";
const ProductType = ({
  productTypes,
  setShowProductByType,
  showProductByCategories,
  showProductByType,
  animation,
}) => {
  let { url } = useRouteMatch();
  const history = useHistory();
  return (
    <animated.div className="category" style={animation}>
      <div className="jumbotron">
        <h1>Products</h1>
      </div>
      <div
        className="product-type"
        style={{ pointerEvents: showProductByCategories ? "none" : "all" }}
      >
        {productTypes.map((productType, index) => {
          return (
            <Card
              className={productType.className}
              key={index}
              onClick={() => {
                history.push(`${url}/${productType.className}`);
                if (showProductByType) {
                  return;
                } else {
                  setTimeout(() => {
                    setShowProductByType({
                      show: true,
                      type_id: productType.type_id,
                    });
                  }, 1000);
                }
              }}
            >
              <div className="card-title">
                <span className="icon">
                  <img src={productType.icon} alt="" />
                </span>
              </div>
              <div className="card-body">
                <h5>{productType.type.toUpperCase()}</h5>
              </div>
            </Card>
          );
        })}
      </div>
    </animated.div>
  );
};
ProductType.propTypes = {
  productTypes: PropTypes.array.isRequired,
  setShowProductByType: PropTypes.func.isRequired,
};

export default ProductType;
