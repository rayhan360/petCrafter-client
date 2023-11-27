import { useFormik } from "formik";
import axios from "axios";
import { CloudinaryContext, Image } from "cloudinary-react";
import { FaExclamationCircle } from "react-icons/fa";
import Title from "../../../components/Common/Title";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const initialValues = {
  petImage: null,
  maximumAmount: "",
  lastDateOfDonation: "",
  shortDescription: "",
  longDescription: "",
};
const CreateDonation = () => {
  const { user } = useAuth();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        // Use Cloudinary API to upload the image
        const imageData = new FormData();
        imageData.append("file", values.petImage);
        imageData.append("upload_preset", "petdemoapp");
        imageData.append("cloud_name", "drcttfagw");

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/drcttfagw/image/upload`,
          imageData
        );

        const petData = {
          ...values,
          petImage: cloudinaryResponse.data.secure_url,
          addedDate: new Date(),
          email: user?.email,
        };

        const res = await axios.post("http://localhost:3000/donation", petData);
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `You'r successfully created a donation`,
                showConfirmButton: false,
                timer: 1500,
              });
        }

        formik.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    validate: (values) => {
      const errors = {};

      // Validate other fields as needed
      if (!values.petImage) {
        errors.petImage = "Pet image is required";
      }
      if (!values.maximumAmount) {
        errors.petAge = "Maximum Amount is required";
      }
      if (!values.lastDateOfDonation) {
        errors.lastDateOfDonation = "Pet Location is required";
      }
      if (!values.shortDescription) {
        errors.shortDescription = "This field required";
      }
      if (!values.longDescription) {
        errors.longDescription = "This field required";
      }

      return errors;
    },
  });
  return (
    <div>
      <Title
        heading="Create Your Donation Campaign"
      ></Title>
      <form onSubmit={formik.handleSubmit}>
        {/* pet image and pet pet name field */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className=" w-full">
            <label
              htmlFor="petImage"
              className="block text-sm font-medium text-gray-600"
            >
              Pet Image
            </label>
            <input
              type="file"
              id="petImage"
              name="petImage"
              onChange={(event) => {
                formik.setFieldValue("petImage", event.currentTarget.files[0]);
              }}
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.petImage && formik.errors.petImage && (
              <div className="mt-1 text-red-500 text-sm">
                <FaExclamationCircle /> {formik.errors.petImage}
              </div>
            )}
            {formik.values.petImage && (
              <CloudinaryContext cloudName="drcttfagw">
                <Image publicId={formik.values.petImage.name} width="150" />
              </CloudinaryContext>
            )}
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="maximumAmount"
            className="block text-sm font-medium text-gray-600"
          >
            Maximum Donation Amount
          </label>
          <input
            type="text"
            id="maximumAmount"
            name="maximumAmount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maximumAmount}
            className="mt-1 p-2 border rounded w-full"
          />
          {formik.touched.maximumAmount && formik.errors.maximumAmount && (
            <div className="mt-1 text-red-500 text-sm">
              <FaExclamationCircle /> {formik.errors.maximumAmount}
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-col md:flex-row mt-5">
          <div className="w-full">
            <label
              htmlFor="lastDateOfDonation"
              className="block text-sm font-medium text-gray-600"
            >
              Last Date of Donation
            </label>
            <input
              type="date"
              id="lastDateOfDonation"
              name="lastDateOfDonation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastDateOfDonation}
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.lastDateOfDonation && formik.errors.lastDateOfDonation && (
              <div className="mt-1 text-red-500 text-sm">
                <FaExclamationCircle /> {formik.errors.lastDateOfDonation}
              </div>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-gray-600"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shortDescription}
              className="mt-1 p-2 border rounded w-full"
            />
            {formik.touched.shortDescription &&
              formik.errors.shortDescription && (
                <div className="mt-1 text-red-500 text-sm">
                  <FaExclamationCircle /> {formik.errors.shortDescription}
                </div>
              )}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium text-gray-600"
          >
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.longDescription}
            className="mt-1 p-2 border rounded w-full h-52"
          />
          {formik.touched.longDescription && formik.errors.shortDescription && (
            <div className="mt-1 text-red-500 text-sm">
              <FaExclamationCircle /> {formik.errors.shortDescription}
            </div>
          )}
        </div>

        <div>
          <button
            className="bg-[#f6425f] text-white px-5 py-2 rounded-md ml-3 hover:border hover:border-[#f6425f]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
