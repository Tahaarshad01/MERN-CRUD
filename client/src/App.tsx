import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Fetch from "./components/Fetch";
import Login from "./components/Login";
import Update from "./components/Update";
import Private from "./components/Private";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route element={<Private />}>
          <Route path="/fetch" element={<Fetch />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
