import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import BookListFunc from "./component/BookListFunc";
import BookCreate from "./component/BookCreate";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/create" element={<BookCreate/>}/>
                  <Route path="/books" element={<BookListFunc/>}/>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
