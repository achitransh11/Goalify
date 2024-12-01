import React from "react";
import Header from "../header";
import AppRoutes from "../../routes/AppRoutes";
import Footer from "../footer";

const Main = () => {
  return (
    <>
      <Header />
      <div style={{ height: "85vh", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

export default Main;
