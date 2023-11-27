import Title from "../Common/Title";
import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";
import { CloudinaryContext, Image } from "cloudinary-react";
import { FaExclamationCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const categories = [
  { label: "Cats" },
  { label: "Dogs" },
  { label: "Rabbits" },
  { label: "Birds" },
];

const Update = () => {
  const data = useLoaderData();
  const {
    _id,
    petName,
    petAge,
    petLocation,
    shortDescription,
    longDescription,
  } = data;
  const axiosSecure = useAxiosSecure();
  const formik = useFormik({
    initialValues: {
      petImage: null,
      petName,
      petAge,
      petCategory: null,
      petLocation,
      shortDescription,
      longDescription,
    },
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
        };

        const petRes = await axiosSecure.patch(`/pets/${_id}`, petData);
        console.log(petRes.data);
        if (petRes.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${petName} is updated`,
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

      if (!values.petName) {
        errors.petName = "Pet name is required";
      }
      if (!values.petAge) {
        errors.petAge = "Pet age is required";
      }
      if (!values.petLocation) {
        errors.petLocation = "Pet Location is required";
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
      <div>
        <Title
          heading="Update a Pets"
          subHeading="Update Your Pets to Adopt Another"
        ></Title>
        <form onSubmit={formik.handleSubmit}>
          {/* pet image and pet pet name field */}
          <div className="flex flex-col md:flex-row gap-2">
            <div className=" w-full">
              <label
                htmlFor="petName"
                className="block text-sm font-medium text-gray-600"
              >
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.petName}
                className="mt-1 p-2 border rounded w-full"
              />
              {formik.touched.petName && formik.errors.petName && (
                <div className="mt-1 text-red-500 text-sm">
                  <FaExclamationCircle /> {formik.errors.petName}
                </div>
              )}
            </div>
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
                  formik.setFieldValue(
                    "petImage",
                    event.currentTarget.files[0]
                  );
                }}
                className="mt-1 p-2 border rounded w-full"
              />
              {formik.values.petImage && (
                <CloudinaryContext cloudName="drcttfagw">
                  <Image publicId={formik.values.petImage.name} width="150" />
                </CloudinaryContext>
              )}
            </div>
          </div>

          {/* pet category and pet age field */}
          <div className="flex gap-2 flex-col md:flex-row mt-3">
            <div className="w-full">
              <label
                htmlFor="petAge"
                className="block text-sm font-medium text-gray-600"
              >
                Pet Age
              </label>
              <input
                type="text"
                id="petAge"
                name="petAge"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.petAge}
                className="mt-1 p-2 border rounded w-full"
              />
              {formik.touched.petAge && formik.errors.petAge && (
                <div className="mt-1 text-red-500 text-sm">
                  <FaExclamationCircle /> {formik.errors.petAge}
                </div>
              )}
            </div>

            <div className="w-full mt-2">
              <label
                htmlFor="petCategory"
                className="block text-sm font-medium text-gray-600"
              >
                Pet Category
              </label>
              <Select
                id="petCategory"
                name="petCategory"
                options={categories}
                value={formik.values.petCategory}
                onChange={(selectedOption) => {
                  formik.setFieldValue("petCategory", selectedOption);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.petCategory && formik.errors.petCategory && (
                <div className="error">
                  <FaExclamationCircle /> {formik.errors.petCategory}
                </div>
              )}
            </div>
          </div>

          {/* pet location and short description field */}
          <div className="flex gap-2 flex-col md:flex-row mt-5">
            <div className="w-full">
              <label
                htmlFor="petLocation"
                className="block text-sm font-medium text-gray-600"
              >
                Pet Location
              </label>
              <input
                type="text"
                id="petLocation"
                name="petLocation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.petLocation}
                className="mt-1 p-2 border rounded w-full"
              />
              {formik.touched.petLocation && formik.errors.petLocation && (
                <div className="mt-1 text-red-500 text-sm">
                  <FaExclamationCircle /> {formik.errors.petLocation}
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
            {formik.touched.longDescription &&
              formik.errors.shortDescription && (
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
    </div>
  );
};

export default Update;
