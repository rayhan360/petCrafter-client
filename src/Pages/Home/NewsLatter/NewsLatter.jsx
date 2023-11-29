const NewsLatter = () => {
  return (
    <div id="newsLatter">
      <div className="bg-[#f6425f] rounded-md shadow-md p-6 max-w-4xl mx-auto my-10">
        <h2 className="text-2xl text-white font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white">
          Get regular updates in your inbox to borrow a news books
        </p>
        <form className="mt-4">
          <label className="block mb-2 text-white">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md focus:outline-none"
            placeholder="Enter your email address"
          />
          <button
            type="submit"
            className="bg-white text-[#f6425f] py-2 px-4 rounded-md mt-4"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLatter;
