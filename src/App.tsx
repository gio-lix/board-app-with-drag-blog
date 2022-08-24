import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/login";
import Home from "./pages/home";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/signup";
import Board from "./components/board";
import AppLayout from "./layout/AppLayout";

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
