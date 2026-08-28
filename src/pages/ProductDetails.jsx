import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${id}`)
  .then(response => {
    console.log(response.data);
    setProduct(response.data)
    }
    )
    .catch((error) => {
        console.log(error);
      });


    },[id])

     if (!product) {
    return <h2>Loading...</h2>;
  }



  return (
  <div className="single-product-page">

  <div className="single-product-card">

    <div className="single-product-image-box">
      <img
        src={product.image}
        alt="Product"
        className="single-product-image"
      />
    </div>

    <div className="single-product-info">

      <span className="single-product-category">
        {product.category}
      </span>

      <h2>{product.title}</h2>

      <p className="single-product-description">
        {product.description}
      </p>

      {/* <div className="single-product-rating">
        ⭐⭐⭐⭐⭐ <span>4.8 / 5</span>
      </div> */}

      <p className="single-product-price">
        {product.price}
      </p>

      <div className="single-product-buttons">
        {/* <button className="single-product-buy">
          Add to Cart
        </button> */}

        <a href="/" className="single-product-back">
          ← Go Back
        </a>
      </div>

    </div>

  </div>
  

</div>
  )
}

export default ProductDetails