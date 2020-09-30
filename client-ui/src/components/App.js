import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import { Loader } from "./Factories";
import Home from "./Home/HomeGroup";
import Product from "./Products/ProductGroup";
import HomeAdmin from "./Admin/HomeAdmin";
import SignInAdmin from "./Admin/SignIn";
import { useFirebase } from "../firebase/FirebaseContext";
import * as actions from "../actions";
import { verifyToken, generateToken } from "./AuthHelper";
const App = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const loadTransition = useTransition(loading, null, {
    from: {
      opacity: "0",
      x: 0,
    },
    enter: {
      opacity: "1",
      x: 100,
    },
    leave: {
      opacity: "0",
      x: 0,
    },
    config: { duration: 500 },
  });

  const firebase = useFirebase();
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.auth.user);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        firebase.firestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot(async (data) => {
            const decodedToken = await verifyToken(
              await firebase.loginWithCustomToken(
                await generateToken(user.uid, { user: data.data() })
              ),
              data.data().disabled
            );
            if (decodedToken.verified) {
              dispatch(
                actions.signIn({
                  uid: decodedToken.uid,
                  data: decodedToken.user,
                  verified: decodedToken.verified,
                })
              );
            }
          });
      }
    });
  }, [firebase]);

  useEffect(() => {
    window.addEventListener("load", function () {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
    return () =>
      window.removeEventListener("load", function () {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

  return (
    <div className="app">
      {loadTransition.map(
        ({ item, props, key }) =>
          item && (
            <animated.div className="loader-wrapper" key={key} style={props}>
              <Loader></Loader>
            </animated.div>
          )
      )}
      {!loading && (
        <animated.div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <ComponentWrapper setLoading={setLoading}>
                    <Home
                      {...props}
                      user={userGlobal}
                      setLoading={setLoading}
                    />
                  </ComponentWrapper>
                </>
              )}
            />
            <Route
              path="/product"
              render={(props) => (
                <>
                  <ComponentWrapper setLoading={setLoading}>
                    <Product {...props} setLoading={setLoading} />
                  </ComponentWrapper>
                </>
              )}
            />
            <Route
              path="/admin"
              render={(props) =>
                userGlobal !== null ? (
                  <HomeAdmin
                    {...props}
                    user={userGlobal}
                    setLoading={setLoading}
                  />
                ) : (
                  <SignInAdmin />
                )
              }
            />
          </Switch>
        </animated.div>
      )}
    </div>
  );
};

const ComponentWrapper = ({ children, setLoading }) => {
  return (
    <>
      <Header setLoading={setLoading} />
      {children} <Footer />
    </>
  );
};

export default App;

// var childrenWithProps = Children.map(children.props.children, (child) =>
//   cloneElement(child, { setLoading: setLoading })
// );
// console.log(childrenWithProps);
