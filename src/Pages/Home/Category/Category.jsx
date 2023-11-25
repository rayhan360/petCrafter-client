import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Title from "../../../components/Common/Title";
import { Link } from "react-router-dom";

const Category = () => {
  const axiosPublic = useAxiosPublic();
  const { data: cateegory = [] } = useQuery({
    queryKey: ["petCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  return (
    <div className="my-7">
      <Title
        heading="Our Pet Category"
        subHeading="Find Joy in Every Adoption - Choose Your Ideal Pet Today!"
      ></Title>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
        {cateegory.map((item) => (
          <div key={item._id}>
            <div className="card shadow-xl bg-[#f8c29e]">
              <div className="bg-white w-[90%] mx-auto rounded-md mb-10">
                <figure className="px-10 pt-10">
                  <img
                    src={item.image}
                    alt="Shoes"
                    className="w-36 h-36 rounded-full border-8"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.categoryName}</h2>
                </div>
              </div>
              <div className="flex justify-center mb-10">
                <Link to={`/category/${item.categoryName}`}>
                  <a className="inline-flex items-center font-medium text-[#f6425f] hover:[#f6425f] dark:text-[#f6425f] dark:hover:text-[#f6325f]">
                    see all
                    <svg
                      className="w-2.5 h-2.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
