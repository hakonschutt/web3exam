import React from "react";

const Header = () => {
  return (
    <footer className="text-muted bg-dark p-5">
      <div className="container">
        <p className="text-white">{new Date().getFullYear()} Copyright Woact</p>
      </div>
    </footer>
  );
};

export default Header;
