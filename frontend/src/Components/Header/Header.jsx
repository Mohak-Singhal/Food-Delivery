import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Food here</h2>
        <p>
        Order Your Food Here! Enjoy fresh, delicious meals delivered fast. From local favorites to new flavors, we’ve got something for everyone. Quick, easy, and tasty!
        </p>
        <a href="/#explore-menu">
  <button>View Menu</button>
</a>
      </div>
    </div>
  );
};

export default Header;
