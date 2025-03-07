import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import heroImage from '../images/ghee-home.png'; // Hero image
import ghee from '../images/ghee.png'

import icon1 from '../images/icon-04.png';
import icon2 from '../images/icon-01.png';
import icon3 from '../images/icon-02.png';
import icon4 from '../images/icon-03.png';

// import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000,  // Animation duration in ms
            once: true,      // Animation happens only once
        });
    }, []);

    return (
        <>
        <div className="home-container home">
            {/* Hero Section */}
            <div className="container pt-5" data-aos="fade-right">
                <div className="row align-items-center">
                    {/* Text - Left on Desktop, Bottom on Mobile */}
                    <div className="col-md-6 order-2 order-md-1 text-center text-md-start">
                        <h1 className='heading'>ONLINE <span className='span'>SHOPPING</span></h1>
                        <p>Discover timeless elegance with our exclusive collection. <br /> We provide you a great services.</p>
                        <button className="btn home_button btn-lg" onClick={() => navigate('/products')}>
                            🛍 Shop Now
                        </button>
                    </div>

                    {/* Image - Right on Desktop, Top on Mobile */}
                    <div className="col-md-6 order-1 order-md-2 text-center" data-aos="zoom-in">
                        <img src={heroImage} alt="Pure Ghree" className="hero-img img-fluid rounded mt-5" />
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="categories-section container mt-5">
                <h2 className="text-center heading1 mb-5" data-aos="fade-up">Explore Our <span className='span'>Collections</span> </h2>
                <div className="category-grid">
                    <div className="category-card" onClick={() => navigate('/products', { state: { category: 'half-ghee' } })} data-aos="zoom-in">
                        <img className='catagory-img' src={ghee} alt="Ghee" />
                        <div className="overlay-text">
                            <h6>Up to 65% off</h6>
                            <h2>500 grams </h2>
                            <button className="btn category_button btn-lg">🛍 Shop Now</button>
                        </div>
                    </div>
                    <div className="category-card" onClick={() => navigate('/products', { state: { category: 'full-ghee' } })} data-aos="zoom-in">
                        <img className='catagory-img' src={ghee} alt="Ghee" />
                        <div className="overlay-text">
                            <h6>Up to 65% off</h6>
                            <h2>1000 grams</h2>
                            <button className="btn category_button btn-lg">🛍 Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Quote Section */}
            <div className="container text-center pt-5 pb-5" style={{width:'70%'}} data-aos="fade-up">
                <i className="bi bi-quote fs-1"></i>
                <p className='fw-bold'>"I couldn’t believe the discounts I found! I saved over 50% on a pair of sneakers I’ve been eyeing for months, and got some amazing tech gadgets as well. The site was easy to navigate, and the limited-time offers really added to the excitement. I’ll definitely be back next year!"</p>
                <p>– Emily R., Happy Shopper</p>
            </div>

            {/* Icon Cards Section */}
            <div className="container">
                <div className="row g-4 pt-5 pb-5" data-aos="fade-up">
                    {/* Card 1 */}
                    <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up">
                        <div className="card text-center border-white" style={{ backgroundColor: 'transparent' }}>
                            <div className="card-body">
                                <img src={icon1} alt="..." />
                                <h5 className="card-title fw-bold">BIG DISCOUNTS</h5>
                                <p className="card-text text-justify">
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up">
                        <div className="card text-center border-white" style={{ backgroundColor: 'transparent' }}>
                            <div className="card-body">
                                <img src={icon2} alt="..." />
                                <h5 className="card-title fw-bold">FREE SHIPPING</h5>
                                <p className="card-text text-justify">
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up">
                        <div className="card text-center border-white" style={{ backgroundColor: 'transparent' }}>
                            <div className="card-body">
                                <img src={icon3} alt="..." />
                                <h5 className="card-title fw-bold">SECURE PAYMENTS</h5>
                                <p className="card-text text-justify">
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up">
                        <div className="card text-center border-white" style={{ backgroundColor: 'transparent' }}>
                            <div className="card-body">
                                <img src={icon4} alt="..." />
                                <h5 className="card-title fw-bold">ORDER TRACKING</h5>
                                <p className="card-text text-justify">
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
