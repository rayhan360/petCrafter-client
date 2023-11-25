/* eslint-disable react/prop-types */
const Title = ({heading, subHeading}) => {
  return (
    <div>
      <div className="mx-auto text-center md:w-4/12 my-4">
        <p className="text-3xl text-[#ef6f18] font-bold uppercase py-4">{heading}</p>
        <p className="font-medium mb-2">{subHeading}</p>
      </div>
    </div>
  );
};

export default Title;
