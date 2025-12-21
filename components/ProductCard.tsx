'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState(
        product.options && product.options.length > 0 ? product.options[0] : undefined
    );

    // Update selected option if product options change (rare but safe)
    if (product.options && product.options.length > 0 && !selectedOption) {
        setSelectedOption(product.options[0]);
    }

    const currentPrice = selectedOption ? selectedOption.price : product.price;

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val > 0) setQuantity(val);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedOption);
        const itemName = selectedOption
            ? `${product.name} (${selectedOption.label})`
            : product.name;
        alert(`Added ${quantity} ${itemName} to cart!`);
        setQuantity(1); // Reset after adding
    };

    const [showModal, setShowModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // ... (existing code for option selection)

    const handleImageClick = () => {
        if (product.video) {
            setShowVideoModal(true);
        } else {
            setShowModal(true);
        }
    };

    const modalImageSrc = product.detailImage || product.image;

    return (
        <>
            {showVideoModal && product.video && (
                <div className={styles.modalBackdrop} onClick={() => setShowVideoModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setShowVideoModal(false)}>×</button>
                        <video
                            controls
                            autoPlay
                            className={styles.modalImage} // Reuse same styles for sizing
                            style={{ maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}
                        >
                            <source src={product.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {showModal && (
                <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setShowModal(false)}>×</button>
                        <Image
                            src={modalImageSrc}
                            alt={`${product.name} Detail`}
                            width={800}
                            height={1000}
                            className={styles.modalImage}
                            style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
                        />
                    </div>
                </div>
            )}

            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <div
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className={styles.image}
                        />
                    </div>
                    {product.secondaryImage && (
                        <div className={styles.secondaryImageWrapper}>
                            <Image
                                src={product.secondaryImage}
                                alt={`${product.name} badge`}
                                width={150}
                                height={50}
                                className={styles.secondaryImage}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.tagline}>{product.tagline}</p>

                    <div className={styles.features}>
                        {product.options && product.options.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    Format / Size:
                                </label>
                                <select
                                    value={selectedOption?.label}
                                    onChange={(e) => {
                                        const opt = product.options?.find(o => o.label === e.target.value);
                                        if (opt) setSelectedOption(opt);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    {product.options.map((opt) => (
                                        <option key={opt.label} value={opt.label}>
                                            {opt.label} - ₹{opt.price}
                                        </option>
                                    ))}
                                </select>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>
                                    ₹{currentPrice}
                                </div>
                            </div>
                        )}

                        {!product.options && (
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                                ₹{currentPrice}
                            </div>
                        )}

                        <h4>Key Features:</h4>
                        <ul>
                            {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                                <li key={idx}>{feat}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.quantity}>
                            <button onClick={handleDecrement} className={styles.qtyBtn}>-</button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleInputChange}
                                className={styles.qtyInput}
                            />
                            <button onClick={handleIncrement} className={styles.qtyBtn}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className="btn btn-primary">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
