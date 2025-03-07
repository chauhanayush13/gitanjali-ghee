import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../context/CartContext';
import { db, auth } from '../Firebase';
import './ProductDetails.css';
import { FaShoppingCart, FaStar, FaRupeeSign } from 'react-icons/fa';

// import img1 from '../images/neckless.jpeg';
// import img2 from '../images/watch.jpeg';
// import img3 from '../images/ring.jpeg';
// import img4 from '../images/earings.jpeg';
// import img5 from '../images/lather-watch.jpeg';

import ghee from '../images/ghee.png'

// Image mapping based on product names
const imageMap = {
    "ghee(250g)": ghee,
    "ghee(500g)": ghee,
    "ghee(750g)": ghee,
    "ghee(1000g)": ghee
};

export default function ProductDetails() {
    const { id } = useParams();
    const { cart, addToCart, decrementFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [loading, setLoading] = useState(true);  // Loader state

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);  // Start loading
            try {
                const productRef = doc(db, "products", id);
                const productSnap = await getDoc(productRef);
                
                if (productSnap.exists()) {
                    const productData = productSnap.data();
                    setProduct({
                        id: productSnap.id,
                        ...productData,
                        images: [imageMap[productData.name], imageMap[productData.name], imageMap[productData.name]]
                    });
                    setMainImage(imageMap[productData.name] || '');
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);  // Stop loading
            }
        };

        fetchProduct();
    }, [id, cart]);

    // Show loader while fetching product data
    if (loading) {
        return (
            <div className="container text-center mt-5 pt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-2">Fetching product details...</p>
            </div>
        );
    }

    if (!product) return <h2 className='container mt-5 pt-5 text-center'>Product not found</h2>;

    const cartItem = cart.find(item => item.id === product.id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;
    const remainingStock = product.stock - cartQuantity;
    const isOutOfStock = remainingStock <= 0;

    const handleAddToCart = () => {
        if (!auth.currentUser) {
            navigate('/login');
        } else {
            if (!isOutOfStock) {
                addToCart(product);
                setIsAddedToCart(true);
            }
        }
    };

    return (
        <div className="container product-details">
            <h1 className="text-center mb-4">{product.name}</h1>

            <div className="row mt-4 align-items-center">
                {/* Image Section */}
                <div className="col-lg-6">
                    <div className="image-container">
                        <img src={mainImage} alt={product.name} className="img-fluid main-image" />
                        <div className="small-images-container mt-3">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={product.name}
                                    className="img-fluid small-image"
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="col-lg-6">
                    <div className="product-info">
                        <p className="product-description">{product.description}</p>
                        <p><FaRupeeSign className="icon" /> <strong>Price:</strong> ₹{product.price}</p>
                        <p><FaStar className="icon" /> <strong>Ratings:</strong> ⭐ 4.5 / 5 ({product.reviews} reviews)</p>

                        {/* Display Stock */}
                        <p><strong>Stock Available:</strong> 
                            {isOutOfStock ? <span className="text-danger"> Out of Stock</span> : ` ${remainingStock} items left`}
                        </p>

                        {/* Add to Cart & View Cart Button */}
                        {isOutOfStock ? (
                            <button className="btn btn-secondary w-100 mt-3" disabled>
                                ❌ Out of Stock
                            </button>
                        ) : cartItem ? (
                            <div className="mt-3">
                                <button className="btn btn-danger me-2" onClick={() => decrementFromCart(product)}>-</button>
                                <span className="cart-quantity">{cartItem.quantity}</span>
                                <button className="btn btn-success ms-2" onClick={handleAddToCart} disabled={remainingStock <= 0}>+</button>
                                {isAddedToCart && (
                                    <Link to="/cart" className="btn btn-outline-primary mt-2 w-100">
                                        🛒 View Cart
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="mt-3">
                                <button className="btn btn-primary w-100 addtocart_button" onClick={handleAddToCart} disabled={isOutOfStock}>
                                    <FaShoppingCart /> Add to Cart
                                </button>
                                {isAddedToCart && (
                                    <Link to="/cart" className="btn btn-outline-primary mt-2 w-100">
                                        🛒 View Cart
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
