import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../Firebase";
import { collection, doc , updateDoc,  addDoc, serverTimestamp } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import { showAlert } from "../utils/alert";

export default function Checkout() {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [loading, setLoading] = useState(false);  // 🔄 Loader State

    useEffect(() => {
        setUser(auth.currentUser);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.displayName || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendOrderEmailToAdmin = async (orderDetails) => {
        const scriptURL = "https://script.google.com/macros/s/AKfycby7I3Nacaxg7bwj8HSPmXoSOT86rgrzSlbYrMJKbDWT1jeapxsBp5D3Mt41R7JU-w4D/exec";
        const formData = new FormData();
        formData.append("orderDetails", JSON.stringify(orderDetails));

        try {
            await fetch(scriptURL, {
                method: "POST",
                body: formData,
            });
            console.log("✅ Order email sent successfully!");
        } catch (error) {
            console.error("⚠️ Error sending email:", error);
            throw error;
        }
    };

    const handlePlaceOrder = async () => {
        if (!formData.address || !formData.phone) {
            showAlert("⚠️ Please enter all required details.");
            return;
        }

        setLoading(true); // 🔄 Show loader

        const orderDetails = {
            userId: user?.uid || "guest",
            customer: {
                name: formData.name,
                email: formData.email,
                address: formData.address,
                phone: formData.phone,
            },
            paymentMethod,
            items: cart,
            total: totalPrice,
            status: "Pending",
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, "orders"), orderDetails);
            await sendOrderEmailToAdmin({
                name: formData.name,
                email: formData.email,
                address: formData.address,
                phone: formData.phone,
                paymentMethod,
                items: cart.map(item => `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join("\n"),
                total: `₹${totalPrice}`,
            });

            for (const item of cart) {
                const productRef = doc(db, "products", item.id);
                const newStock = item.stock - item.quantity;
                await updateDoc(productRef, { stock: newStock });
            }

            showAlert("✅ Order placed successfully!");
            clearCart();
            navigate("/orders");
        } catch (error) {
            showAlert("⚠️ Failed to place order. Please try again.");
        } finally {
            setLoading(false); // ❌ Hide loader after completion
        }


    };

    const handleUPIPayment = () => {

        if (!formData.name || !formData.address || !formData.phone) {
            showAlert("⚠️ Please fill in all required fields before proceeding to payment.");
            return;
        }

        setLoading(true); // 🔄 Show loader during payment
        const options = {
            key: "rzp_live_gaWhgAfypw7919",
            amount: totalPrice * 100,
            currency: "INR",
            name: "My Store",
            description: "Order Payment",
            image: "/logo.png",
            prefill: {
                email: formData.email,
                contact: formData.phone,
            },
            method: "upi",
            handler: () => handlePlaceOrder(),
            theme: { color: "#f37254" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="mb-4 text-center">Checkout</h1>
            {cart.length === 0 ? (
                <p className="text-center">🛒 Your cart is empty. Add products before checkout.</p>
            ) : (
                <>
                    <div className="card p-3 mb-4">
                        <h3>📝 Order Summary</h3>
                        {cart.map((item) => (
                            <p key={item.id}>{item.name} (x{item.quantity}) - ₹{item.price * item.quantity}</p>
                        ))}
                        <h4>Total: <strong>₹{totalPrice}</strong></h4>
                    </div>
                    <form className="card p-4">
                        <h3>📍 Shipping Information</h3>
                        <input type="text" className="form-control mb-3" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                        <input type="email" className="form-control mb-3" name="email" value={formData.email} readOnly />
                        <textarea className="form-control mb-3" name="address" value={formData.address} onChange={handleChange} required placeholder="Address" />
                        <input type="number" className="form-control mb-3" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" />
                        
                        <h3>💳 Select Payment Method</h3>
                        <select className="form-control mb-3" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="UPI">UPI (Google Pay, PhonePe, etc.)</option>
                            <option value="COD">Cash on Delivery</option>
                        </select>

                        {loading && (
                            <div className="text-center my-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Processing...</span>
                                </div>
                                <p className="text-muted">Processing order...</p>
                            </div>
                        )}

                        {paymentMethod === "UPI" ? (
                            <button type="button" className="btn btn-success w-100" onClick={handleUPIPayment} disabled={loading}>
                                {loading ? "Processing..." : "🏦 Proceed to Payment"}
                            </button>
                        ) : (
                            <button type="button" className="btn btn-primary w-100" onClick={() => handlePlaceOrder()} disabled={loading}>
                                {loading ? "Processing..." : "📦 Place Order (COD)"}
                            </button>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}
