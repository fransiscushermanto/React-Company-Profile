import React from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../actions";
import { useFirebase } from "../../firebase/FirebaseContext";
import TopNav from "./Navigation/TopNav";
import Dashboard from "./Dashboard";
const HomeAdmin = ({ history, setLoading, user }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const onClick = () => {
    firebase.logout();
    dispatch(actions.signOut());
    window.location.reload();
  };
  return (
    <div className="admin-container">
      <TopNav user={user} logout={onClick} history={history} />
      <Dashboard history={history} user={user} setLoading={setLoading} />
    </div>
  );
};

export default HomeAdmin;
