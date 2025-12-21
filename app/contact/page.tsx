'use client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import styles from './contact.module.css';

export default function ContactPage() {
    return (
        <main>
            <Navbar />
            <div className="container">
                <Link href="/" className="btn-back">Back to Shop</Link>
                <h1 className={styles.title}>Contact Us</h1>
                <div className={styles.card}>
                    <h2>Grand Trading Company</h2>
                    <div className={styles.infoGroup}>
                        <label>Address:</label>
                        <p>45-A, Grand Complex, Pachayyappa Street<br />Kumbakonam - 612 001</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <label>Phone:</label>
                        <p>+91 7550387247<br />+91 82208 82160</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <label>Email:</label>
                        <p>agrandhaja@gmail.com</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <label>Business Hours:</label>
                        <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p>Sunday: 10:00 AM - 5:00 PM</p>
                    </div>

                    <a href="tel:+917550387247" className="btn btn-primary">Call Now</a>
                </div>
            </div>
        </main>
    );
}
