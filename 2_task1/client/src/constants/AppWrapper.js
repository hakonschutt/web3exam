import React from "react";

import { Header, Footer } from "../components";

/**
 * Application wrapper for displaying all pages in the same way with header and footer
 */
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
