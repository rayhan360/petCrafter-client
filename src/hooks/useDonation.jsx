import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDonation = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allDonation = [], isPending, refetch } = useQuery({
      queryKey: ["allDonation"],
      queryFn: async () => {
        const res = await axiosSecure.get("/donation");
        return res.data;
      },
    });
    return [allDonation, isPending, refetch]
};

export default useDonation;