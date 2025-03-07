import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">🔒 Privacy Policy</h1>
            <p className="text-muted text-center">Your privacy is important to us. This policy explains how we handle your personal information.</p>
            
            <div className="card shadow-lg p-4">
                <h3>📌 Information We Collect</h3>
                <p>We collect personal details like name, email, phone number, and address when you make a purchase or contact us.</p>
                
                <h3>🔐 How We Use Your Data</h3>
                <p>Your data is used to process orders, improve services, and send updates about our products.</p>

                <h3>🚫 Data Protection & Security</h3>
                <p>We implement strict security measures to keep your data safe. We **never share** your personal information without consent.</p>

                <h3>📝 Changes to This Policy</h3>
                <p>We may update our Privacy Policy. Any changes will be posted on this page.</p>

                <p className="text-muted"><strong>Last Updated:</strong> February 2025</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
