import React from "react";
import logo from "./resume logo.png";

const Welcome = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-around items-center mb-10 mt-6">
        <div>
          <p className="text-2xl my-3 font-semibold text-gray-800">Welcome, James</p>
        </div>
        <div>
          <img src={logo} width={48} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
