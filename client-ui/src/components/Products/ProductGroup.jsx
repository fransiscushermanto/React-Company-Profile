import React, { useState, useEffect, useRef } from "react";
import { animated, useTransition, useSpring, useChain } from "react-spring";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { useRouter } from "../Factories";
import { useFirebase } from "../../firebase/FirebaseContext";
import ProductType from "./ProductType";
import ProductCategoryList from "./ProductCategoryList";
import CardOverlay from "../Home/Overlay/Card";
import "../../sass/product-page.scss";

const ProductGroup = () => {
  const categoryRef = useRef();
  const productRef = useRef();
  let { path } = useRouteMatch();
  const { location } = useRouter();
  const firebase = useFirebase();

  const [productTypes, setProductTypes] = useState([]);
  const [showProductByType, setShowProductByType] = useState({
    show: false,
    type_id: "",
  });
  const [categoryOfProductType, setCategoryOfProductType] = useState([]);

  const categoryTransition = useTransition(!showProductByType.show, null, {
    ref: categoryRef,
    from: { opacity: 1, position: "absolute", top: "0", left: "0" },
    enter: { opacity: 1, position: "relative", top: "0", left: "0" },
    leave: { opacity: 0, position: "absolute", top: "0", left: "0" },
  });

  const setActiveProductCategory = (target, product_type_id) => {
    const parent = [...categoryOfProductType];
    const temp = [
      ...categoryOfProductType.find((item) => item.type_id === product_type_id)
        .list,
    ];
    const index = temp.indexOf(target);
    if (temp[index].active) {
      return;
    } else {
      temp.map((item) => {
        if (item.active) {
          return (item.active = false);
        }
        return true;
      });
      temp[index].active = true;
      parent.find(
        (item) => item.type_id === showProductByType.type_id
      ).list = temp;
      setCategoryOfProductType(parent);
    }
  };

  const transition = useTransition(
    showProductByType.show
      ? categoryOfProductType.find(
          (item) => item.type_id === showProductByType.type_id
        )
      : [],
    (categoryOfProductType) => categoryOfProductType,
    {
      ref: productRef,
      from: { opacity: 0, position: "absolute", top: "0", left: "0" },
      enter: { opacity: 1, position: "relative", top: "0", left: "0" },
      leave: { opacity: 0, position: "absolute", top: "0", left: "0" },
    }
  );

  useChain(
    showProductByType.show
      ? [categoryRef, productRef]
      : [productRef, categoryRef]
  );

  useEffect(() => {
    if (location.pathname.split("/")[2] === undefined) {
      setShowProductByType({
        show: false,
        category_id: "",
      });
    }
  }, [location]);

  useEffect(() => {
    firebase.firestore.collection("product_types").onSnapshot((res) => {
      const typeArr = [],
        categoryArr = [];
      res.docs.map((product_type) => {
        typeArr.push({
          type_id: product_type.id,
          icon: product_type.data().icon,
          type: product_type.data().type,
          className: product_type.data().classname,
        });
        categoryArr.push({
          type_id: product_type.id,
          title: product_type.data().type,
          list: [
            {
              category_id: 1,
              category_name: "All",
              path: "all",
              active: true,
              access: "product_items:*",
              productListByCategory: [],
            },
          ],
        });
        firebase.firestore
          .collection("product_categories")
          .where("type_id", "==", product_type.id)
          .onSnapshot((res) => {
            res.docs.map((product_categories) => {
              return categoryArr
                .find((arr) => arr.type_id === product_type.id)
                .list.push({
                  category_id: product_categories.id,
                  category_name: product_categories.data().name,
                  path: product_categories.data().path,
                  active: false,
                  access: `product_items:${product_categories.id}`,
                  productListByCategory: [],
                });
            });
          });
        return true;
      });
      categoryArr.map((arr) => {
        return firebase.firestore
          .collection("product_items")
          .where("type_id", "==", arr.type_id)
          .onSnapshot((res) => {
            arr.list.map((arrList) => {
              if (arrList.access.split(":")[1] === "*") {
                res.docs.map((product_items) => {
                  return arrList.productListByCategory.push({
                    category_id: product_items.data().category_id,
                    product_id: product_items.id,
                    product_name: product_items.data().product_name,
                    product_img_src: product_items.data().product_img_src,
                    desc: product_items.data().desc,
                    price: product_items.data().price,
                  });
                });
              } else {
                res.docs.map((product_items) => {
                  if (
                    product_items.data().category_id ===
                    arrList.access.split(":")[1]
                  ) {
                    arrList.productListByCategory.push({
                      category_id: product_items.data().category_id,
                      product_id: product_items.id,
                      product_name: product_items.data().product_name,
                      product_img_src: product_items.data().product_img_src,
                      desc: product_items.data().desc,
                      price: product_items.data().price,
                    });
                  }
                  return true;
                });
              }
              return true;
            });
          });
      });
      setCategoryOfProductType(categoryArr);
      setProductTypes(typeArr);
    });
  }, [firebase]);

  // useEffect(() => {
  //   console.log(categoryOfProductType);
  // }, [categoryOfProductType]);

  return (
    <div className="product-wrapper o-hidden">
      <CardOverlay height="100vh"></CardOverlay>
      <Switch>
        <Route path={`${path}/:product_category`}>
          <ProductCategoryList
            productTypes={productTypes}
            transition={transition}
            showProduct={showProductByType.show}
            setShowProductByType={setShowProductByType}
            setActiveProductCategory={setActiveProductCategory}
          />
        </Route>
      </Switch>
      {categoryTransition.map(
        ({ item, key, props: animation }) =>
          item && (
            <ProductType
              key={key}
              productTypes={productTypes}
              setShowProductByType={setShowProductByType}
              showProductByType={showProductByType.show}
              animation={animation}
            ></ProductType>
          )
      )}
    </div>
  );
};

export default ProductGroup;
