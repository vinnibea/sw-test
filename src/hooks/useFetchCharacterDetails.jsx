import { useQuery } from "@tanstack/react-query";
import fetchService from "../services/fetch.service";

//pair of hook and fetch function
//i was using slightly different logics elsewhere so it`s only hook I have concstructed
//fetching extra details using function and external API

const useFetchCharaterWithDetails = (characterName) => {
  const { status, data } = useQuery({
    queryKey: ["character", characterName],
    queryFn: () => fetchService.fetchDetails(characterName),
    //because API returns array with one item we are checking what we are returning
    select: (data) => data.data[0],
  });

  return { status, data };
};

export default useFetchCharaterWithDetails;
