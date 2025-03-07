import React, { useState } from 'react';
import { auth, db } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/alert';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user details from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.exists() ? userDoc.data() : null;

            if (userData) {
                localStorage.setItem("userName", userData.name);
            }

            showAlert("✅ Login successful!");
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100 pt-5 p-2"
            style={{
                background: 'linear-gradient(135deg, #f8f9fa, #e3f2fd)',
                minHeight: '100vh'
            }}
        >
            <div 
                className="card p-4 shadow-lg"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    borderRadius: '15px',
                    background: 'white',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
                }}
            >
                <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>Login</h2>

                {error && <div className="showAlert showAlert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="input-group shadow-sm input-hover">
                            <span className="input-group-text" style={{ background: '#f8f9fa', border: 'none' }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/646/646094.png" alt="Email" width="20" />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                style={{ border: 'none', height: '45px' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group shadow-sm input-hover">
                            <span className="input-group-text" style={{ background: '#f8f9fa', border: 'none' }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/2889/2889676.png" alt="Lock" width="20" />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                style={{ border: 'none', height: '45px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn login-btn w-100 mt-3"
                        style={{
                            background: 'linear-gradient(135deg, #007bff, #0056b3)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            padding: '10px 0',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease-in-out'
                        }}
                    >
                        🔐 Login
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>
                        Don't have an account? 
                        <a href="/signup" className="signup-link" style={{ color: '#007bff', fontWeight: 'bold', transition: 'color 0.3s ease-in-out' }}>
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>

            {/* Hover Effects CSS */}
            <style>
                {`
                    .login-btn:hover {
                        transform: scale(1.05);
                        filter: brightness(1.2);
                        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
                    }

                    .input-hover:hover {
                        box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.5);
                        border-radius: 10px;
                    }

                    .signup-link:hover {
                        color: #0056b3;
                        text-decoration: underline;
                    }
                `}
            </style>
        </div>
    );
}
