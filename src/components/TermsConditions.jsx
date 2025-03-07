import React from "react";

const TermsConditions = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">📜 Terms & Conditions</h1>
            <p className="text-muted text-center">By using our website, you agree to follow these terms and conditions.</p>

            <div className="card shadow-lg p-4">
                <h3>✅ Website Usage</h3>
                <p>You must be at least 18 years old or have parental permission to use our website.</p>

                <h3>🚀 Purchase Policy</h3>
                <p>All purchases are final. Ensure you read product descriptions before placing an order.</p>

                <h3>⚠️ Restrictions</h3>
                <p>You are prohibited from using our site for fraudulent activities or unauthorized transactions.</p>

                <h3>🔄 Updates to Terms</h3>
                <p>We reserve the right to modify these terms at any time.</p>

                <p className="text-muted"><strong>Last Updated:</strong> February 2025</p>
            </div>
        </div>
    );
};

export default TermsConditions;
