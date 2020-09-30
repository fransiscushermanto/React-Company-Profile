import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../firebase/FirebaseContext";

import UsersGroup from "./Dashboard/Users/UsersGroup";
import ProductsGroup from "./Dashboard/Products/ProductsGroup";

const MainDashboard = ({ user }) => {
  const { type } = useParams();

  const conditionalRenderDashboard = () => {
    switch (type) {
      case "users":
        return <UsersGroup user={user} />;

      case "products":
        return <ProductsGroup user={user} />;

      default:
        break;
    }
  };

  return <div className="main_dashboard">{conditionalRenderDashboard()}</div>;
};

export default MainDashboard;
