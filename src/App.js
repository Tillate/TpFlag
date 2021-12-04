import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
      <Routes>
        <Route exact path="/" exact element={<Home/>} />
        <Route path="/about" exact element={<About/>} />
        <Route path="*" exact element={<NotFound/>} />
      </Routes>
  );
};

export default App;
