// import React from 'react'
import { useParams } from "react-router-dom";
  import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export const AddProduct = () => {
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { storeId } = useParams(); 
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      description: "",
      quantity: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/addproduct/${storeId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        if (response.ok) {
          alert("Product added successfully!");
          resetForm();
        } else {
          const errorData = await response.json();
          alert(`Failed to add product: ${errorData.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.log(error);
        
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-accent mt-15">
      <div className="w-full max-w-md bg-sage p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>
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
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

// export default AddProductForm;



