import { Player } from "@/Components/Player/Player";
import { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState("");

  return (
    <PlayerContext
      value={{
        isPlaying,
        setPlaying,
        currentMusic,
        setCurrentMusic,
      }}
    >
      <>{children}</>
    </PlayerContext>
  );
};

export { PlayerContext, PlayerContextProvider };
