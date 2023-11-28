import React, { useState } from "react";

export default function ResetPass() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    try {
      setFormData({ [e.target.id]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetch("/api/v1/auth/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonData = await data.json();
      if (jsonData.success === false) {
        setError({ ...jsonData });
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setIsLoading(false);
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
          <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-600 disabled:opacity-75"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
      <div>
        <p className="mt-4 text-red-600 text-sm font-medium">
          {error ? error.message || "Internal server error" : ""}
        </p>
        <p className="mt-4 text-green-600 text-sm font-medium">
          {success ? "Check your email" : ""}
        </p>
      </div>
    </div>
  );
}
