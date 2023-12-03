import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="bg-gray-800 text-white p-4 min-h-screen">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold">Menu</h2>
    </div>
    <nav>
      <ul>
        <li className="mb-2">
          <Link
            to="/dashboard"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/exam"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Exam
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
