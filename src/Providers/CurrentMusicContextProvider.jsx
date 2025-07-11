import { createContext, useEffect, useState } from "react";

const CurrentMusicContext = createContext();

const CurrentMusicContextProvider = ({ children }) => {
  const [currentMusic, setCurrentMusic] = useState("");

  return (
    <CurrentMusicContext value={{ currentMusic, setCurrentMusic }}>
      {children}
    </CurrentMusicContext>
  );
};

export { CurrentMusicContext, CurrentMusicContextProvider };
