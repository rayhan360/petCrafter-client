import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");

  const {
    data: allPets = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["allPets", search],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/pets?search=${search}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <h1>Loading....</h1>;
  }


  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    refetch();
    setSearch(searchText);
  };

  return (
    <div className="my-7">
      <div className="">
        <form onSubmit={handleSearch} className="my-5">
          <input
            type="text"
            name="search"
            placeholder="Type here"
            className="px-4 py-2 border border-[#f6425f] rounded-md mr-2"
          />
          <input
            type="submit"
            value="Search"
            className="bg-[#f6425f] text-white px-4 py-2 rounded-md hover:border hover:border-[#f6425f]"
          />
        </form>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {allPets.map((pet) => (
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
                      view details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
