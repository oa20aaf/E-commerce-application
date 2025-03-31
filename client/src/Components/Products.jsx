import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";
//import { productListReducer } from "../Redux/Reducers/Product";
import { Link } from "react-router-dom";
import { Preloader } from "./Preloader";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  //  const { loading, error, products }= useSelector(state => state.productListReducer);

  const { loading, page, totalPages, error, products } = productListReducer;
  console.log(loading);

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
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {products?.map((product) => (
                  <div className="p-4 lg:w-1/4 md:w-1/2" key={product._id}>
                    <div className="bg-white">
                      <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                          <div className="group relative">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                              <img
                                src={product.image}
                                alt="Front of men's Basic Tee in black."
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <Link to={`/products/${product._id}`}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    ></span>
                                    {product.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Review count: {product.numReview}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                £{product.Price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
