import React, { useEffect } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import './Footer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Footer() {

    useEffect(() => {
        AOS.init({
            duration: 2000,  // Animation duration in ms
            once: false,      // Animation happens only once
        });
    }, []);

    return (
        <div>
            <div className="row g-4 pt-5">
                {/* Card 1 - Logo */}
                <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up">
                    <div className="card text-center" style={{ backgroundColor: 'transparent', border: 'white' }}>
                        <div className="card-body">
                            <img className='rounded' src={logo} alt="..." width='130rem' />
                        </div>
                    </div>
                </div>

                {/* Card 2 - About Us */}
                <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-delay="200">
                    <div className="card text-center" style={{ backgroundColor: 'transparent', border: 'white' }}>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">About Us</h5>
                            <Link className='footer-link' to='/'>Home</Link>
                            <br />
                            <Link className='footer-link' to='/products'>Products</Link>
                            <br />
                            <Link className='footer-link' to='/orders'>Orders</Link>
                        </div>
                    </div>
                </div>

                {/* Card 3 - Shop */}
                <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-delay="400">
                    <div className="card text-center" style={{ backgroundColor: 'transparent', border: 'white' }}>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Shop</h5>
                            <Link className='footer-link' to='/products' state={{ category: "jewelry" }}>Jewelry</Link>
                            <br />
                            <Link className='footer-link' to='/products' state={{ category: "watches" }}>Watches</Link>
                        </div>
                    </div>
                </div>

                {/* Card 4 - Address */}
                <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-delay="600">
                    <div className="card text-center" style={{ backgroundColor: 'transparent', border: 'white' }}>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Address</h5>
                            <p className="card-text text-center">
                                123 5th Avenue , New York, <br />
                                NY 10160 <br />
                                contact@info.com <br />
                                929-242-6868
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Horizontal line */}
            <hr />

            {/* Footer Copyright Section */}
            <div className='container text-center'>
                <p>Copyright @ 2025 Amart Shopping | Powered by Amart</p>
            </div>
        </div>
    );
}
