import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-cyan-500 p-5">
      <div className="flex justify-between">
        <Link to="/">
          <p className="text-lg text-white font-bold mx-4">App</p>
        </Link>
        <ul className="flex flex-row gap-4">
          <Link to="/create">
            {currentUser ? (
              <li className="text-lg text-white font-bold mx-4">Submit</li>
            ) : (
              <li></li>
            )}
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.photoUrl}
                alt="Profile picture"
                className="h-11 w-11 rounded-full"
              />
            ) : (
              <li className="text-lg text-white font-bold mx-4">Login</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
