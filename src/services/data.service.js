const dataService = {
    //transforms data from multiple arrays into one, keeping data about next page
    pageData(data) {
        const isNextPage = data.pages[data.pages.length - 1].data.next;
        return {
            next: isNextPage,
            pages: [
                ...data.pages.reduce(
                    (acc, next) => [...acc, ...next.data.results],
                    []
                ),
            ],
            pageParams: [...data.pageParams],
        };
    },

    //gives as intersection of arrays of film ships and character ships
    //sets to session storage unique key from request path
    filmData(data, starships, film_id, char_id) {
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
    }
}

export default dataService;