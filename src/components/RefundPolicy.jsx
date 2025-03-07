import React from "react";

const RefundPolicy = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">💰 Refund Policy</h1>
            <p className="text-muted text-center">We do not offer refunds once an order is confirmed.</p>

            <div className="card shadow-lg p-4">
                <h3>🚫 No Refunds</h3>
                <p>All sales are final. We do not provide refunds for products or services once purchased.</p>

                <h3>🔄 Exchange Policy</h3>
                <p>In case of a defective product, we may offer an exchange within 7 days of purchase.</p>

                <h3>📝 Contact Us</h3>
                <p>If you have any concerns, please reach out to our support team.</p>

                <p className="text-muted"><strong>Last Updated:</strong> February 2025</p>
            </div>
        </div>
    );
};

export default RefundPolicy;
