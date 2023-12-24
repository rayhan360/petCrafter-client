import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Common/Loading";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["allPets", search, selectCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axiosPublic.get(`/pets?search=${search}&page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return null;
      }
      return lastPage[lastPage.length - 1]._id;
    }
  });

  const categories = ["Cats", "Dogs", "Rabbits", "Birds"];

  const filteredPets = selectCategory
    ? data?.pages.flatMap((page) => page.filter((pet) => pet.petCategory.label === selectCategory))
    : data?.pages.flatMap((page) => page);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  return (
    <div className="my-7 mx-2 sm:mx-4 md:mx-8 lg:mx-16 lg:mt-24">
      <div className="">
        <form onSubmit={handleSearch} className="my-5">
          <input
            type="text"
            name="search"
            placeholder="Type here"
            className="px-4 py-2 border border-[#f6425f] rounded-md md:mr-2"
          />
          <select
            name="category"
            className="px-4 py-2 border border-[#f6425f] rounded-md md:mr-2"
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Search"
            className="bg-[#f6425f] text-white px-4 py-2 rounded-md hover:border hover:border-[#f6425f]"
          />
        </form>
      </div>
      <InfiniteScroll
        dataLength={filteredPets ? filteredPets.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Loading></Loading>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPets?.map((pet) => (
            <div key={pet._id}>
              <div className="card w-full sm:w-80 h-96 bg-base-100 shadow-xl">
                <figure className="px-5 sm:px-10 pt-5 sm:pt-10">
                  <img
                    src={pet.petImage}
                    alt={pet.petName}
                    className="rounded-xl max-w-full h-auto"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-xl sm:text-2xl md:text-2xl lg:text-3xl">
                    {pet.petName}
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg">
                    Age: {pet.petAge}
                  </p>
                  <p className="text-sm md:text-base lg:text-lg">
                    Location: {pet.petLocation}
                  </p>
                  <div className="card-actions mt-2">
                    <Link to={`/petDetails/${pet._id}`}>
                      <button className="bg-[#f6425f] text-white px-4 sm:px-5 py-2 rounded-md ml-3 hover:border hover:border-[#f6425f]">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PetListing;


