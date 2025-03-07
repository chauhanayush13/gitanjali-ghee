import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center mb-4">📞 Contact Us</h1>
            <p className="text-center text-muted">We'd love to hear from you! Feel free to reach out for any queries or assistance.</p>

            <div className="row">
                {/* Contact Info Section */}
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h3 className="mb-3">📌 Our Contact Details</h3>
                        <p><FaPhone className="text-primary" /> <strong>Phone:</strong> +91 98765 43210</p>
                        <p><FaEnvelope className="text-danger" /> <strong>Email:</strong> support@yourwebsite.com</p>
                        <p><FaMapMarkerAlt className="text-success" /> <strong>Address:</strong> 123, Your Street, Your City, India</p>

                        {/* Social Media Links */}
                        <div className="mt-3">
                            <h4>Follow Us</h4>
                            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="me-3 text-danger fs-2">
                                <FaInstagram />
                            </a>
                            <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="me-3 text-primary fs-2">
                                <FaFacebook />
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-success fs-2">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h3 className="mb-3">📩 Send us a Message</h3>
                        <form>
                            <input type="text" className="form-control mb-3" placeholder="Your Name" required />
                            <input type="email" className="form-control mb-3" placeholder="Your Email" required />
                            <textarea className="form-control mb-3" placeholder="Your Message" rows="4" required></textarea>
                            <button className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-5">
                <h3 className="text-center">📍 Find Us Here</h3>
                <iframe
                    title="Google Map"
                    className="w-100 shadow-lg rounded"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?q=Your%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
