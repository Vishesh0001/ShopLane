import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HeroSection } from "./components/HeroSection";
import Navbar from "./components/Navbar";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import CreateStoreForm from "./components/CreateStore";
import StoreDetails from "./components/StoreDetails";
import { AddProduct } from "./components/AddProduct";
import { EditProduct } from "./components/EditProduct";
import { EditStore } from "./components/EditStore";
import AllStoresWithProducts from "./components/AllStore";
function App() {
  return (
    <div className="bg-base h-full text-accent">
      <Navbar />
    <Routes>
       <Route path="/" element={<HeroSection />} />
  <Route element={<PublicRoute />}>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} />
  </Route>
  <Route element={<ProtectedRoute />}>
    <Route path="/create-store" element={<CreateStoreForm />} />  
    <Route path="/dashboard" element={<Dashboard />} />
<Route path="/stores/:storeId" element={<StoreDetails />} />
    <Route path="/addproduct/:storeId" element={<AddProduct />} />
    <Route path="/editproduct/:productId" element={<EditProduct />} />
    <Route path="/editstore/:storeId" element={<EditStore />} />
    <Route path="/allstores" element={<AllStoresWithProducts />} />
  </Route>
  <Route path="*" element={<div>404 - Page Not Found</div>} />
</Routes>
    </div>
  );
}

export default App;
