import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../Layouts/Layouts";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );

      // Show success notification
      toast.success("Message sent successfully!");

      // Clear form data
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Show error notification
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto mt-20 space-y-16">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-800">
              Contact Afro Shop
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Got questions or feedback? We’d love to hear from you. Reach out
              and we’ll respond within 24 hours.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-yellow-50 p-0 rounded-2xl shadow-md overflow-hidden border border-yellow-200">
              <img
                src="https://img.freepik.com/free-vector/virtual-assistant-concept-illustration_114360-25576.jpg"
                alt="Afro Shop Culture"
                className="w-full object-contain rounded-t-2xl"
              />

              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-yellow-900">
                  Our Info
                </h3>
                <div className="space-y-4 text-gray-800">
                  <div>
                    <p className="font-medium text-yellow-800">Phone:</p>
                    <p>+453 4584 7431 324</p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Email:</p>
                    <p>support@afroshop.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Address:</p>
                    <p>22 Baker Street, London</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-yellow-100">
              <h3 className="text-2xl font-semibold text-yellow-900 mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-3 border border-yellow-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-3 border border-yellow-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                    placeholder="Email"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="px-4 py-3 border border-yellow-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                  placeholder="Subject"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="px-4 py-3 border border-yellow-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
                  placeholder="Your Message"
                  required
                ></textarea>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-md transition shadow-sm"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
