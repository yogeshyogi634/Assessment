import React, { useContext, useEffect, useState } from "react";
import { EpisodeContext } from "../../context/EpisodeContext";

const CharacterFeed = () => {
  const { characters, loading, error, selectedEpisode } =
    useContext(EpisodeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;

  // Calculate pagination
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset page to 1 when selectedEpisode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEpisode]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-screen w-[60%] md:w-[70%] lg:w-[80%] p-4">
      <h2 className="text-lg font-bold mb-4 p-2 text-center">
        {selectedEpisode?.name} Characters
      </h2>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full overflow-auto">
          {currentCharacters.map((character) => (
            <div
              key={character.id}
              className="flex flex-col justify-between p-4 border rounded-lg shadow-md xl:h-[350px] " // Set a fixed height for the character card
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-[80%] object-cover rounded-md" // Allow the image to take up most of the card height
              />
              <h3 className="mt-2 font-bold">{character.name}</h3>
              <p>{character.species}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center p-4 lg:p-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-black hover:bg-gray-200 shadow-lg"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterFeed;
