import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";
import Farms from "./pages/Farms";
import FarmDetails from "./pages/FarmDetails";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/farms/:id" element={<FarmDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
