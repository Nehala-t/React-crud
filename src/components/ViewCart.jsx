import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api";

const ViewCart = () => {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's cart
  const fetchCart = async () => {
    try {
      const response = await api.get("/viewCart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log("Cart response:", response.data);

      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, [user, authLoading, navigate]);

  // Increase / decrease quantity
 const updateQuantity = async (productId, newQuantity) => {
  if (newQuantity < 1) {
    return;
  }

  try {
    const response = await api.post(
      "/addCart",
      {
        productId: productId,
        quantity: newQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId?._id === productId
          ? {
              ...item,
              quantity: response.data.data.quantity,
            }
          : item
      )
    );
  } catch (error) {
    console.error("Quantity update error:", error);
    toast.error("Failed to update quantity");
  }
};

  // Remove one product
  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(`/removeCart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      toast.success(response.data.message || "Product removed successfully");

      fetchCart();
    } catch (error) {
      console.error("Remove cart error:", error);
      toast.error("Failed to remove product");
    }
  };

  // Clear complete cart
  const clearCart = async () => {
    if (cartItems.length === 0) {
      toast.info("Cart is already empty");
      return;
    }

    try {
      const response = await api.delete("/clearCart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      toast.success(
        response.data.message || "Cart cleared successfully"
      );

      fetchCart();
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to clear cart");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="cart-loading">
        <div className="spinner-border" role="status"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return (
      total +
      (item.productId?.price || 0) * item.quantity
    );
  }, 0);

  return (
    <div className="cart-page">

      <ToastContainer />

      <div className="container">

        {/* Header */}
        <div className="cart-header">

          <div>
            <h2>My Cart</h2>
            <p>
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "product" : "products"} in your cart
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          )}

        </div>

        {/* Empty cart */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>Your cart is empty</h3>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/product")}
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <>

            {/* Products */}
            <div className="cart-list">

              {cartItems.map((item) => {

                const product = item.productId;

                const subtotal =
                  (product?.price || 0) * item.quantity;

                return (
                  <div
                    className="cart-product"
                    key={item._id}
                  >

                    {/* Image */}
                    <div className="cart-image-wrapper">

                      <img
                        src={`http://localhost:5000${product?.image}`}
                        alt={product?.title}
                        className="cart-product-image"
                      />

                    </div>

                    {/* Product information */}
                    <div className="cart-product-info">

                      <h3>
                        {product?.title}
                      </h3>

                      <p className="cart-product-description">
                        {product?.description}
                      </p>

                      <p className="cart-price">
                        ₹{product?.price}
                      </p>

                      {/* Quantity */}
                      <div className="quantity-row">

                        <span className="quantity-label">
                          Quantity
                        </span>

                        <div className="quantity-control">

                          

                          <button
  type="button"
  onClick={() =>
    updateQuantity(
      item.productId._id,
      item.quantity - 1
    )
  }
  disabled={item.quantity <= 1}
>
  −
</button>

<span>{item.quantity}</span>

<button
  type="button"
  onClick={() =>
    updateQuantity(
      item.productId._id,
      item.quantity + 1
    )
  }
>
  +
</button>

                        </div>

                      </div>

                    </div>

                    {/* Right section */}
                    <div className="cart-product-right">

                      <p className="subtotal-label">
                        Subtotal
                      </p>

                      <h4>
                        ₹{subtotal}
                      </h4>

                      <button
                        className="remove-cart-btn"
                        onClick={() =>
                          removeFromCart(product?._id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Total */}
            <div className="cart-summary">

              <div>
                <span>Total</span>
                <h2>₹{totalPrice}</h2>
              </div>

              <button
                className="checkout-btn"
                onClick={() => toast.info("Checkout coming soon")}
              >
                Proceed to Checkout
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
};

export default ViewCart;