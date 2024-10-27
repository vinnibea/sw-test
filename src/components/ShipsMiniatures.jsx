import { useEffect, useState, memo } from "react";
import { useShallow } from "zustand/react/shallow";
import useStore from "../stores/store";
import selector from "../stores/selector";
import useFetchExtraDetails from "../hooks/useFetchExtraDetails";
import { checkImageExistance } from "../utils/helpers";
import { imageURLConstructor } from "../utils/helpers";
import { placeholder_image } from "../localData/placeholders";

function ShipsMiniatures({ id, filmTitle, selectedStarship, selectStarship }) {
  //used custom hook here as an example
  const { status, data } = useFetchExtraDetails("starships", id);
  //required values in this component
  const { setStarshipNode } = useStore(useShallow(selector));
  //checks image existance
  const [image, setImage] = useState();
  useEffect(() => {
    if (status === "success") {
      //creating a node only if status success
      //also we have to pass film title this time to find it`s position in store
      setStarshipNode(
        {
          type: "output",
          position: { y: 350 },
          data: { label: data?.name },
        },
        filmTitle
      );
    }
  }, [status, filmTitle, data?.name]);

  useEffect(() => {
    //check if we already had request for this picture
    //it should be stored in session storage to avoid fetch retry
    const session_image = sessionStorage.getItem(id);
    if (session_image) {
      //parse json to get access to fields
      const parsed_image = JSON.parse(session_image);
      if (parsed_image.url) {
        //if field has url then
        return setImage(parsed_image.url);
      } else {
        //if not - set to falsy value
        setImage(undefined);
      }
    }
    //if we fetching image for the first time
    checkImageExistance(imageURLConstructor(id)).then((response) => {
      //check response array for true value - string
      if (response[0]) {
        setImage(response[0]);
        //if exists - set key in session storage to url// another approach is to convert string to base64 to store it
        sessionStorage.setItem(id, JSON.stringify({ url: response[0] }));
        //if not - set key in session storage to false
      } else if (!response[0]) {
        sessionStorage.setItem(id, JSON.stringify({ url: false }));
      }
    });
  }, [filmTitle, id]);

  const onStarshipSelection = () => {
    selectStarship(id, !!image);
  };

  return (
    <img
      src={image || placeholder_image}
      alt={data?.name}
      className={`w-10 h-10 rounded-md shadow-xl border-4 cursor-pointer transition-all duration-700 ${
        id === selectedStarship ? "border-amber-300" : "border-neutral-300"
      }`}
      onClick={onStarshipSelection}
    ></img>
  );
}

export default memo(ShipsMiniatures);
