import { useQuery } from "@tanstack/react-query";
import fetchService from "../services/fetch.service";
import dataService from "../services/data.service";

const useFetchFilms = (film_id, char_id, starships) => {
  const { data, status } = useQuery({
    queryKey: ["films", film_id],
    queryFn: () => fetchService.fetchFilmById(film_id),
    select: (data) => dataService.filmData(data, starships, film_id, char_id),
  });

  return { data, status };
};

export default useFetchFilms;
