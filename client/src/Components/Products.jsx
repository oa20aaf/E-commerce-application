import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";
import { Link } from "react-router-dom";
import { Preloader } from "./Preloader";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);

  const { loading, error, products } = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <section className="text-gray-600 body-font">
            {/* Matches navbar width */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="flex flex-wrap gap-y-10 gap-x-6 justify-center">
                {products?.map((product) => (
                  <Link
                    to={`/products/${product._id}`}
                    key={product._id}
                    className="w-full sm:w-[95%] md:w-[45%] lg:w-[280px] h-[420px] bg-white shadow-md rounded-md p-5 flex flex-col justify-between cursor-pointer transform transition duration-300 hover:scale-105"
                  >
                    {/* Image Container (Ensures proper resizing) */}
                    <div className="w-full h-[250px] flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="mt-4 flex flex-col">
                      <h3 className="text-base font-semibold text-gray-700">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Review count: {product.numReview}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        £{product.Price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Products;
