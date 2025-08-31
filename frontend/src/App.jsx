import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductsPage from "./pages/ProductsPage"; // make sure path is correct
import OrderPage from "./pages/OrderPage"; // make sure path is correct
import GoogleLogin from "./components/GoogleLogin";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/order" element={<OrderPage />} />
        import ProductsPage from "./pages/ProductsPage";

<Routes>
  <Route path="/products" element={<ProductsPage />} />
  {/* other routes */}
</Routes>

        
        <div>
      <GoogleLogin />
    </div>
  
      </Routes>
    </Router>
    
  );
}

export default App;
