import React, { useState } from 'react';
import { auth, db } from '../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../utils/alert';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

            showAlert("✅ Signup successful! Please login.");
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
                <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>Sign Up</h2>

                {error && <div className="showAlert showAlert-danger">{error}</div>}

                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <div className="input-group shadow-sm input-hover">
                            <span className="input-group-text" style={{ background: '#f8f9fa', border: 'none' }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" width="20" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your full name"
                                style={{ border: 'none', height: '45px' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                        className="btn signup-btn w-100 mt-3"
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
                        ✨ Sign Up
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>
                        Already have an account? 
                        <a href="/login" className="login-link" style={{ color: '#007bff', fontWeight: 'bold', transition: 'color 0.3s ease-in-out' }}>
                            Login
                        </a>
                    </p>
                </div>
            </div>

            {/* Hover Effects CSS */}
            <style>
                {`
                    .signup-btn:hover {
                        transform: scale(1.05);
                        filter: brightness(1.2);
                        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
                    }

                    .input-hover:hover {
                        box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.5);
                        border-radius: 10px;
                    }

                    .login-link:hover {
                        color: #0056b3;
                        text-decoration: underline;
                    }
                `}
            </style>
        </div>
    );
}
