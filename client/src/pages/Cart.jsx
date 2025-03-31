import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQty } from "../Redux/Actions/Cart";
import Layout from "../Layouts/Layouts";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cartReducer) || {};
  const { cartItems = [], totalItems = 0, totalPrice = 0 } = cartState;

  // State for modal confirmation
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle remove button click
  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Confirm removal of item
  const confirmRemove = () => {
    if (selectedItem) {
      dispatch(removeFromCart(selectedItem._id));
      toast.error(`${selectedItem.name} removed from cart`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setShowModal(false);
  };

  const incrementQty = (item) => {
    dispatch(updateCartQty(item?._id, item?.qty + 1));
  };

  const decrementQty = (item) => {
    if (item.qty > 1) {
      dispatch(updateCartQty(item?._id, item?.qty - 1));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 sm:p-6 max-w-3xl mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🛒 Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-500 underline">
              Go back
            </Link>
          </p>
        ) : (
          <div className="bg-white p-2 sm:p-6 shadow-lg rounded-lg">
            {cartItems.map((item) => (
              <div
                key={item?._id}
                className="flex justify-between items-center p-2 sm:p-4 border-b last:border-none"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item?.name}</p>
                    <p className="text-gray-600">£{item?.Price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrementQty(item)}
                    className="bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-semibold">
                    {item?.qty}
                  </span>
                  <button
                    onClick={() => incrementQty(item)}
                    className="bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveClick(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6 p-2 sm:p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Total Items: {totalItems}
              </h2>
              <h2 className="text-lg font-bold text-gray-800">
                Total Price: £{totalPrice}
              </h2>
            </div>

            <button
              onClick={() =>
                navigate("/checkout", { state: { cartItems, totalPrice } })
              }
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Styled Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Removal
            </h2>
            <p className="text-gray-600">
              Are you sure you want to remove{" "}
              <strong className="text-red-600">{selectedItem?.name}</strong>{" "}
              from the cart?
            </p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
