import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await data.json();
      if (jsonData.success === false) {
        setError({ ...jsonData });
        return;
      }
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="pass"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-600 disabled:opacity-75"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Sign Up"}
          </button>
        </form>
      </div>
      <div>
        <p className="mt-4 text-red-600 text-sm font-medium">
          {error ? error.message || "Internal server error" : ""}
        </p>
      </div>
    </div>
  );
}
