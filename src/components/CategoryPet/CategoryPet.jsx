import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Common/Loading";

const CategoryPet = () => {
  const { categoryName } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: categoryPets = [], isPending } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pets`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading></Loading>;
  }

  const filterData = categoryPets.filter(
    (item) => item.petCategory.label === categoryName
  );

  return (
    <div className="grid md:grid-cols-3 gap-3 my-5">
      {filterData.length === 0 ? (
        <p className="text-red-500">No Data Available</p>
      ) : (
        filterData.map((pet) => (
          <div key={pet._id}>
            <div className="card w-80 h-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={pet.petImage}
                  alt={pet.petName}
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{pet.petName}</h2>
                <p>Age: {pet.petAge}</p>
                <p>Location: {pet.petLocation}</p>
                <div className="card-actions mt-2">
                  <Link to={`/petDetails/${pet._id}`}>
                    <button className="bg-[#f6425f] text-white px-5 py-2 rounded-md ml-3 hover:border hover:border-[#f6425f]">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryPet;
