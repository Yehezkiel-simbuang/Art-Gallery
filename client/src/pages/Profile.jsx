import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateSuccess, signOut } from "../redux/user/userSlice";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const refFile = useRef(null);

  console.log(refFile);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogOut = async (e) => {
    try {
      await fetch("/api/v1/auth/logout");
      dispatch(signOut());
    } catch (err) {
      console.log(err);
    }
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
      const data = await fetch(`/api/v1/user/update/${currentUser.id}`, {
        method: "POST",
        body: form,
      });
      const jsonData = await data.json();
      if (jsonData.success == false) {
        setIsLoading(false);
        setError({ ...jsonData });
        return;
      }
      setIsLoading(false);
      dispatch(UpdateSuccess(jsonData));
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mb-4">
            <input
              type="file"
              ref={refFile}
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
            <img
              src={currentUser.photoUrl}
              alt="profile photo"
              className="rounded-full h-20 w-20 self-center cursor-pointer"
              onClick={() => refFile.current.click()}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
              defaultValue={currentUser.email}
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
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none hover:bg-blue-600 disabled:opacity-75"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Update"}
          </button>
        </form>
        <div className="flex justify-end items-end mt-4">
          <Link to="/">
            <span
              onClick={handleLogOut}
              className="text-red-600 hover:underline text-sm font-medium"
            >
              Logout
            </span>
          </Link>
        </div>
      </div>
      <div>
        <p className="mt-4 text-red-600 text-sm font-medium">
          {error ? error.message || "Internal server error" : ""}
        </p>
      </div>
    </div>
  );
}
