import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import "../../sass/header.scss";
const PageHeader = () => {
  return (
    <header className="page-header">
      <h2>MCI Medan</h2>
      <Link to="/" className="ml-auto">
        <Avatar
          round={"40px"}
          size={"40px"}
          className="profile-avatar"
          maxInitials={2}
          src={require("../../assets/img/5s.png")}
        />
      </Link>
    </header>
  );
};

export default PageHeader;
