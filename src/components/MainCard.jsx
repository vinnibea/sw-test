import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useFetchCharaterWithDetails from "../hooks/useFetchCharacterDetails";
import ProfileInfo from "./ProfileInfo";
import ProfileImage from "./ProfileImage";
import FilmCard from "./FilmCard";
import Loader from "./UI/Loader";
import Flow from "./Flow";
import UIButton from "./UI/UIButton";
import FlowTip from "./UI/FlowTip";
import useStore from "../stores/store";
import selector from "../stores/selector";
import episodes from "../localData/episodes";
import { placeholder_text } from "../localData/placeholders";

function MainCard({ character }) {
  //expanding film card with onMouseEnter
  const [expandedFilm, setExpandedFilm] = useState(false);
  const [showAllFilms, setShowAllFilms] = useState(false);
  const { setRootNode, setId, nodes } = useStore(useShallow(selector));

  //useQuery hook for fetching additional data by name of char
  const { status, data } = useFetchCharaterWithDetails(character.name);

  //setting active film card
  const setActive = (episode) => {
    if (episode === expandedFilm) return;
    else {
      return setExpandedFilm(episode);
    }
  };

  //setting up store on button click
  const onStoreSet = () => {
    setId(character.id);
    //position of each node will be calculated in store
    setRootNode({
      type: "input",
      data: { label: character.name },
      position: { x: 0, y: 25 },
    });
    //show button fires expanding of covers and sets active film to first by default
    setShowAllFilms(true);
    setActive(character.films[0]);
  };
  //reset store on hid button click
  const onDiscoverHide = () => {
    setShowAllFilms(false);
  };

  return (
    <div
      className="min-h-full flex flex-col p-4  max-xl:p-2 rounded-md shadow-xl shadow-blue-300/70"
      style={{
        background: `url(${
          data?.image || episodes[0].src
        }) center center / cover`,
      }}
    >
      <article className="article">
        <div className="flex w-full items-start gap-4 max-xl:flex-col">
          <div className="bg-white px-4 py-2 rounded-md w-1/2 max-xl:w-full gap-2 flex flex-col justify-between">
            <div className="flex items-start gap-2">
              <ProfileImage
                image={data?.image}
                status={status}
                alt={character.name}
              ></ProfileImage>
              <ProfileInfo profile={character}></ProfileInfo>
            </div>

            <div className="description-wrapper">
              <p className="character-legend">
                {data?.description?.length ? (
                  data?.description
                ) : status === "pending" ? (
                  <Loader></Loader>
                ) : (
                  placeholder_text
                )}
              </p>
            </div>

            <div className="flex w-full py-4">
              {!showAllFilms ? (
                <UIButton background={"btn-primary"} onClick={onStoreSet}>
                  Discover character
                </UIButton>
              ) : (
                <UIButton background={"btn-secondary"} onClick={onDiscoverHide}>
                  Hide
                </UIButton>
              )}
            </div>
          </div>

          <div
            className={`flex gap-2 max-xl:flex-col w-1/2 max-xl:w-full transform transition-all ease-linear duration-300 ${
              showAllFilms
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "-translate-x-full opacity-0 max-h-0 pointer-events-none"
            }`}
          >
            {showAllFilms &&
              character.films.map((episode, _, array) => (
                <FilmCard
                  filmToFetch={episode}
                  key={episode}
                  expanded={episode === (expandedFilm === 0 ? 1 : expandedFilm)}
                  setExpandedFilm={setActive}
                  starships={character.starships}
                  filmsLength={array.length}
                />
              ))}
          </div>
        </div>

        <div
          className={`w-full max-xl:w-full h-[720px] max-xl:h-[320px] transform transition-all ease-linear delay-100 ${
            !(nodes[character.id]?.length > 0)
              ? "flex justify-center items-center"
              : ""
          } ${
            showAllFilms
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-full opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          {nodes[character.id]?.length > 0 ? (
            <Flow viewId={character.id}></Flow>
          ) : (
            <FlowTip></FlowTip>
          )}
        </div>
      </article>
    </div>
  );
}

export default MainCard;
