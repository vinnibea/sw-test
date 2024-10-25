import { IoArrowDownCircle } from "react-icons/io5";
function ExpandButton({ onClick, expanded, children }) {
  return (
    <button
      type="button"
      className={`btn-expand ${
        expanded
          ? "bg-white text-black hover:bg-white hover:text-black"
          : "bg-neutral-700 text-white hover:bg-neutral-800 "
      }`}
      onClick={onClick}
    >
      {children}
      <IoArrowDownCircle
        className={`min-w-6 min-h-6 font-bold transition-all duration-700 ${
          expanded
            ? "transform rotate-180 text-blue-500"
            : "transform rotate-0 text-amber-300"
        }`}
      />
    </button>
  );
}

export default ExpandButton;
