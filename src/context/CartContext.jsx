import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add item to cart or increment quantity
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 , image: product.images[0] }];
        });
    };

    // Remove item or decrease quantity
    const decrementFromCart = (product) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0) // Remove if quantity is 0
        );
    };

    // Completely remove an item
    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    };

    const clearCart = () => {
        setCart([]); // Empty the cart array
        localStorage.removeItem("cart"); // Remove cart from local storage
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, decrementFromCart, removeFromCart , clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
