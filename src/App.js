import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminOrders from './components/AdminOrders';
import AdminStock from './components/AdminStock';
import AdminAddProduct from './components/AdminAddProduct';
import Layout from "./components/Layout";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import RefundPolicy from "./components/RefundPolicy";
import ContactUs from './components/ContactUs';
import ShippingPolicy from './components/ShippingPolicy';

function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/admin-orders" element={<AdminOrders />} />
                        <Route path="/admin-stock" element={<AdminStock />} />
                        <Route path="/admin-add-product" element={<AdminAddProduct />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-conditions" element={<TermsConditions />} />
                        <Route path="/refund-policy" element={<RefundPolicy />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/shipping-policy" element={<ShippingPolicy />} />  
                    </Routes>
                </Layout>
            </Router>
        </CartProvider>
    );
}

export default App;