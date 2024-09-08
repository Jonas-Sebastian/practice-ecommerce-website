import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/ApiService';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await ProductService.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="w-full flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md h-auto object-cover mb-4"
        />
      </div>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl font-bold">${product.price}</p>
    </div>
  );
}
