import React from 'react';
import styles from './Footer.module.css';



export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className={`${styles.links} d-flex flex-wrap`}>
            <div className={`${styles['useful-links']} d-flex`}>
              <h2>Useful Links</h2>
              <a href="#">Delivery Details</a>
              <a href="#">International Shipping</a>
              <a href="#">Payment Options</a>
              <a href="#">Track Your Order</a>
              <a href="#">Return</a>
              <a href="#">Find a Store</a>
            </div>
            <div className={`${styles.information} d-flex`}>
              <h2>Information</h2>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Offers Details</a>
              <a href="#">Help &amp; FAQs</a>
              <a href="#">About Us</a>
            </div>
            <div className={`${styles['contact-us']} d-flex`}>
              <h2>Contact Us</h2>
              <a href="#">Mail to Us</a>
              <a href="#">+91-9204824823</a>
              <a href="#">Chat to Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}