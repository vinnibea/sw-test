import axios from "axios";
import $axios from "../utils/axios";
const fetchService = {
    //request to external api for extra details such as image of character or/and legend
    fetchDetails(char_name) {
        //encoding name to proper request string
        const encoded_name = encodeURIComponent(char_name);
        //checking if we have already fetched item

        //returning promise to resolve it in useQuery

        //if not - make request
        return axios.get(
            `https://starwars-databank-server.vercel.app/api/v1/characters/name/${encoded_name}`
        );
    },
    //in case we have stored data in session storage returns promise with parsed json
    //otherwise makes request
    fetchFilmById(filmId, characterId) {
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
    },
    //fetch new page using page param
    fetchPeoplePage({ pageParam }) {
        return $axios.get(`people/?page=${pageParam}`);
    },
    //fetching with multiple url params
    fetchDetailsWithParams(category, id) {
        return $axios.get(`${category}/${id}/`);
    },
}

export default fetchService;