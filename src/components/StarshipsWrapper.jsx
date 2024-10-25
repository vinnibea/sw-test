//simple wrapper for starships section

function StarshipsWrapper({ selectedStarship, expanded, children }) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col p-2 pb-4 transition-all duration-300 delay-700 ${
        selectedStarship
          ? "justify-between bg-white/50 backdrop-blur-lg"
          : "justify-end"
      } ${expanded ? "opacity-100" : "opacity-0"} p-1 max-xl:py-0`}
    >
      {children}
    </div>
  );
}

export default StarshipsWrapper;