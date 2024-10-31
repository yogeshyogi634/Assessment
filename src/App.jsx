import React, { Suspense, lazy } from "react";
import EpisodeProvider from "./context/EpisodeContext";

// Lazy load components
const EpisodeList = lazy(() => import("./components/EpisodeList/EpisodeList"));
const CharacterFeed = lazy(() =>
  import("./components/CharacterFeed/CharacterFeed")
);

function App() {
  return (
    <EpisodeProvider>
      <Suspense fallback={<div>Loading components...</div>}>
        <div className="flex">
          {/* Sidebar for episodes */}
          <EpisodeList />
          {/* Main view for characters */}
          <CharacterFeed />
        </div>
      </Suspense>
    </EpisodeProvider>
  );
}

export default App;
