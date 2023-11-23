import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-blue-500 p-6">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between ">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-medium text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="text-2xl hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-semibold text-white-300"
          >
            My Bookstore
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            to="/books/add"
            className="text-lg hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-semibold text-white-300"
          >
            Add Book
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
