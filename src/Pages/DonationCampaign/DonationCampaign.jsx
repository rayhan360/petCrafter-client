import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../components/Common/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const DonationCampaign = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: donationCampaign,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["donationCampaign"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axiosPublic.get(`/donation?page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length > 0 ? lastPage[lastPage.length - 1]._id : null;
    },
  });

  if (isFetching) {
    return <Loading></Loading>;
  }

  return (
    <InfiniteScroll
      dataLength={donationCampaign ? donationCampaign.pages.flat().length : 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loading></Loading>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          {isFetchingNextPage && <Loading></Loading>}
        </p>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
        {donationCampaign.pages.map((page) =>
          page.map((donation) => (
            <div key={donation._id}>
              <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
                <img
                  className="w-full h-48 object-cover"
                  src={donation.petImage}
                  alt={donation.petName}
                />
                <div className="p-4">
                  <h2 className="font-bold text-xl mb-2">{donation.petName}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    Maximum Donation Amount: ${donation.maximumAmount}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Donated Amount: ${donation.maximumAmount / 10}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link to={`/donationDetails/${donation._id}`}>
                      <button className="bg-[#f6425f] text-white px-4 py-2 rounded-md hover:bg-[#d53e68]">
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
    </InfiniteScroll>
  );
};

export default DonationCampaign;
