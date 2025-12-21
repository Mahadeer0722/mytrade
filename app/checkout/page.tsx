'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        subject: 'Order Inquiry',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    // Auto-fill message with cart items
    const generateOrderMessage = () => {
        let msg = "Order Details:\n";
        items.forEach(item => {
            const name = item.selectedOption
                ? `${item.name} (${item.selectedOption.label})`
                : item.name;
            msg += `- ${name} x ${item.quantity} (₹${item.price * item.quantity})\n`;
        });
        msg += `\nTotal: ₹${totalPrice}`;
        return msg;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm("Confirm your order details?")) return;

        setSubmitting(true);
        const finalMessage = `${formData.message}\n\n${generateOrderMessage()}`;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    message: finalMessage
                }),
            });

            if (res.ok) {
                alert("Order sent successfully! We will contact you shortly.");
                clearCart();
                router.push('/');
            } else {
                alert("Failed to send order. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <main>
                <Navbar />
                <div className="container" style={{ textAlign: 'center', marginTop: 50 }}>
                    <h2>No items to checkout</h2>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Navbar />
            <div className="container">
                <h1 className={styles.pageTitle}>Checkout</h1>
                <div className={styles.layout}>
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>
                        <pre className={styles.orderPreview}>{generateOrderMessage()}</pre>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h2>Your Details</h2>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>First Name</label>
                                <input required name="firstName" value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label>Last Name</label>
                                <input required name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.group}>
                            <label>Phone Number</label>
                            <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" />
                        </div>
                        <div className={styles.group}>
                            <label>Subject</label>
                            <input required name="subject" value={formData.subject} onChange={handleChange} />
                        </div>
                        <div className={styles.group}>
                            <label>Additional Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} rows={4} />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Sending...' : 'Confirm & Send Order'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
