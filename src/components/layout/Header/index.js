import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "store/actions/auth";

const Header = () => {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exam Platform</h1>
        {user && (
          <div className="flex items-center">
            <span className="mr-2">{user.username}</span>
            <img
              src="https://via.placeholder.com/30"
              alt="User Avatar"
              className="rounded-full border-2 border-white cursor-pointer"
            />
            <button
              type="button"
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
