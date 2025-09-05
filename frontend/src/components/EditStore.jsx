import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export const EditStore = () => {
    const Navigate = useNavigate();
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchStore() {
      try {
        const response = await fetch(`${API_BASE_URL}/stores/${storeId}`);
        if (response.ok) {
          const data = await response.json();
          setStore(data);
        } else {
          console.error("Failed to fetch store details");
        }
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    }
    fetchStore();
  }, [storeId]);

  const validationSchema = Yup.object({
    storeName: Yup.string().min(3).max(200).required("Store name is required"),
    storeLocation: Yup.string().required("Store location is required"),
    ownerName: Yup.string().required("Owner name is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      storeName: store?.storeName || "",
      storeLocation: store?.storeLocation || "",
      ownerName: store?.ownerName || "",
      contactNumber: store?.contactNumber || "",
      address: store?.address || "",
      city: store?.city || "",
      country: store?.country || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/editstores/${storeId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        if (response.ok) {
          alert("Store updated successfully!");
          Navigate('/dashboard');
        } else {
          const errorData = await response.json();
          alert(`Update failed: ${errorData.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error("Error updating store:", error);
      }
      setSubmitting(false);
    },
  });

  if (!store) {
    return <div className="text-center mt-10 text-xl">Loading store...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-accent mt-20">
      <div className="w-full max-w-md bg-sage p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Store</h1>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.storeName}
            />
            {formik.touched.storeName && formik.errors.storeName && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.storeName}</p>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.storeLocation}
            />
            {formik.touched.storeLocation && formik.errors.storeLocation && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.storeLocation}</p>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ownerName}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.ownerName}</p>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.contactNumber}</p>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.address}</p>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.city}</p>
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
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.country}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition"
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Store"}
          </button>
        </form>
      </div>
    </div>
  );
};
