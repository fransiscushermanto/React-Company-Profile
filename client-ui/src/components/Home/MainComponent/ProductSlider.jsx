import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ProductSliderComp } from "../../Factories";
const ProductSlider = ({
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onMouseMove,
  sliderRef,
  products,
}) => {
  return (
    <div className="product-categories-slider">
      <header>
        <h5>Categories Product MCI</h5>
        <Link className="ml-auto" to="/product">
          <span>View All</span>
        </Link>
      </header>
      <div className="slider">
        <div
          className="slider-wrapper"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          ref={sliderRef}
        >
          {products.map((product, index) => {
            return (
              <ProductSliderComp
                key={index}
                img={product.img}
                productName={product.productName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

ProductSlider.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  sliderRef: PropTypes.any.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductSlider;
