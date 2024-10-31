import React, { useContext } from "react";
import { EpisodeContext } from "../../context/EpisodeContext";

const EpisodeList = () => {
  const { episodes, selectedEpisode, toggleEpisodeSelection, loading, error } =
    useContext(EpisodeContext);

  if (error) return <div>{error}</div>;

  return (
    <div className="w-[40%] md:w-[30%] lg:w-[20%] h-screen bg-gray-200 overflow-y-auto p-2 md:p-4">
      <h2 className="text-lg font-bold mb-4">Episodes</h2>
      <ul>
        {episodes.map((episode) => {
          const isSelected = selectedEpisode?.id === episode.id;

          return (
            <li
              key={episode.id}
              className={`p-2 cursor-pointer ${
                isSelected
                  ? "bg-blue-500 text-white border"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => toggleEpisodeSelection(episode)}
            >
              {episode.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EpisodeList;
