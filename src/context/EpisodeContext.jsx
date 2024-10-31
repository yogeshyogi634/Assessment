import { createContext, useEffect, useState } from "react";
import {
  fetchEpisodes,
  fetchCharacters,
  fetchEpisodeCharacters,
} from "../services/api";

export const EpisodeContext = createContext();

const EpisodeProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial episodes and characters
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [episodesData, charactersData] = await Promise.all([
          fetchEpisodes(),
          fetchCharacters(),
        ]);
        setEpisodes(episodesData.results);
        setCharacters(charactersData.results);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Fetch characters for a selected episode or revert
  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const episodeCharacters = selectedEpisode
          ? await fetchEpisodeCharacters(selectedEpisode)
          : await fetchCharacters();
        setCharacters(
          selectedEpisode ? episodeCharacters : episodeCharacters.results
        );
      } catch {
        setError("Failed to load episode characters");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [selectedEpisode]);

  // Toggle episode selection
  const toggleEpisodeSelection = (episode) => {
    setSelectedEpisode(selectedEpisode?.id === episode.id ? null : episode);
  };

  return (
    <EpisodeContext.Provider
      value={{
        episodes,
        characters,
        selectedEpisode,
        toggleEpisodeSelection,
        loading,
        error,
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
};

export default EpisodeProvider;
