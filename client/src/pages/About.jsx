import Layout from "../Layouts/Layouts";

const About = () => {
  return (
    <Layout>
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto mt-20 space-y-16">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-800">
              About Afro Shop
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Afro Shop is dedicated to bringing you the best products with
              top-notch service. We believe in quality and customer
              satisfaction.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="bg-yellow-50 p-0 rounded-2xl shadow-md overflow-hidden border border-yellow-200">
              <img
                src="https://img.freepik.com/free-vector/product-presentation-concept-illustration_114360-8116.jpg?t=st=1743913160~exp=1743916760~hmac=384fc0054cd96398c613f6e3aa98a743656ed4e6526565863e7c21c299874868&w=996"
                alt="Afro Shop Culture"
                className="w-full object-contain rounded-t-2xl"
              />

              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-yellow-900">
                  Our Mission
                </h3>
                <p className="text-gray-800">
                  At Afro Shop, we aim to deliver high-quality products and
                  exceptional customer service. We are committed to making your
                  shopping experience enjoyable and memorable. Our mission is to
                  empower customers by providing unique and valuable products at
                  affordable prices.
                </p>
              </div>
            </div>

            {/* Text Section */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-yellow-100">
              <h3 className="text-2xl font-semibold text-yellow-900 mb-6">
                Who We Are
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Afro Shop is a team of passionate individuals who believe in
                bringing African-inspired products to the world. We focus on
                sustainable practices and curate a selection of items that
                celebrate the beauty and culture of Africa. From fashion to art,
                we’re here to help you express yourself.
              </p>

              <p className="text-lg text-gray-600 mb-4">
                Whether you’re looking for a unique gift, a stylish accessory,
                or home décor, Afro Shop offers something special for everyone.
                We take pride in offering a wide range of products made by
                talented artisans and creators.
              </p>

              <h3 className="text-2xl font-semibold text-yellow-900 mb-6">
                Our Values
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>
                  <strong>Quality</strong> - We prioritize delivering the best
                  products to our customers.
                </li>
                <li>
                  <strong>Sustainability</strong> - We are committed to ethical
                  sourcing and sustainability.
                </li>
                <li>
                  <strong>Customer-Centric</strong> - Our customers’
                  satisfaction is at the heart of everything we do.
                </li>
                <li>
                  <strong>Creativity</strong> - We celebrate creativity and
                  support local artisans and creators.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
