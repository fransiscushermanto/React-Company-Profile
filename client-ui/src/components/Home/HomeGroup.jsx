import React from "react";
import PageHeader from "./PageHeader";
import Main from "./Main";
import PageFooter from "./PageFooter";
const HomeGroup = () => {
  return (
    <div className="home">
      <PageHeader></PageHeader>
      <Main></Main>
      <PageFooter></PageFooter>
    </div>
  );
};

export default HomeGroup;
