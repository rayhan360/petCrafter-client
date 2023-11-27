/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdoptForm = ({ findPets }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const adoptInfo = {
      name,
      email,
      phoneNumber,
      address,
      ownerEmail: findPets.email,
      ownerId: findPets._id,
      petName: findPets.petName
    };

    axiosSecure
      .post("/adopt", adoptInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Adoption Request Has been Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Your already requested to adoption, please wait to owner response",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="userName"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f6425f]"
            defaultValue={user?.displayName}
            disabled
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="block text-gray-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f6425f]"
            defaultValue={user?.email}
            disabled
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f6425f]"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userAddress"
            className="block text-gray-700 font-bold mb-2"
          >
            Address
          </label>
          <textarea
            id="userAddress"
            name="address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f6425f] resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#f6425f] text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdoptForm;
