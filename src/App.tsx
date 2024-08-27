import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpinWheel from "./Pages/SpinWheel";
import Address from "./Pages/Address"; // Assuming you have other pages like HomePage
import Cart from "./Pages/Cart"; // Assuming you have other pages like AboutPage
import GoldLocker from "./Pages/GoldLocker"
import Product from "./Pages/Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpinWheel />} />
        <Route path="/address" element={<Address />} />
        <Route path="/about" element={<Cart />} />
        <Route path="/locker" element={<GoldLocker />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />


      </Routes>
    </Router>
  );
}

export default App;
