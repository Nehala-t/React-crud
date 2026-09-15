import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <span className="hero-badge">
                ✨ New Collection
              </span>

              <h1 className="hero-title">
                Discover Products
                <br />
                You'll <span>Love.</span>
              </h1>

              <p className="hero-text">
                Explore our latest collection of quality products,
                amazing deals, and everything you need in one place.
              </p>

              {/* <div className="hero-buttons">
                <Link to="/products" className="btn btn-dark">
                  Shop Now →
                </Link>

                <Link to="/products" className="btn btn-outline-dark">
                  Explore Collection
                </Link>
              </div> */}
            </div>

            <div className="col-lg-6">
              <div className="hero-image">
                <div className="hero-image-content">
                  <span>NEW</span>
                  <h3>Fresh Styles</h3>
                  <p>Made for you</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-3">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h5>Free Shipping</h5>
                <p>On orders above ₹999</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h5>Secure Payment</h5>
                <p>100% secure checkout</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <div className="feature-icon">↩️</div>
                <h5>Easy Returns</h5>
                <p>Simple return process</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h5>24/7 Support</h5>
                <p>We're here to help</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Categories */}
      {/* <section className="categories-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span>EXPLORE</span>
              <h2>Shop by Category</h2>
            </div>

            <Link to="/products">
              View All →
            </Link>
          </div>

          <div className="row g-4">

            <div className="col-md-3">
              <Link to="/products" className="category-card category-fashion">
                <div>
                  <span>01</span>
                  <h3>Fashion</h3>
                  <p>Discover the latest styles</p>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/products" className="category-card category-electronics">
                <div>
                  <span>02</span>
                  <h3>Electronics</h3>
                  <p>Smart products for you</p>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/products" className="category-card category-beauty">
                <div>
                  <span>03</span>
                  <h3>Beauty</h3>
                  <p>Feel confident every day</p>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link to="/products" className="category-card category-lifestyle">
                <div>
                  <span>04</span>
                  <h3>Lifestyle</h3>
                  <p>Upgrade your everyday life</p>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section> */}


      {/* Promo Banner */}
      {/* <section className="promo-section">
        <div className="container">
          <div className="promo-banner">

            <div>
              <span>LIMITED TIME OFFER</span>

              <h2>
                Up to <strong>50% OFF</strong>
              </h2>

              <p>
                Grab your favorite products before the offer ends.
              </p>

              <Link to="/products" className="btn btn-light">
                Shop Deals →
              </Link>
            </div>

            <div className="promo-circle">
              50%
              <small>OFF</small>
            </div>

          </div>
        </div>
      </section> */}


      {/* Why Shop With Us */}
      {/* <section className="why-section">
        <div className="container">

          <div className="section-heading text-center">
            <div>
              <span>WHY US</span>
              <h2>Shopping Made Simple</h2>
            </div>
          </div>

          <div className="row g-4 mt-3">

            <div className="col-md-4">
              <div className="why-card">
                <div>01</div>
                <h4>Quality Products</h4>
                <p>
                  We bring you carefully selected products
                  that combine quality and value.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="why-card">
                <div>02</div>
                <h4>Best Prices</h4>
                <p>
                  Find great products at competitive prices
                  with exciting offers every day.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="why-card">
                <div>03</div>
                <h4>Happy Shopping</h4>
                <p>
                  Enjoy a simple, fast, and convenient
                  shopping experience from anywhere.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section> */}


      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span>READY TO SHOP?</span>

            <h2>
              Find Something
              <br />
              <i>Perfect for You.</i>
            </h2>

            <p>
              Browse our collection and discover products
              you'll love.
            </p>

            <Link to="/products" className="btn btn-light">
              Start Shopping →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Welcome;