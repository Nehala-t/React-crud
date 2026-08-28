import React, { useState, useEffect } from "react";
import Products from "./Products";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const AllProducts = () => {

  
  const navigate = useNavigate();
  const {user} = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [prod, setProd] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  

  


  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProd(response.data));
  }, [])

  // useEffect(() =>{

  // })

    useEffect(()=>{  
      console.log(user,'---');
        
    if(!user){
      navigate('/login')
    }
  })


  const addProduct = (e) => {
    e.preventDefault();

    const product = {
      title: title,
      price: Number(price),
      image: imageURL,
      description: description,
    };

    console.log("=========>", product);

    axios
      .post("https://fakestoreapi.com/products", product)
      .then((response) => {
        console.log("Product added:", response.data);

        setProd((prevProducts) => [
          ...prevProducts,
          response.data
        ]);

        toast.success("Added successfully!");

        setShowForm(false);
        setTitle("");
        setPrice("");
        setImageURL("");
        setDescription("");
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error("Failed to add product!");
      });
  };

  const deleteProduct = (id)=>{
    console.log("Product ID:", id);
  axios
    .delete(`https://fakestoreapi.com/products/${id}`)
    .then((response) => {
      console.log("Deleted:", response.data);
      toast.success("deleted successfully!");
      setProd((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    })
    .catch((error) => {
      toast.error("Failed to delete product!");
      console.log("Status:", error.response?.status);
    });
  }

  const editProduct = (id,product)=> {
    console.log(id);
    console.log("Product:", product);
   

axios.put(`https://fakestoreapi.com/products/${id}`, product)
  .then(response => {
    console.log(response.data);
    toast.success("update product successfully");
       setProd((prevProducts) =>
  prevProducts.map((item) =>
    item.id === id
      ? { ...item, ...product }
      : item
  )
);
   
  })
   .catch((error) => {
    toast.error("Failed to update product!");
      console.log(error);

    });
  }

  const viewProduct = (id) =>{
    navigate(`/productdetails/${id}`)
  }


  const totalPages = Math.ceil(prod.length / productsPerPage);

  const indexOfLastProduct = currentPage* productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const curruntProducts = prod.slice(
    indexOfFirstProduct,indexOfLastProduct);


  


  return (
    <div className="products">
      <ToastContainer />

      <h1>All Products</h1>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
      >
        ADD PRODUCTS
      </button>

      <Products curruntProducts={curruntProducts} deleteProduct={deleteProduct} editProduct={editProduct} viewProduct={viewProduct} />

      {showForm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <form className="product-form" onSubmit={addProduct}>

                {/* Header */}
                <div className="modal-header">
                  <h5 className="modal-title">
                    Add Product
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
                    onClick={() => setShowForm(false)}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Product
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      )}
    <nav aria-label="Product pagination">
  <ul class="pagination">

    <li class={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <a   className="page-link"
  onClick={() => setCurrentPage(currentPage - 1)}
  disabled={currentPage === 1}
>
        Previous
      </a>
    </li>

    {/* Page numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <li
        key={index + 1}
        className={`page-item ${
          currentPage === index + 1 ? "active" : ""
        }`}
      >
        <button
          className="page-link"
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}

     <li
      className={`page-item ${
        currentPage === totalPages ? "disabled" : ""
      }`}
    >
      <button
        className="page-link"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      </li>

  </ul>
</nav>
    </div>
  );
};

export default AllProducts;