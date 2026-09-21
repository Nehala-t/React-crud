import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth";
import api from "../api";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "seller") {
        navigate("/sellerDashBoard");
      } else {
        navigate("/product");
      }
    }
  }, [user, navigate]);

  // Validate fields while typing
  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName") {
      if (
        value.trim() &&
        !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value.trim())
      ) {
        error = "First name should contain only letters";
      }
    }

    if (name === "lastName") {
      if (
        value.trim() &&
        !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value.trim())
      ) {
        error = "Last name should contain only letters";
      }
    }

    if (name === "email") {
      if (
        value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ) {
        error = "Please enter a valid email address";
      }
    }

    if (name === "password") {
      if (value.length > 0) {
        if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least 1 capital letter";
        } else if (
          !/[!@#$%^&*(),.?":{}|<>_\-\\[\]~`+=;/'`]/.test(value)
        ) {
          error = "Password must contain at least 1 special character";
        }
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // First name
    if (!firstName.trim()) {
      newErrors.firstName = "Please enter your first name";
    } else if (
      !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(firstName.trim())
    ) {
      newErrors.firstName = "First name should contain only letters";
    }

    // Last name
    if (!lastName.trim()) {
      newErrors.lastName = "Please enter your last name";
    } else if (
      !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(lastName.trim())
    ) {
      newErrors.lastName = "Last name should contain only letters";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!password) {
      newErrors.password = "Please enter your password";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least 1 capital letter";
    } else if (
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\]~`+=;/'`]/.test(password)
    ) {
      newErrors.password =
        "Password must contain at least 1 special character";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/register", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        role: role || "user",
      });

      console.log("STATUS:", response.status);
      console.log("BACKEND RESPONSE:", response.data);

      const data = response.data;
      const userData = data.data;

      toast.success("Account created successfully!");

      // Save user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(userData)
      );

      // Save token
      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      // Update AuthContext
      setUser(userData);

      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("");
      setErrors({});

    } catch (error) {
      console.error("Signup error:", error);

      console.error(
        "Backend error:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1 className="signup-heading">
          Sign up
        </h1>

        {/* First Name */}
        <div className="mb-3">
          <label
            htmlFor="firstName"
            className="form-label"
          >
            First Name
          </label>

          <input
            type="text"
            id="firstName"
            className={`form-control ${
              errors.firstName ? "is-invalid" : ""
            }`}
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateField(
                "firstName",
                e.target.value
              );
            }}
          />

          {errors.firstName && (
            <div className="validation-error">
              {errors.firstName}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label
            htmlFor="lastName"
            className="form-label"
          >
            Last Name
          </label>

          <input
            type="text"
            id="lastName"
            className={`form-control ${
              errors.lastName ? "is-invalid" : ""
            }`}
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateField(
                "lastName",
                e.target.value
              );
            }}
          />

          {errors.lastName && (
            <div className="validation-error">
              {errors.lastName}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            autoComplete="email"
            className={`form-control ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField(
                "email",
                e.target.value
              );
            }}
          />

          {errors.email && (
            <div className="validation-error">
              {errors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className={`form-control ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField(
                "password",
                e.target.value
              );
            }}
          />

          {errors.password && (
            <div className="validation-error">
              {errors.password}
            </div>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="form-label">
            Create account as
          </label>

          <div className="role-options">

            {/* Customer */}
            <button
              type="button"
              className={`role-card ${
                role === "user" ? "active" : ""
              }`}
              onClick={() => setRole("user")}
            >
              <div className="role-icon">
                👤
              </div>

              <div>
                <h6>Customer</h6>
                <p>
                  Browse and purchase products
                </p>
              </div>

              <div className="role-check">
                {role === "user" ? "✓" : ""}
              </div>
            </button>

            {/* Seller */}
            <button
              type="button"
              className={`role-card ${
                role === "seller" ? "active" : ""
              }`}
              onClick={() => setRole("seller")}
            >
              <div className="role-icon">
                🏪
              </div>

              <div>
                <h6>Seller</h6>
                <p>
                  Sell and manage your products
                </p>
              </div>

              <div className="role-check">
                {role === "seller" ? "✓" : ""}
              </div>
            </button>

          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Create Account"}
        </button>

        {/* Login */}
        <div className="signup-login-link">
          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;