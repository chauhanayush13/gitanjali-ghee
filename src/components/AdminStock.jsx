import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { showAlert } from "../utils/alert";

export default function AdminStock() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [stockAmount, setStockAmount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminAndFetchProducts = async () => {
            const user = auth.currentUser;

            if (!user) {
                console.warn("User not logged in. Redirecting...");
                navigate("/login");
                return;
            }

            const adminEmails = ["amc13092003@gmail.com"];
            if (!adminEmails.includes(user.email.toLowerCase())) {
                showAlert("Access Denied!");
                navigate("/");
                return;
            }

            setIsAdmin(true);

            try {
                const productsRef = collection(db, "products");
                const querySnapshot = await getDocs(productsRef);
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        checkAdminAndFetchProducts();
    }, [navigate]);

    const updateStock = async () => {
        if (!selectedProduct) {
            showAlert("Please select a product!");
            return;
        }

        if (stockAmount === 0) {
            showAlert("Stock update must be a positive or negative number!");
            return;
        }

        const selected = products.find(product => product.id === selectedProduct);
        if (!selected) {
            showAlert("Invalid product selection.");
            return;
        }

        const newStock = (selected.stock || 0) + stockAmount;
        if (newStock < 0) {
            showAlert("Stock cannot be negative!");
            return;
        }

        try {
            const productRef = doc(db, "products", selectedProduct);
            await updateDoc(productRef, { stock: newStock });

            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === selectedProduct ? { ...product, stock: newStock } : product
                )
            );

            showAlert("Stock updated successfully!");
            setStockAmount(0);
        } catch (error) {
            console.error("Error updating stock:", error);
            showAlert("Failed to update stock.");
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Manage Product Stock</h1>
            {isAdmin ? (
                <div className="mt-4">
                    <label className="form-label">Select Product:</label>
                    <select className="form-select" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                        <option value="">-- Select Product --</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} (Stock: {product.stock || 0})
                            </option>
                        ))}
                    </select>

                    <br />

                    <label className="form-label">Adjust Stock (Use negative numbers to decrease):</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stockAmount}
                        onChange={(e) => setStockAmount(parseInt(e.target.value) || 0)}
                    />

                    <br />

                    <button className="btn btn-success" onClick={updateStock}>Update Stock</button>
                </div>
            ) : (
                <p className="text-center text-danger">Access Denied!</p>
            )}
        </div>
    );
}
