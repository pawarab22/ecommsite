import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from "./components/Product";
import Checkout from "./components/Checkout";
import Placeorder from "./components/Placeorder";
import Addcart from "./components/Addcart";
import Addproduct from "./components/Addproduct";

export default function App() {
  return (
    <div className="m-3">
      <h1 className='text-light text-center bg-warning border border-2 p-2 '> E-Commerce Site </h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/buynow" element={<Addcart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/orderplaced" element={<Placeorder />} />
          <Route path="/addproduct" element={<Addproduct />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
