import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AdoptForm from "./AdoptForm";

const PetDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: allPets = [], isPending } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pets`);
      return res.data;
    },
  });

  if (isPending) {
    return <h1>Loading......</h1>;
  }
  const findPets = allPets.find((detail) => detail._id === id);
  const {
    petImage,
    petName,
    petAge,
    petLocation,
    shortDescription,
    longDescription,
  } = findPets;

  console.log(findPets.petCategory.label);

  return (
    <div>
      <div className="bg-gray-100 py-8 my-5">
        <div className="container mx-auto p-4">
          <div className="max-w-4xl mx-auto bg-white rounded-md overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={petImage}
                  alt={petName}
                  className="w-full h-full rounded-md shadow-lg"
                />
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{petName}</h1>
                <p className="text-gray-600 mb-2">
                  Location: {petLocation} | Age: {petAge} | Category:{" "}
                  {findPets.petCategory.label}
                </p>
                <p className="text-gray-700 mb-4">{shortDescription}</p>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-800">{longDescription}</p>
                <div>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="bg-[#f6425f] text-white px-5 py-2 rounded-md mt-3 hover:border hover:border-[#f6425f] w-full"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Adopt
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      {/* form */}
                      <AdoptForm findPets={findPets}></AdoptForm>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
