import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../Layouts/Layouts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/Actions/Cart";
import { BASE_URL } from "../Redux/Constants/BASE_URL";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51R8qBs4QQWLIOTQOZwn0jqUtHHRnnDkeDFMQJ66rPaUhAWVqzb5ZMsu1BBmGALRtQ3wGfVT2EzcbvVTKSUpE9nVB00wGS05iX7"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const { cartItems, totalPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
  };

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United States");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data.map((country) => country.name.common).sort();
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handlePayment = async () => {
    if (!token) {
      toast.error("You must be logged in to proceed with payment.");
      return;
    }
    if (!address || !city) {
      toast.error("Please enter your shipping address.");
      return;
    }
    setLoading(true);

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      qty: item.qty || 1,
      Price: item.Price || item.price,
      product: item.id || item._id,
    }));

    const response = await fetch(`${BASE_URL}/api/Orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderItems,
        shippingAddress: { city, address, country },
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 5,
        totalPrice: totalPrice + 5,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error("Order creation failed!");
      setLoading(false);
      return;
    }

    const clientSecret = data.clientSecret;
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: elements.getElement(CardNumberElement) },
      }
    );

    if (error) {
      toast.error("Payment failed. Try again!");
      setLoading(false);
      return;
    }

    await fetch("http://localhost:3000/api/Orders/confirm-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
    });

    dispatch(clearCart());
    toast.success("Payment successful! Redirecting to home...");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
            <input
              type="text"
              placeholder="Full Address"
              className="w-full border p-2 rounded-md mt-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border p-2 rounded-md mt-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <select
              className="w-full border p-2 rounded-md mt-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <input
              type="email"
              className="w-full border p-2 rounded-md mb-4"
              value={userInfo.email || ""}
              readOnly
            />
            <input
              type="text"
              className="w-full border p-2 rounded-md mb-4"
              value={userInfo.name || ""}
              readOnly
            />
            <CardNumberElement className="w-full border p-2 rounded-md mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <CardExpiryElement className="border p-2 rounded-md" />
              <CardCvcElement className="border p-2 rounded-md" />
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay £${totalPrice}`}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <Layout>
      <CheckoutForm />
    </Layout>
  </Elements>
);

export default Checkout;
