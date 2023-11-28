import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ChangePass() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [same, setSame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const isSame = () => {
      if (formData.newPass == formData.confirmPass) {
        setSame(true);
      } else {
        setSame(false);
      }
    };
    isSame();
  }, [formData]);

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
      const data = await fetch(`/api/v1/auth/reset-password/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonData = await data.json();
      if (jsonData.success === false) {
        setError({ ...jsonData });
        setIsLoading(false);
        return;
      }
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="newPass"
              name="newpass"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              name="confirmpass"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-600 disabled:opacity-75"
            disabled={isLoading || !same}
          >
            {isLoading || !same ? "Please Wait..." : "Change Password"}
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
