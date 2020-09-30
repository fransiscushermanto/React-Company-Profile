import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import SideNav from "./Navigation/SideNav";
import MainDashboard from "./MainDashboard";

const Dashboard = ({ user }) => {
  const { url } = useRouteMatch();
  return (
    <div className="admin-dashboard-wrapper">
      <SideNav />
      <Switch>
        <Route
          path={`${url}/:type`}
          render={(props) => <MainDashboard user={user} {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Dashboard;
