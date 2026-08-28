import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Products = ({ curruntProducts, deleteProduct,editProduct, viewProduct }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");

  //   const prod = [
  //   {
  //     id: 1,
  //     title: "Fjallraven - Foldsack No. 1 Backpack",
  //     description:
  //       "Your perfect pack for everyday use and walks in the forest. Fits laptops up to 15 inches.",
  //     price: 109.95,
  //     category: "men's clothing",
  //     image: "/images/backbag.jpg"
  //   },
  //   {
  //     id: 2,
  //     title: "Mens Casual Premium Slim Fit T-Shirts",
  //     description:
  //       "Slim-fitting style, contrast raglan long sleeve, three-button henley placket and soft comfortable fabric.",
  //     price: 22.3,
  //     category: "men's clothing",
  //     image: "/images/t-shirt.jpeg"
  //   },
  //   {
  //     id: 3,
  //     title: "Mens Cotton Jacket",
  //     description:
  //       "Great outerwear jackets for spring, autumn and winter, suitable for many occasions and everyday wear.",
  //     price: 55.99,
  //     category: "men's clothing",
  //     image: "/images/mens-jacket.jpeg"
  //   },
  //   {
  //     id: 4,
  //     title: "Mens Casual Slim Fit",
  //     description:
  //       "The color could be slightly different from the picture because of different monitor settings.",
  //     price: 15.99,
  //     category: "men's clothing",
  //     image: "images/slim-fit.jpeg"
  //   },
  //   {
  //     id: 5,
  //     title: "John Hardy Women's Legends Naga Gold",
  //     description:
  //       "From our Legends Collection, this beautiful bracelet features a naga inspired design.",
  //     price: 695,
  //     category: "jewelery",
  //     image: "/images/bangle.jpeg"
  //   }
  // ];
  // const [prod , setProd] = useState([]);
  // useEffect (()=>{
  // axios.get('https://fakestoreapi.com/products')
  //   .then(response => setProd(response.data));
  // },[])


  return (
    <div className="product-container" >
      {curruntProducts.map((products) => (
        <div  class="card width: 18rem; products-map" key={products.id}>
          <div className='product-image'>
            <img src={products.image || "/images/placeholder.png"} alt={products.title} class="card-img-top" />
          </div>
          <div className="card-body product-details">
            <h5 class="card-title">{products.title}</h5>

            <p class="card-text">{products.description}</p>

            <div className="product-bottom">
              <span className="price">
                ₹{products.price}
              </span>

              <div className="product-actions">
                <button class="btn btn-primary text-decoration-none view-btn" onClick={() => {
                  console.log("Selected product:", products.id);
                  
                 viewProduct(products.id);
                }}>VIEW PRODUCT</button>
                <Link to="#" class="btn btn-primary text-decoration-none edit-btn"
                 onClick={(e) => {
  e.preventDefault();

  setSelectedProductId(products.id);
  console.log(products.id);
  setSelectedProduct(products); 
  console.log(products,"=======>");
  setTitle(products.title);
  setPrice(products.price);
  setImageURL(products.image);
  setDescription(products.description);
  

  setShowEditModal(true);
}}
                >EDIT</Link>

               


                <Link to="#" class="btn btn-primary text-decoration-none delete-btn" onClick={() => {
                  console.log("Selected product:", products.id);
                  setSelectedProductId(products.id);
                  setShowDeleteModal(true);
                }}>DELETE</Link>
               

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
                 {showEditModal && selectedProduct &&(
                  <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">

                        <form className="product-form"   onSubmit={(e) => {
    e.preventDefault();

    const updatedProduct = {
      title: title,
      price: Number(price),
      image: imageURL,
      description: description,
    };

    console.log("Sending:", selectedProductId, updatedProduct);

    editProduct(selectedProductId, updatedProduct);

    setShowEditModal(false);
    setSelectedProductId(null);
    setSelectedProduct(null);
  }}>

                          {/* Header */}
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Update Product
                            </h5>

                            {/* <button
            type="button"
            className="btn-close"
            onClick={() => setShowForm(false)}
          ></button> */}
                          </div>

                          {/* Body */}
                          <div className="modal-body">

                            <div className="form-group mb-3">
                              <label className="form-label">
                                Title
                              </label>

                              <input
                              value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter product title"
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label className="form-label">
                                Price
                              </label>

                              <input
                              value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                className="form-control"
                                placeholder="Enter product price"
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label className="form-label">
                                Image URL
                              </label>

                              <input
                              value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter product image URL"
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label
                                htmlFor="message-text"
                                className="form-label"
                              >
                                Description
                              </label>

                              <textarea
                              value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                id="message-text"
                                placeholder="Enter product description"
                                rows="4"
                              ></textarea>
                            </div>

                          </div>

                          {/* Footer */}
                          <div className="modal-footer">

                            <button
                              type="button"
                              className="btn btn-secondary"
                            onClick={() => {
                              setShowEditModal(false);
                              setSelectedProduct(null);
                            }
                            }
                            >
                              Close
                            </button>

                            <button
                              type="submit"
                              className="btn btn-primary"
                              
                            >
                              Update Product
                            </button>

                          </div>

                        </form>

                      </div>
                    </div>
                  </div>
                )
                }
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
