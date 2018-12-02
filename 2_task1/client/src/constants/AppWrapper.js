import React from "react";

import { Header, Footer } from "../components";

const AppWrapper = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppWrapper;
