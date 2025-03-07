import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { auth, db } from '../Firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { showAlert } from '../utils/alert';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const user = auth.currentUser;

            if (!user) {
                console.warn("User not logged in. Redirecting...");
                navigate('/login');
                return;
            }

            const adminEmails = ["amc13092003@gmail.com"];
            if (!adminEmails.includes(user.email.toLowerCase())) {
                showAlert("Access Denied!");
                navigate('/orders');
                return;
            }

            setIsAdmin(true);

            try {
                const ordersRef = collection(db, "orders");
                const q = query(ordersRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const fetchedOrders = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [navigate]);

    // Export orders to Excel
    const exportToExcel = () => {
        const data = orders.map(order => ({
            'Order ID': order.id,
            'Customer Name': order.customer?.name || "N/A",
            'Email ID': order.customer?.email || "N/A",
            'Address': order.customer?.address || "N/A",
            'Mobile Number': order.customer?.phone || "N/A",
            'Payment Method': order.paymentMethod || "N/A",
            'Total Amount': `₹${order.total || 0}`,
            'Status': order.status || "Pending",
            'Items': order.items
                ? order.items.map(item => `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join(", ")
                : "No items"
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "Orders.xlsx");
    };

    // Delete all orders
    const deleteAllOrders = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all orders? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            const ordersRef = collection(db, "orders");
            const querySnapshot = await getDocs(ordersRef);

            // Delete each order
            const deletePromises = querySnapshot.docs.map((order) => deleteDoc(doc(db, "orders", order.id)));
            await Promise.all(deletePromises);

            setOrders([]); // Clear the state
            showAlert("All orders have been deleted successfully.");
        } catch (error) {
            console.error("Error deleting orders:", error);
            showAlert("Failed to delete orders.");
        }
    };

    // Mark order as completed
    const markOrderAsCompleted = async (orderId) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: "Delivered" });

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: "Delivered" } : order
                )
            );

            showAlert("Order marked as completed!");
        } catch (error) {
            console.error("Error updating order status:", error);
            showAlert("Failed to update order status.");
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Placed Orders</h1>

            {orders.length === 0 ? (
                <p className="text-center">No orders found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Email ID</th>
                                <th>Address</th>
                                <th>Mobile Number</th>
                                <th>Payment Method</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer?.name || "N/A"}</td>
                                    <td>{order.customer?.email || "N/A"}</td>
                                    <td>{order.customer?.address || "N/A"}</td>
                                    <td>{order.customer?.phone || "N/A"}</td>
                                    <td>{order.paymentMethod || "N/A"}</td>
                                    <td>{order.total || 0} Rs</td>
                                    <td className={order.status === "Delivered" ? "text-success" : "text-warning"}>
                                        {order.status || "Pending"}
                                    </td>
                                    <td>
                                        {order.items
                                            ? order.items.map((item, index) => (
                                                <div key={index}>
                                                    {item.name} (x{item.quantity}) - {item.price * item.quantity} Rs
                                                </div>
                                            ))
                                            : "No items"}
                                    </td>
                                    <td>
                                        {order.status !== "Delivered" ? (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => markOrderAsCompleted(order.id)}
                                            >
                                                Mark as Completed
                                            </button>
                                        ) : (
                                            <span className="badge bg-success">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isAdmin && orders.length > 0 && (
                <div className="text-center mb-3">
                    <button className="btn btn-success me-2" onClick={exportToExcel}>
                        Store Orders to Excel
                    </button>
                    <button className="btn btn-danger" onClick={deleteAllOrders}>
                        Delete All Orders
                    </button>
                </div>
            )}
        </div>
    );
}
