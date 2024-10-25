import { placeholder_image } from "../localData/placeholders";

function ProfileImage({ image, status, alt }) {
  return (
    <img
      src={image || placeholder_image}
      alt={alt}
      className={`main-image ${status === "pending" ? "pulse " : ""} ${
        image ? "opacity-90" : "opacity-50"
      }`}
    />
  );
}

export default ProfileImage;
