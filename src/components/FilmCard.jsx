//film card, lifts state up
import { useState, useEffect, memo, useMemo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "../stores/store";
import selector from "../stores/selector";
import useFetchFilms from "../hooks/useFetchFilms";
import Starship from "./Starship";
import ShipsMiniatures from "./ShipsMiniatures";
import StarshipsWrapper from "./StarshipsWrapper";
import episodes from "../localData/episodes";


function FilmCard({ filmToFetch, starships, filmsLength}) {
  const { setFilmNode, id: characterId } = useStore(useShallow(selector));
  //im doing here some stuff to return modified data, so hook... i don`t know
  // maybe i`ll do some class later for all this logics
  //since each time logics is slightly different I prefer to keep hook in place
  const { data, status } = useFetchFilms(filmToFetch, characterId, starships);
  //just a state
  const [selectedStarship, setSelectedStarship] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  //fn checks if we have image for selected ship and toogles ship`s active status
  const onStarshipSelection = (id, hasImage) => {
    //toogles state
    if (id === selectedStarship) {
      setSelectedStarship(false);
      return;
    }

    //selecting id for visual presentation
    //this time starship
    setHasImage(hasImage);
    setSelectedStarship(id);
  };

  useEffect(() => {
    //adding film to flow if status is successful
    if (status === "success") {
      setFilmNode(
        {
          type: "default",
          data: { label: data.title },
          position: {
            x: 0,
            y: 100,
          },
        },
        //to avoid duplicates
        filmsLength,
        data?.starships?.length || 0
      );
    }
  }, [status]);

  //memo will keep data before something in dependency array changes

  const activeTitle = useMemo(
    () => (data && data.title ? data.title : "Loading..."),
    [status]
  );

  return (
    <div
      className={`group film rounded-md shadow-lg border-4 border-transparent ${
        status === "pending" ? "pointer-events-none" : "pointer-events-auto"
      }  hover:flex-grow-[5] flex-grow-[0]`}
    >
      <h3
        className={`film-episode opacity-0
          group-hover:opacity-100  max-xl:opacity-100`}
      >
        {episodes[data?.episode_id - 1]?.episode}
      </h3>

      <img
        src={episodes[data?.episode_id - 1]?.src}
        alt={data?.title}
        className={`film-cover
            group-hover:blur-none group-hover:scale-125 max-xl:scale-100 max-xl:blur-none blur-md`}
      />

      <h3
        className={`film-title bg-slate-800 group-hover:text-amber-300 border-t-8 border-b-8 border-amber-300 max-xl:text-white text-white
        } ${
          status === "pending"
            ? "flex items-center justify-center text-white bg-amber-300"
            : ""
        } `}
      >
        {activeTitle}
      </h3>

      <div
        className={`film-details transform 
            group-hover:opacity-100 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:to-black group-hover:translate-x-0 opacity-0 max-xl:opacity-100 translate-x-full max-xl:translate-x-0`}
      >
        <span>Year: {data?.release_date}</span>
        <span>director: {data?.director}</span>
      </div>

      {status === "success" && (
        <StarshipsWrapper selectedStarship={selectedStarship}>
          {selectedStarship && (
            <Starship starship={selectedStarship} image={hasImage}></Starship>
          )}

          <div
            className={`flex items-center justify-center absolute bottom-0 left-0 right-0 gap-2 px-4 py-4 transition-all duration-700 delay-1000 opacity-0 group-hover:opacity-100`}
          >
            {data?.starships?.length > 0 &&
              data?.starships.map((starship, i) => {
                return (
                  <ShipsMiniatures
                    id={starship}
                    selectStarship={onStarshipSelection}
                    selectedStarship={selectedStarship}
                    key={starship + i}
                    filmTitle={data.title}
                  ></ShipsMiniatures>
                );
              })}
          </div>
        </StarshipsWrapper>
      )}
    </div>
  );
}
export default memo(FilmCard);
