import $axios from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

const useFetchFilms = (film_id, char_id, starships) => {
  const fetchFilmById = async (filmId, characterId) => {
    //getting item(?)
    const film_in_storage = sessionStorage.getItem(
      `${characterId}/films/${filmId}`
    );
    //if exists we will return it as promise to resolve it by useQuery
    if (film_in_storage) {
      return new Promise((resolve) =>
        resolve({
          data: JSON.parse(film_in_storage),
          //flag to check within useQuery select fn
          from_storage: true,
        })
      );
    }
    //if not - just make another request which will return a promise too
    return $axios.get(`films/${filmId}`);
  };

  const { data, status } = useQuery({
    queryKey: ["films", film_id],
    queryFn: () => fetchFilmById(film_id),
    select: (data) => {
      //checking for from storage value
      if (data.from_storage) {
        return data.data;
      }

      //when fetching data find common starships to use it later
      //that`s why I`m using Sets and intersection method
      const common_starships = Array.from(
        new Set([...starships]).intersection(new Set([...data.data.starships]))
      );

      //object to return
      const data_to_view = {
        ...data.data,
        starships: common_starships,
      };

      //setting item to session storage to not request it later
      //this key helps to keep data unique
      sessionStorage.setItem(
        `${char_id}/films/${film_id}`,
        JSON.stringify(data_to_view)
      );
      return data_to_view;
    },
  });

  return { data, status };
};

export default useFetchFilms;
