import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { auth, db } from '../Firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './Navbar.css';
import logo from '../images/ghee-logo.png';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(""); 
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const uniqueCartItems = cart.length;
    const navbarRef = useRef(null);

    useEffect(() => {
        // Handle scroll effect
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
    
        // Firebase Authentication Listener
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setIsAdmin(false); // Always reset before checking Firestore
    
            if (currentUser) {
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    const role = userDoc.exists() ? userDoc.data().role : undefined;
                    setUserName(userDoc.exists() ? userDoc.data().name : "User");
                    setIsAdmin(role === "admin"); // Ensuring isAdmin is only set if role exists
    
                    console.log("isAdmin State After Setting:", role === "admin");
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUserName("");
                setIsAdmin(false);
            }   
        });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            unsubscribe();
        };
    }, []);
    

    useEffect(() => {
        // Close navbar when clicking outside
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsNavbarOpen(false);
            }
        };

        if (isNavbarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isNavbarOpen]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsAdmin(false); // Ensure admin status resets on logout
            setUser(null); // Reset user state
            navigate('/login');
            setIsNavbarOpen(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleNavLinkClick = () => setIsNavbarOpen(false);

    return (
        <nav 
            ref={navbarRef} 
            className={`navbar navbar-expand-lg navbar-light ${scrolled || isNavbarOpen ? 'scrolled' : 'bg-transparent'}`}
        >
            <div className="container d-flex align-items-center">
                {/* Logo */}
                <img className="rounded img-fluid" src={logo} alt="Logo" width="70rem" />

                {/* Mobile Cart & Toggle Button */}
                <div className="d-flex align-items-center ms-auto d-lg-none">
                    <Link className="nav-link fs-5 text-dark cart-icon me-2" to="/cart" onClick={handleNavLinkClick}>
                        <FaShoppingCart size={24} />
                        {uniqueCartItems > 0 && <span className="cart-badge">{uniqueCartItems}</span>}
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item"><Link className="nav-link" to="/" onClick={handleNavLinkClick}>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/products" onClick={handleNavLinkClick}>Products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact-us" onClick={handleNavLinkClick}>Contact Us</Link></li>
                        {user && !isAdmin && (<li className="nav-item"><Link className="nav-link" to="/orders" onClick={handleNavLinkClick}>Orders</Link></li>)}
                        {isAdmin && <li className="nav-item"><Link className="nav-link" to="/admin-orders" onClick={handleNavLinkClick}>Admin</Link></li>}
                    </ul>

                    {/* Right Side: Cart & User Info */}
                    <div className="d-flex align-items-center">
                        <Link className="nav-link fs-5 text-dark cart-icon me-3 d-none d-lg-block" to="/cart" onClick={handleNavLinkClick}>
                            <FaShoppingCart size={24} />
                            {uniqueCartItems > 0 && <span className="cart-badge">{uniqueCartItems}</span>}
                        </Link>

                        {/* Authentication Buttons */}
                        {user ? (
                            <div className="container text-center">
                                <span className="me-3 text-dark fw-bold">👋 {userName}</span>
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div className="container text-center">
                                <Link to="/login" className="btn login-button me-2" onClick={handleNavLinkClick}>Login</Link>
                                <Link to="/signup" className="btn signup-button" onClick={handleNavLinkClick}>Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
