import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateBook from "./components/CreateBook";
import BookList from "./components/BookList";
import Update from "./components/UpdateBook";
import Home from "./components/Home";
import Notfound from "./components/NotFound";
import Navbar from "./components/Nav";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path="/books/add" element={<CreateBook />} />
          <Route exact path="/books" element={<BookList />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
