import Loadable from 'react-loadable'
import React from 'react'
import {Route, Routes} from "react-router-dom"

import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";

// const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./pages/Cart'))
const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/'./pages/Cart'),
  loading: () => <div>Зачекайте, сторінка завантажується...</div>,
});
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./pages/NotFound'))
const Pizza = React.lazy(() => import(/*webpackChunkName: "Pizza"*/'./pages/Pizza'))

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/cart'} element={<Cart/>}/>
          <Route path={'/pizza/:id'} element={
            <React.Suspense fallback={<div>Зачекайте, сторінка завантажується...</div>}>
              <Pizza/>
            </React.Suspense>}/>
          <Route path={'/*'} element={
            <React.Suspense fallback={<div>Зачекайте, сторінка завантажується...</div>}>
              <NotFound/>
            </React.Suspense>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
