import React from "react";

const ShippingPolicy = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">Shipping Policy</h1>

            <div className="card p-4">
                <h3>📦 Shipping Information</h3>
                <p>We strive to deliver your order as quickly as possible. Below are the details of our shipping process:</p>

                <h4>🚚 Delivery Time</h4>
                <ul>
                    <li>Orders are processed within 1-2 business days.</li>
                    <li>Delivery time varies between 5-7 business days depending on your location.</li>
                </ul>

                <h4>💰 Shipping Charges</h4>
                <p>We offer free shipping on all orders above ₹999. Orders below this amount will incur a flat ₹50 shipping fee.</p>

                <h4>🔄 Order Delays</h4>
                <p>In case of unexpected delays due to logistics or weather conditions, we will notify you via email.</p>
            </div>
        </div>
    );
};

export default ShippingPolicy;
