import React, { useState } from "react";

export default function Create() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      form.append("image", file);
      const data = await fetch("/api/v1/submit", {
        method: "POST",
        body: form,
      });
      const jsondata = await data.json();
      if (jsondata.status === "SUCCESS") {
        console.log("upload success");
      } else {
        console.log("upload error");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            className="p-4 border-black"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            required
          ></input>
          <textarea
            id="description"
            placeholder="Write the description here"
            className="p-4 resize-y h-60 border-black"
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          ></input>
          <button
            className="bg-cyan-500 text-white py-2 px-4 rounded-md mt-2 hover:opacity-70 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
