import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";




const Profile = () => {

const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "https://ecommerceweb-xxb1.onrender.com/api/auth/profile",
          {
            withCredentials: true,
          }
        );
        console.log(res.data); // 👈 Add this

        setUser(res.data.user);

      } catch (error) {

        console.log(error);
        console.log(error.response); // 👈 Add this

      }

    };

    fetchProfile();


  }, []);





  if (!user) {

    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading ....
      </h2>
    );

  }




//logout function handle here

  const handleLogout = async () => {

  try {

    const res = await axios.post(
      "https://ecommerceweb-xxb1.onrender.com/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    toast.success(res.data.message);

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[420px]">

        <div className="flex flex-col items-center">

          <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-8"
                >
                  <FaArrowLeft />
                  Back
                </Link>

        <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
  {user.name.charAt(0).toUpperCase()}
</div>

          <h2 className="text-2xl font-bold mt-5">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        <div className="mt-8 space-y-4">

          {/* <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            My Orders
          </button> */}


          <button onClick={() => navigate("/my-orders")}
           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  My Orders
</button>

          

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
            Addresses
          </button>

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
            Edit Profile
          </button>

          <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
               Logout
           </button>

        </div>

      </div>

    </div>

  );

};

export default Profile;