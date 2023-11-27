import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Common/Title";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyPet = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: pets = [] } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <Title heading="My Added Pets"></Title>
      <div
        className="overflow-x-auto mt-2"
        style={{ borderRadius: "15px 15px 0px 0px" }}
      >
        <table className="table">
          {/* head */}
          <thead className="bg-[#e7c7b1] text-white">
            <tr>
              <th>#</th>
              <th>Pet Image</th>
              <th>Pet Name</th>
              <th>Category</th>
              <th>Adoption Status</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Adopted</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.petImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <h1>{item.petName}</h1>
                </td>
                <td>{item.petCategory.label}</td>
                <td>{item.adopted === true ? "Adopted" : "Not Adopted"}</td>
                <td className="text-2xl">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td className="text-2xl">
                  <FaRegTrashAlt />
                </td>
                <td>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-error"
                      />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPet;
