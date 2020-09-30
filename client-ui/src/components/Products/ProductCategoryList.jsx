import React, { useEffect, useState } from "react";
import { animated } from "react-spring";
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Link,
} from "react-router-dom";

import Product from "./Product";
const ProductCategoryList = ({
  transition,
  showProduct,
  productTypes,
  setShowProductByType,
  setActiveProductCategory,
}) => {
  const { product_category } = useParams();
  const { path, url } = useRouteMatch();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (findCategory(product_category))
      setShowProductByType({
        show: true,
        type_id: findCategory(product_category).type_id,
      });
  }, [product_category, productTypes]);

  useEffect(() => {
    if (document.getElementsByClassName("active").length > 0) {
      document.getElementsByClassName("active")[0].click();
    }
  }, [document.getElementsByClassName("active").length]);

  const findCategory = (type) => {
    return productTypes.find(
      (productType) => productType.type === type.toLowerCase()
    )
      ? productTypes.find(
          (productType) => productType.type === type.toLowerCase()
        )
      : false;
  };

  return transition.map(({ item: product, key, props: animation }) => (
    <animated.div className="product" style={animation} key={key}>
      <div className="jumbotron">
        <h1>
          {product &&
            product.title.charAt(0).toUpperCase() + product.title.slice(1)}
        </h1>
      </div>
      <div className="product-category">
        <ul>
          {product &&
            product.list.map((item, index) => (
              <li key={index}>
                <Link
                  to={`${url}/${item.path}`}
                  className={`nav-category-list ${item.active ? "active" : ""}`}
                  onClick={() => {
                    setProductList(item.productListByCategory);
                    setActiveProductCategory(
                      item,
                      findCategory(product_category).type_id
                    );
                  }}
                >
                  {item.category_name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/:product`}>
          <Product productList={productList} />
        </Route>
      </Switch>
    </animated.div>
  ));
};

export default ProductCategoryList;
