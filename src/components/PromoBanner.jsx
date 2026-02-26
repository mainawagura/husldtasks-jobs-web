import React from "react";
import "./PromoBanner.css";

export default function PromoBanner() {
    return (
        <section className="promo-banner">
            <div className="banner-content">
                <h3>20% off</h3>
                <p>May 28 - May 30</p>
                <h2>Website Design & Development</h2>
                <button className="btn-check-details">Check details</button>
            </div>
        </section>
    );
}