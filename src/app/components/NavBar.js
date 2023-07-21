import React from "react";

import CurrentTime from "../js/CurrentTime";
import CurrentBattery from "../js/CurrentBattery";

const NavBar = () => {
  return (
    <nav className="bg-[#333333] h-4 flex items-center ">
      <img src="../../apple_logo.png" alt="Apple Logo" className="h-4" />
      <strong>
        <h1>usernamedlo</h1>
      </strong>
      {/* <div>
      <CurrentTime />
      <CurrentBattery />
      </div> */}
    </nav>
  );
};

export default NavBar;
