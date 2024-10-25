import axios from "axios";
import { useQuery } from "@tanstack/react-query";

//pair of hook and fetch function
//i was using slightly different logics elsewhere so it`s only hook I have concstructed
//fetching extra details using function and external API

const useFetchCharaterWithDetails = (characterName) => {
  const fetchDetails = async (char_name) => {
    //encoding name to proper request string
    const encoded_name = encodeURIComponent(char_name);
    //checking if we have already fetched item

    //returning promise to resolve it in useQuery

    //if not - make request
    return axios.get(
      `https://starwars-databank-server.vercel.app/api/v1/characters/name/${encoded_name}`
    );
  };
  const { status, data } = useQuery({
    queryKey: ["character", characterName],
    queryFn: () => {
      return fetchDetails(characterName);
    },
    //setting data to session storage
    select: (data) => {
      //because API returns array with one item we are checking what we are returning
      return data.data[0];
    },
  });

  return { status, data };
};

export default useFetchCharaterWithDetails;
