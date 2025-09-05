// import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
export const EditProduct = () => {
    const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${API_BASE_URL}/getproduct/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    fetchProduct();
  }, [productId]);

  const validationSchema = Yup.object({
    productName: Yup.string()
      .min(1, "Product name must not be empty")
      .max(200, "Product name must be at most 200 characters")
      .required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .min(0, "Price must be at least 0")
      .required("Price is required"),
    description: Yup.string().max(1000, "Description max 1000 characters"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .min(0, "Quantity cannot be negative")
      .required("Quantity is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: product?.productName || "",
      price: product?.price || "",
      description: product?.description || "",
      quantity: product?.quantity || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/editproduct/${productId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        if (response.ok) {
          alert("Product updated successfully!");
            navigate(-1); // Navigate back to the previous page
        } else {
          const errorData = await response.json();
          alert(`Update failed: ${errorData.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("An error occurred. Please try again.");
      }
      setSubmitting(false);
    },
  });

  if (!product) {
    return <div className="text-center mt-10 text-xl">Loading product...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-accent">
      <div className="w-full max-w-md bg-sage p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Product</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="flex flex-col">
            <label htmlFor="productName" className="font-medium mb-1">
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productName}
            />
            {formik.touched.productName && formik.errors.productName && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.productName}
              </p>
            )}
          </div>
          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.price}</p>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              maxLength={1000}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>
          {/* Quantity */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-medium mb-1">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.quantity}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};
