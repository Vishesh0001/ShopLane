import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Full name must be at least 3 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: values.fullName,
            email: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Signup successful:", data);
          Cookies.set("token", data.token, { expires: 1, path: "/" }); // Expires in 1 day
          alert("Signup successful!");
          window.location.href = "/";
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Signup failed");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setError("An error occurred during signup. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-base text-accent">
      <div className="w-full max-w-md bg-sage p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="font-medium mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none pr-10"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <label htmlFor="confirmPassword" className="font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="bg-base text-blue-950 p-2 border-2 border-accent rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none pr-10"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
