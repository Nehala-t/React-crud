import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useNavigate } from "react-router-dom";


const Products = ({ curruntProducts = [],
  deleteProduct,
  editProduct,
  viewProduct,
  showSellerActions,
  addCart,
  cartQuantities = {} }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const [editErrors, setEditErrors] = useState({});
const [editLoading, setEditLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

 

const handleAddCart = async (productId) => {
  await addCart(productId, 1);
};







  return (
    <div className="product-container" >
      {curruntProducts.map((products) => (
        <div class="card width: 18rem; products-map" key={products._id}>
          <div className='product-image'>
            <img src={`${process.env.BACKEND_URL}${products.image}`}
              alt={products.title} class="card-img-top" />
          </div>
          <div className="card-body product-details">
            <h5 class="card-title">{products.title}</h5>

            <p class="card-text product-description">{products.description}</p>

            <div className="product-bottom">
              <span className="price">
                ₹{products.price}
              </span>

              <div className="product-actions">
                <button class="btn btn-primary text-decoration-none view-btn" onClick={() => {
                  console.log("Selected product:", products._id);

                  viewProduct(products._id);
                }}>VIEW PRODUCT</button>
                {user?.role !== "seller" && (
  cartQuantities[products._id] > 0 ? (
    <button
      type="button"
      className="cart-btn"
      onClick={() => navigate("/cart")}
    >
      Go to Cart
    </button>
  ) : (
    <button
      type="button"
      className="cart-btn"
      onClick={() => handleAddCart(products._id)}
    >
      Add Cart
    </button>
  )
)}
                {user?.role === 'seller' && showSellerActions && (
                  <Link to="#" class="btn btn-primary text-decoration-none edit-btn"
                    onClick={(e) => {
                      e.preventDefault();

                      setSelectedProductId(products._id);
                      console.log(products._id);
                      setSelectedProduct(products);
                      console.log(products, "=======>");
                      setTitle(products.title);
                      setPrice(products.price);
                      setImageURL(products.image);
                      setDescription(products.description);


                      setShowEditModal(true);
                    }}
                  >EDIT</Link>

                )
                }



                {user?.role === 'seller' && showSellerActions && (
                  <Link to="#" class="btn btn-primary text-decoration-none delete-btn" onClick={() => {
                    console.log("Selected product:", products._id);
                    setSelectedProductId(products._id);
                    setShowDeleteModal(true);
                  }}>DELETE</Link>

                )}




              </div>
            </div>
          </div>
        </div>

      ))}
      {/* !-- Button trigger modal  */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block delete-modal-overlay"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog delete-modal-dialog">
            <div className="modal-content delete-modal-content">

              <div className="modal-header delete-modal-header">
                <div className="delete-icon">
                  <span>!</span>
                </div>

                <div>
                  <h5 className="modal-title">Delete Product</h5>
                  <p className="delete-modal-subtitle">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="modal-body delete-modal-body">
                <p>
                  Are you sure you want to delete this product?
                </p>
              </div>

              <div className="modal-footer delete-modal-footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProductId(null);
                  }}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    console.log("Deleting ID:", selectedProductId);

                    deleteProduct(selectedProductId);

                    setShowDeleteModal(false);
                    setSelectedProductId(null);
                  }}
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* !-- edit button modal  */}
     {showEditModal && selectedProduct && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        <form
          className="product-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (editLoading) return;

            const newErrors = {};

            // Title
            if (!title.trim()) {
              newErrors.title = "Product title is required";
            }

            // Price
            if (!price || Number(price) <= 0) {
              newErrors.price = "Price must be greater than 0";
            }

            // Description
            if (!description.trim()) {
              newErrors.description = "Description is required";
            } else if (description.trim().length < 50) {
              newErrors.description =
                "Description must be at least 50 characters";
            } else if (description.trim().length > 500) {
              newErrors.description =
                "Description must not exceed 500 characters";
            }

            setEditErrors(newErrors);

            // Stop if validation fails
            if (Object.keys(newErrors).length > 0) {
              return;
            }

            const updatedProduct = {
              title: title.trim(),
              price: Number(price),
              image: imageURL,
              description: description.trim(),
              category: selectedProduct.category,
            };

            console.log(
              "Sending:",
              selectedProductId,
              updatedProduct
            );

            setEditLoading(true);

            editProduct(
              selectedProductId,
              updatedProduct
            );

            setShowEditModal(false);
            setSelectedProductId(null);
            setSelectedProduct(null);
            setEditErrors({});
          }}
        >

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              Update Product
            </h5>
          </div>


          {/* Body */}
          <div className="modal-body">

            {/* Title */}
            <div className="form-group mb-3">
              <label className="form-label">
                Title
              </label>

              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);

                  if (editErrors.title) {
                    setEditErrors((prev) => ({
                      ...prev,
                      title: "",
                    }));
                  }
                }}
                type="text"
                className="form-control"
                placeholder="Enter product title"
              />

              {editErrors.title && (
                <small className="validation-error">
                  {editErrors.title}
                </small>
              )}
            </div>


            {/* Price */}
            <div className="form-group mb-3">
              <label className="form-label">
                Price
              </label>

              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);

                  if (editErrors.price) {
                    setEditErrors((prev) => ({
                      ...prev,
                      price: "",
                    }));
                  }
                }}
                type="number"
                min="1"
                className="form-control"
                placeholder="Enter product price"
              />

              {editErrors.price && (
                <small className="validation-error">
                  {editErrors.price}
                </small>
              )}
            </div>


            {/* Product Image */}
            <div className="form-group mb-3">
              <label className="form-label">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => {
                  setImageURL(e.target.files[0]);

                  if (editErrors.image) {
                    setEditErrors((prev) => ({
                      ...prev,
                      image: "",
                    }));
                  }
                }}
              />

              <small className="text-muted">
                Leave empty to keep the current image.
              </small>
            </div>


            {/* Description */}
            <div className="form-group mb-3">
              <label
                htmlFor="message-text"
                className="form-label"
              >
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);

                  if (editErrors.description) {
                    setEditErrors((prev) => ({
                      ...prev,
                      description: "",
                    }));
                  }
                }}
                className="form-control"
                id="message-text"
                placeholder="Enter product description"
                rows="4"
                maxLength={500}
              ></textarea>

              {editErrors.description && (
                <small className="validation-error">
                  {editErrors.description}
                </small>
              )}

              <small className="text-muted">
                {description.length}/500
              </small>
            </div>

          </div>


          {/* Footer */}
          <div className="modal-footer">

            <button
              type="button"
              className="btn btn-secondary"
              disabled={editLoading}
              onClick={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
                setSelectedProductId(null);
                setEditErrors({});
              }}
            >
              Close
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={editLoading}
            >
              {editLoading
                ? "Updating Product..."
                : "Update Product"}
            </button>

          </div>

        </form>

      </div>
    </div>
  </div>
)}
    </div>

  )
}

export default Products
// <div className="products-map" key={products.id}>

//   <div className="product-image">
//     <img src={products.image} alt={products.title} />
//   </div>

//   <div className="product-details">
//     <h2>{products.title}</h2>

//     <p>{products.description}</p>

//     <div className="product-bottom">
//       <span className="price">
//         ₹{products.price}
//       </span>

//       <div className="product-actions">
//         <button className="view-btn">
//           VIEW PRODUCT
//         </button>

//         <button className="edit-btn">
//           EDIT
//         </button>

//         <button className="delete-btn">
//           DELETE
//         </button>
//       </div>
//     </div>
//   </div>

// </div>
