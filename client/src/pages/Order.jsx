import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layouts";
import axios from "axios";
import { BASE_URL } from "../Redux/Constants/BASE_URL";
import { FaEye } from "react-icons/fa";
import { Preloader } from "../Components/Preloader";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (loading) return <Preloader />;

  return (
    <Layout>
      <div className="container mx-auto mt-16 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Orders</h2>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 overflow-x-auto">
          <table className="w-full border-collapse text-gray-700 min-w-max">
            <thead>
              <tr className="bg-gray-200 text-left uppercase text-sm">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Time</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 break-words max-w-xs">
                      {order.paymentIntentId}
                    </td>
                    <td className="p-4 font-semibold">
                      ${order.totalPrice.toFixed(2)} USD
                    </td>
                    <td className="p-4 flex items-center text-green-500 font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Paid
                    </td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                      >
                        <FaEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <p>
                <strong>Transaction ID:</strong> {selectedOrder.paymentIntentId}
              </p>
              <p>
                <strong>Product:</strong> {selectedOrder.orderItems[0].name}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedOrder.orderItems[0].qty}
              </p>
              <p>
                <strong>Total Price:</strong> ${selectedOrder.totalPrice} USD
              </p>
              <p>
                <strong>Shipping Address:</strong>{" "}
                {selectedOrder.shippingAddress.address},{" "}
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.country}
              </p>
              <p>
                <strong>Paid At:</strong>{" "}
                {new Date(selectedOrder.paidAt).toLocaleString()}
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Order;
