import ExpandedButton from "./UI/ExpandButton";
import { useState } from "react";
import { setProfile } from "../utils/helpers";

function ProfileInfo({ profile, shouldHide }) {
  //show or hide extra profile data
  const [expanded, setExpanded] = useState(true);
  // selecting and tranforming only required data for profile info
  const prepared_profile_info = setProfile(profile);
  //toogling state of profile details
  const toogleExpanded = () => {
    setExpanded(() => !expanded);
  };
  return (
    <div className="rounded-md flex-grow-[3] w-full">
      <div className="flex items-center justify-end">
        {!shouldHide && (
          <ExpandedButton onClick={toogleExpanded} expanded={expanded}>
            {expanded ? "Hide" : "Expand"}
          </ExpandedButton>
        )}
      </div>

      <ul
        className={`info-list ${
          expanded
            ? "max-h-100 transform opacity-100"
            : "opacity-0 overflow-hidden transform"
        }`}
      >
        {prepared_profile_info.map(([key, value]) => {
          return (
            <li className="info-list_item" key={key}>
              <span>{key}:</span>
              <span className="text-neutral-950">{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProfileInfo;
