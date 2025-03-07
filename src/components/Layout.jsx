import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">{children}</main>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-4">
                <div className="container">
                    <p className="mb-2">&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
                    <nav>
                        <Link to="/privacy-policy" className="text-white mx-2" aria-label="Privacy Policy">
                            Privacy Policy
                        </Link>
                        <span className="text-white">|</span>
                        <Link to="/terms-conditions" className="text-white mx-2" aria-label="Terms & Conditions">
                            Terms & Conditions
                        </Link>
                        <span className="text-white">|</span>
                        <Link to="/refund-policy" className="text-white mx-2" aria-label="Refund Policy">
                            Refund Policy
                        </Link>
                        <span className="text-white">|</span>
                        <Link to="/shipping-policy" className="text-white mx-2">Shipping Policy</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
