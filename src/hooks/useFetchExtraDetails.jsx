import $axios from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

//pair of hook and fetch function
//i was using slightly different logics elsewhere so it`s only hook I have concstructed
//but i can do more

const useFetchExtraDetails = (category, id) => {
  const fetchDetailsWithParams = (category, id) => {
    return $axios.get(`${category}/${id}/`);
  };

  const { status, data } = useQuery({
    queryKey: [category, id],
    queryFn: () => fetchDetailsWithParams(category, id),
    select: (data) => {
      return data.data;
    },
  });
  
  return { status, data };
};

export default useFetchExtraDetails;
