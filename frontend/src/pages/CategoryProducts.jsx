import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/category/${categoryId}`
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h2 className="text-3xl font-bold mb-8">
        Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition"
          >

            <img
              src={`http://localhost:5000/uploads/product-images/${product.images[0]}`}
              alt={product.name}
              className="w-full h-60 object-fit rounded-t-xl"
            />

            <div className="p-4">

              <h3 className="text-xl font-bold">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {product.category.name}
              </p>

              <p className="text-blue-600 font-bold text-2xl mt-3">
                ₹ {product.price}
              </p>
{/* 
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg">
                View Details
              </button> */}
              <Link
  to={`/product/${product._id}`}
  className="block w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition"
>
  View Details
</Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default CategoryProducts;