import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

// Fetch all episodes
export const fetchEpisodes = async () => {
  const response = await axios.get(`${BASE_URL}/episode`);
  return response.data;
};

// Fetch first page of characters
export const fetchCharacters = async () => {
  const response = await axios.get(`${BASE_URL}/character`);
  return response.data;
};

// Fetch characters from a specific episode
export const fetchEpisodeCharacters = async (episode) => {
  const characterRequests = episode.characters.map((url) => axios.get(url));
  const responses = await Promise.all(characterRequests);
  return responses.map((res) => res.data);
};
