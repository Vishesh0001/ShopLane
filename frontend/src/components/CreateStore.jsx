import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateStoreForm = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [submitting, setSubmitting] = useState(false);
const token = Cookies.get("token");
if (!token) {
  navigate("/login");
}
  const formik = useFormik({
    initialValues: {
      storeName: "",
      storeLocation: "",
      ownerName: "",
      contactNumber: "",
      address: "",
      city: "",
      country: "",
    },
    validationSchema: Yup.object({
      storeName: Yup.string()
        .min(3, "Store name must be at least 3 characters")
        .required("Store name is required"),
      storeLocation: Yup.string().required("Store location is required"),
      ownerName: Yup.string().required("Owner name is required"),
      contactNumber: Yup.string()
        .matches(/^\d+$/, "Contact number must be digits only")
        .min(8, "Contact number must be at least 8 digits")
        .max(15, "Contact number can't exceed 15 digits")
        .required("Contact number is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await fetch(`${API_BASE_URL}/create-store`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',token:token },
          body: JSON.stringify(values),
        });
        if (response.ok) {
     
     
          alert('Store created successfully!');
          navigate('/dashboard');
        } else {
          const errorData = await response.json();
          alert(`Store creation failed: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error during store creation:', error);
        alert('An error occurred during store creation. Please try again later.');
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-accent mt-20">
      <div className="w-full max-w-md bg-sage p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create Store</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Store Name */}
          <div className="flex flex-col">
            <label htmlFor="storeName" className="font-medium mb-1">
              Store Name
            </label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.storeName}
            />
            {formik.touched.storeName && formik.errors.storeName && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.storeName}
              </p>
            )}
          </div>
          {/* Store Location */}
          <div className="flex flex-col">
            <label htmlFor="storeLocation" className="font-medium mb-1">
              Store Location
            </label>
            <input
              id="storeLocation"
              name="storeLocation"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.storeLocation}
            />
            {formik.touched.storeLocation && formik.errors.storeLocation && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.storeLocation}
              </p>
            )}
          </div>
          {/* Owner Name */}
          <div className="flex flex-col">
            <label htmlFor="ownerName" className="font-medium mb-1">
              Owner Name
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ownerName}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.ownerName}
              </p>
            )}
          </div>
          {/* Contact Number */}
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="font-medium mb-1">
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.contactNumber}
              </p>
            )}
          </div>
          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.address}
              </p>
            )}
          </div>
          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="font-medium mb-1">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.city}
              </p>
            )}
          </div>
          {/* Country */}
          <div className="flex flex-col">
            <label htmlFor="country" className="font-medium mb-1">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.country}
              </p>
            )}
          </div>
          {/* Create Store Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Create Store"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStoreForm;
