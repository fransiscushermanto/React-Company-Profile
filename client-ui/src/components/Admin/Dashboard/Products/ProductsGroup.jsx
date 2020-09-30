import React, { useEffect } from "react";
import {
  useLocation,
  useHistory,
  useRouteMatch,
  Route,
  Switch,
} from "react-router-dom";
import { getParams } from "../../../Factories";
import ProductTypes from "./ProductTypes";
const ProductsGroup = () => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { pathname } = history.location;

  const { child_nav } = getParams(
    `\/${url.split("/")[1]}/${pathname.split("/")[2]}/\:child_nav`,
    pathname
  );

  const ProductChildRender = () => {
    switch (child_nav) {
      case "types":
        return <ProductTypes child_nav={child_nav} />;
      case "categories":
        return <div>Categories</div>;
      case "items":
        return <div>Items</div>;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-group products-group">
      <div className="inner-dashboard-group">
        <Switch>
          <Route path={`${url}/:child`} render={() => <ProductChildRender />} />
        </Switch>
      </div>
    </div>
  );
};

export default ProductsGroup;
