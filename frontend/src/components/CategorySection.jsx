import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategorySection = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetchCategories();

  }, []);

  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/categories"
      );

      setCategories(res.data.categories);

    } catch (error) {

      console.log(error);

    }

  };

  return (

   
    <section className="max-w-7xl mx-auto py-16 px-5">

      <h2 className="text-4xl font-bold text-center mb-10">
        Shop By Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {categories.map((category) => (
    <div
      key={category._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="overflow-hidden">
        <img
          src={`https://ecommerceweb-xxb1.onrender.com/uploads/category-images/${category.image}`}
          alt={category.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-bold">{category.name}</h3>

        <p className="text-gray-800 mt-2">
         {category.description.length > 100 ? category.description.substring(0, 100) + "..." : category.description}
        </p>

        <Link
        to={`/category/${category._id}`}
        className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                  Shop Now
       </Link>
      </div>
    </div>
  ))}
</div>
     

    </section>
    

  );

};


export default CategorySection;