import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
// updated vff
export default function Home() {
  return (
    <main>
      <Navbar />
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Grand Trading Company</h1>
          <p className={styles.heroSubtitle}>Premium Quality. Authentic Taste.</p>
        </div>
      </header>

      <section className="container">
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="container">
        <h2 className={styles.sectionTitle}>Product Videos</h2>
        <div className={styles.videoGrid}>
          {/* Video 1 Placeholder */}
          <div className={styles.videoWrapper}>
            <video controls className={styles.video} poster="/images/kudanthai-degree-instant.png">
              <source src="/videos/product-video-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className={styles.videoCaption}>Product Highlight 1</p>
          </div>

          {/* Video 2 Placeholder */}
          <div className={styles.videoWrapper}>
            <video controls className={styles.video} poster="/images/kudanthai-degree-filter.png">
              <source src="/videos/product-video-2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className={styles.videoCaption}>Product Highlight 2</p>
          </div>
        </div>

        {/* Tamil Video Section */}
        <h2 className={styles.sectionTitle}>Watch in Tamil</h2>
        <div className={styles.videoGrid}>
          {/* Tamil Video 1 */}
          <div className={styles.videoWrapper}>
            <video controls className={styles.video} poster="/images/kudanthai-degree-instant.png">
              <source src="/videos/tamil-video-1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className={styles.videoCaption}>Tamil Review 1</p>
          </div>

          {/* Tamil Video 2 */}
          <div className={styles.videoWrapper}>
            <video controls className={styles.video} poster="/images/kudanthai-degree-filter.png">
              <source src="/videos/tamil-video-2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className={styles.videoCaption}>Tamil Review 2</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p>© 2024 Grand Trading Company. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
