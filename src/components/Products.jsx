import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Product.css';

// import necklace from '../images/neckless.jpeg';
// import watch from '../images/watch.jpeg';
// import ring from '../images/ring.jpeg';
// import earings from '../images/earings.jpeg';
// import lather_watch from '../images/lather-watch.jpeg';

import ghee from '../images/ghee.png'

export default function Products() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('all');
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);  // New state for loading

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Assign manual images based on product name or category
                const updatedProducts = fetchedProducts.map(product => ({
                    ...product,
                    image: getProductImage(product.name, product.category),
                }));

                setProducts(updatedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);  // Set loading to false when done
            }
        };

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const adminEmails = ["amc13092003@gmail.com"];
                setIsAdmin(adminEmails.includes(user.email.toLowerCase()));
            } else {
                setIsAdmin(false);
            }
        });

        fetchProducts();
        return () => unsubscribe();
    }, []);

    // Function to manually set images
    const getProductImage = (name, category) => {
        const imageMap = {
            "ghee(250g)": ghee,
            "ghee(500g)": ghee,
            "ghee(750g)": ghee,
            "ghee(1000g)": ghee
        };

        return imageMap[name] || (category === "half-ghee" ? "/images/default-jewelry.jpg" : "/images/default-watch.jpg");
    };

    const filteredProducts = category === 'all'
        ? products
        : products.filter(product => product.category === category);

    return (
        <div className="container products">
            <h1 className="mb-4 product_heading text-center" data-aos="fade-up">
                Our <span className='span'>Products</span>
            </h1>

            {/* Filter Buttons */}
            <div className="d-flex justify-content-center mb-4" data-aos="fade-up" data-aos-delay="100">
                <button className="btn filter_button me-2" onClick={() => setCategory('all')}>All</button>
                <button className="btn filter_button me-2" onClick={() => setCategory('half-ghee')}>500g</button>
                <button className="btn filter_button" onClick={() => setCategory('full-ghee')}>1000g</button>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center my-5" data-aos="fade-up">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2">Fetching products...</p>
                </div>
            ) : (
                <div className="row1">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <div key={product.id} className="clickable-card" data-aos="fade-up" data-aos-delay={index * 100} onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                                <div className="card mb-4">
                                    <img src={product.image} className="card-img-top card_img" alt={product.name} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.price} Rs</p>
                                        <p className="card-text">
                                            <strong>Stock:</strong> {product.stock > 0 ? product.stock : <span className="text-danger">Out of Stock</span>}
                                        </p>
                                        {isAdmin ? (
                                            <button
                                                className="btn addtocart_button mt-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/admin-stock');
                                                }}
                                            >
                                                Manage Stock
                                            </button>
                                        ) : (
                                            <button
                                                className="btn addtocart_button mt-2"
                                                onClick={() => navigate('/cart')}
                                            >
                                                🛒Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted" data-aos="fade-up">opps! No internet.....</p>
                    )}
                </div>
            )}
        </div>
    );
}
