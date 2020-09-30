import React from "react";

import "../../../sass/overlay.scss";
const Card = ({ height }) => {
  return (
    <div
      className="card header-card shape-rounded overlay"
      style={{ height: height, width: "100%" }}
    >
      <div className="card-overlay bg-highlight opacity-95"></div>
      <div className="card-overlay dark-mode-tint"></div>
    </div>
  );
};

export default Card;
