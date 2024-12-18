import { memo, useMemo } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileImage from "./ProfileImage";
import useFetchExtraDetails from "../hooks/useFetchExtraDetails";
import { placeholder_image } from "../localData/placeholders";
import { imageURLConstructor } from "../utils/helpers";
function Starship({ starship, image}) {
  //example of custom hook
  const { status, data } = useFetchExtraDetails("starships", starship);
  //checking for image
  const src = useMemo(
    () => (image ? imageURLConstructor(starship) : placeholder_image),
    [image, starship]
  );
  return (
    <div
      className={`flex flex-col justify-between p-2 items-stretch rounded-md transform duration-1000 delay-1000
        group-hover:translate-y-0 -translate-y-full`}
    >
      <ProfileImage image={src} status={status} alt={starship}></ProfileImage>
      {data && <ProfileInfo profile={data} shouldHide={true}></ProfileInfo>}
    </div>
  );
}

export default memo(Starship);
