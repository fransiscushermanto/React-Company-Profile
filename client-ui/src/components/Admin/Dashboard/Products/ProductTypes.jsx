import React from "react";
import { useFirebase } from "../../../../firebase/FirebaseContext";

const ProductTypes = () => {
  const firebase = useFirebase();
  return <div className="types_wrapper">Type</div>;
};

export default ProductTypes;
