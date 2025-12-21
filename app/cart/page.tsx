'use client';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import styles from './cart.module.css';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <main>
            <Navbar />
            <div className="container">
                <Link href="/" className="btn-back">Back to Shop</Link>
                <h1 className={styles.pageTitle}>Your Cart</h1>

                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Your cart is empty.</p>
                        <Link href="/" className="btn btn-secondary">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className={styles.cartContent}>
                        <div className={styles.items}>
                            {items.map((item) => (
                                <div key={item.cartId} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <Image src={item.image} alt={item.name} width={80} height={80} style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h3>{item.name}</h3>
                                        {item.selectedOption && (
                                            <p className={styles.variant}>{item.selectedOption.label}</p>
                                        )}
                                        <p>Price: ₹{item.price * item.quantity}</p>
                                    </div>
                                    <div className={styles.itemActions}>
                                        <div className={styles.quantity}>
                                            <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.cartId)} className={styles.removeBtn}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <h2>Summary</h2>
                            <div className={styles.summaryRow}>
                                <span>Total:</span>
                                <span className={styles.totalPrice}>₹{totalPrice}</span>
                            </div>
                            <Link href="/checkout" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
