import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    toast.success(res.data.message);

    localStorage.removeItem("user");

    navigate("/login");
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout Failed");
  }


  return(
    <>


    <button
  onClick={handleLogout}
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  Logout
</button>
    </>
  );
};

export default  HandleLogout;