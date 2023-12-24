import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePets = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allPets = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets/allPets`);
      return res.data;
    },
  });
  return [allPets, refetch, isPending];
};

export default usePets;
