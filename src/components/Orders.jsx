import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Order.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigate("/login"); // Redirect to login if not logged in
                return;
            }

            try {
                const ordersRef = collection(db, "orders");
                const q = query(ordersRef, where("userId", "==", user.uid)); // Fetch only user's orders
                const querySnapshot = await getDocs(q);

                const fetchedOrders = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchOrders();
    }, [navigate]);

    return (
        <div className="container mt-5 pt-5 order-container">
            <h1 className="text-center mb-4">📦 Your Orders</h1>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            ) : orders.length === 0 ? (
                <p className="text-center text-muted">No orders found.</p>
            ) : (
                <div className="row">
                    {orders.map((order) => (
                        <div key={order.id} className="col-md-6">
                            <div className="card order-card p-4 mb-4">
                                <h5 className="order-id">🆔 Order ID: {order.id}</h5>
                                <p className="order-total">
                                    <strong>💰 Total:</strong>{" "}
                                    <span className="text-success">{order.total} Rs</span>
                                </p>
                                <p className="order-payment">
                                    <strong>💳 Payment:</strong> {order.paymentMethod}
                                </p>
                                <p
                                    className={`order-status ${
                                        order.status === "Pending" ? "text-warning" : "text-success"
                                    }`}
                                >
                                    <strong>📌 Status:</strong> {order.status}
                                </p>
                                <h5>🛒 Items:</h5>
                                <ul className="order-items">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="order-item">
                                            <span className="item-name">{item.name}</span> (x{item.quantity}) -{" "}
                                            <strong>₹{item.price * item.quantity}</strong>
                                        </li>
                                    ))}
                                </ul>
                                <p className="classname">Your Order will reach to you within 7 days</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
