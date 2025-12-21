'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductOption } from '@/data/products';

export interface CartItem extends Product {
    quantity: number;
    selectedOption?: ProductOption;
    cartId: string; // Composite ID: productId + optionLabel (if exists)
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number, selectedOption?: ProductOption) => void;
    removeFromCart: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('grand-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart', error);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('grand-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity: number, selectedOption?: ProductOption) => {
        const cartId = selectedOption
            ? `${product.id}-${selectedOption.label}`
            : product.id;

        // If an option is selected, use that price, otherwise use base price
        const price = selectedOption ? selectedOption.price : product.price;

        setItems((prev) => {
            const existing = prev.find((item) => item.cartId === cartId);
            if (existing) {
                return prev.map((item) =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedOption, cartId, price }];
        });
    };

    const removeFromCart = (cartId: string) => {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const updateQuantity = (cartId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) =>
                item.cartId === cartId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
