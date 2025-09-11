import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

const LoginForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState(null);        

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email, password: values.password }),
        });

        if (response.ok) {
          const data = await response.json();
          Cookies.set("token", data.token, { expires: 1 });
          window.location.href = "/";
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Login failed");
        }
      } catch (err) {
        console.log(err)
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen text-accent">
      <div className="w-full max-w-md bg-sage p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
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
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
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
              <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-emerald-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
