//film card, lifts state up
import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "../stores/store";
import selector from "../stores/selector";
import useFetchFilms from "../hooks/useFetchFilms";
import Starship from "./Starship";
import ShipsMiniatures from "./ShipsMiniatures";
import StarshipsWrapper from "./StarshipsWrapper";
import episodes from "../localData/episodes";
import { placeholder_image } from "../localData/placeholders";

//documentation said that this is fine

function FilmCard({
  filmToFetch,
  setExpandedFilm,
  expanded,
  starships,
  filmsLength,
}) {
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

  //expands film on mouse over event
  const onFilmExpanded = (id) => {
    setExpandedFilm(id);
  };
  return (
    <div
      onMouseOver={() => onFilmExpanded(filmToFetch)}
      className={`film rounded-md shadow-lg ${
        expanded ? "flex-grow-[5] " : "flex-grow-[0]"
      } ${
        status === "pending" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <h3
        className={`film-episode ${
          expanded ? "opacity-100" : " max-xl:opacity-100 opacity-0"
        }`}
      >
        {episodes[data?.episode_id - 1]?.episode}
      </h3>

      <img
        src={episodes[data?.episode_id - 1]?.src || placeholder_image}
        alt={data?.title}
        className={`film-cover ${
          expanded
            ? "blur-none scale-125 max-xl:scale-100"
            : "max-xl:blur-none blur-md"
        }`}
      />

      <h3
        className={`film-title ${
          expanded
            ? "bg-slate-900/30 text-amber-300 max-xl:text-white"
            : "text-white"
        } ${
          status === "pending"
            ? "flex items-center justify-center text-white bg-amber-300"
            : ""
        } `}
      >
        {data && data.title ? data.title : "Loading..."}
      </h3>

      <div
        className={`film-details ${
          expanded && data
            ? "opacity-100 bg-gradient-to-r from-transparent to-black transform translate-x-0"
            : "opacity-0 max-xl:opacity-100 transform translate-x-full max-xl:translate-x-0"
        }`}
      >
        <span>Year: {data?.release_date}</span>
        <span>director: {data?.director}</span>
      </div>

      {status === "success" && (
        <StarshipsWrapper
          selectedStarship={selectedStarship}
          expanded={expanded}
        >
          {selectedStarship && expanded && (
            <Starship
              starship={selectedStarship}
              image={hasImage}
              expanded={expanded}
            ></Starship>
          )}

          <div
            className={`flex items-center justify-center absolute bottom-0 left-0 right-0 gap-4 py-4 transition-all duration-700 delay-1000 ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
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

export default FilmCard;
