import React from "react";

import "../../../sass/overlay.scss";
const Card = () => {
  return (
    <div
      className="card header-card shape-rounded"
      style={{ height: "150px", width: "100%" }}
    >
      <div className="card-overlay bg-highlight opacity-95"></div>
      <div className="card-overlay dark-mode-tint"></div>
    </div>
  );
};

export default Card;
