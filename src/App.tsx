import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout";
import Board from "./components/board";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
    return (
        <article className="main">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<AuthLayout/>}>
                      <Route path="login" element={<Login />}/>
                      <Route path="signup" element={<Signup />}/>
                  </Route>
                  <Route path="/" element={<AppLayout/>}>
                      <Route index  element={<Home />}/>
                      <Route path='boards/:boardId' element={<Board />} />
                  </Route>
              </Routes>
          </BrowserRouter>
        </article>
    );
}

export default App;
