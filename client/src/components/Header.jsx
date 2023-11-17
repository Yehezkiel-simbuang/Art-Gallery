import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="bg-cyan-500 p-5">
      <div className="flex justify-between">
        <Link to="/">
          <p className="text-lg text-white font-bold mx-4">App</p>
        </Link>
        <Link to="/create">
          <p className="text-lg text-white font-bold mx-4">Submit</p>
        </Link>
      </div>
    </div>
  );
}
