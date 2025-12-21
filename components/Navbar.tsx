'use client';
import Link from 'next/link';
import NextImage from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { totalItems } = useCart();

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <NextImage
                        src="/logo.png"
                        alt="Grand Trading Company Logo"
                        width={40}
                        height={40}
                        className={styles.logoImage}
                        style={{ objectFit: 'contain' }}
                    />
                    <span>GRAND TRADING COMPANY</span>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                    <Link href="/cart" className={styles.cartIcon}>
                        <span>Cart</span>
                        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
