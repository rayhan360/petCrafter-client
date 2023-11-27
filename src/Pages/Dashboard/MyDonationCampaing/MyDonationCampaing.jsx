import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyDonationCampaing = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: donation = [] } = useQuery({
    queryKey: ["donation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(donation);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default MyDonationCampaing;
