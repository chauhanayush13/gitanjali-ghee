import React, { useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../utils/alert";

export default function AdminAddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "jewelry",
        image: "",
        stock: "",
        description: ""
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        if (!product.name || !product.price  || !product.stock || !product.description) {
            showAlert("Please fill in all fields.");
            return;
        }

        try {
            await addDoc(collection(db, "products"), {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock)
            });
            showAlert("Product added successfully!");
            setProduct({ name: "", price: "", category: "jewelry", stock: "", description: "" });
            navigate("/admin-stock");
        } catch (error) {
            console.error("Error adding product:", error);
            showAlert("Failed to add product.");
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center">Add New Product</h1>
            <div className="form-group">
                <label>Product Name:</label>
                <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
            </div>
            <div className="form-group mt-2">
                <label>Price (Rs):</label>
                <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} />
            </div>
            <div className="form-group mt-2">
                <label>Category:</label>
                <select className="form-control" name="category" value={product.category} onChange={handleChange}>
                    <option value="jewelry">Jewelry</option>
                    <option value="watches">Watches</option>
                </select>
            </div>
            <div className="form-group mt-2">
                <label>Stock Quantity:</label>
                <input type="number" className="form-control" name="stock" value={product.stock} onChange={handleChange} />
            </div>
            <div className="form-group mt-2">
                <label>Description:</label>
                <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
            </div>
            <button className="btn btn-success mt-3" onClick={addProduct}>Add Product</button>
        </div>
    );
}
