import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

export default function Cart() {
    const { cart, removeFromCart, clearCart, addToCart, decrementFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container cart">
            <h1 className="mb-4 text-center">🛒 Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty. Add products to continue shopping.</p>
            ) : (
                <>
                    {/* Table for large screens */}
                    <div className="table-responsive d-none d-md-block">
                        <table className="table table-bordered cart-table">
                            <thead className="table-dark">
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img src={item.image} alt={item.name} width="70" height="70" className="rounded" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price} Rs</td>
                                        
                                        {/* ✅ Quantity Controls */}
                                        <td className="add-remove">
                                            <button 
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => decrementFromCart(item)}
                                                disabled={item.quantity === 1} // Disable if 1
                                            >
                                                -
                                            </button>
                                            <span className="fw-bold">{item.quantity}</span>
                                            <button 
                                                className="btn btn-success btn-sm ms-2"
                                                onClick={() => addToCart(item)}
                                                disabled={item.quantity >= item.stock} // Disable if stock limit reached
                                            >
                                                +
                                            </button>
                                        </td>

                                        <td className="fw-bold">{item.price * item.quantity} Rs</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => removeFromCart(item)}>❌ Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card View for Mobile */}
                    <div className="d-md-none">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item-card shadow-sm p-3 mb-3 bg-white rounded">
                                <div className="d-flex align-items-center">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="ms-3">
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="mb-1 text-muted">{item.price} Rs x {item.quantity}</p>
                                        <p className="fw-bold">Total: {item.price * item.quantity} Rs</p>

                                        {/* ✅ Quantity Controls for Mobile */}
                                        <div>
                                            <button 
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => decrementFromCart(item)}
                                                disabled={item.quantity === 1}
                                            >
                                                -
                                            </button>
                                            <span className="fw-bold">{item.quantity}</span>
                                            <button 
                                                className="btn btn-success btn-sm ms-2"
                                                onClick={() => addToCart(item)}
                                                disabled={item.quantity >= item.stock} // Disable if stock is out
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-warning btn-sm" onClick={() => removeFromCart(item)}>❌ Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Price & Buttons */}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total: <span className="text-success">{totalPrice} Rs</span></h4>
                        <button className="btn btn-outline-danger" onClick={clearCart}>🗑 Clear Cart</button>
                    </div>

                    {/* Proceed to Checkout Button */}
                    <div className="text-center mt-3">
                        <button className="btn btn-primary btn-lg px-5" onClick={() => navigate('/checkout')}>
                            🛍 Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
