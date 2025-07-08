import "./App.css";
import { Home } from "@Components/Home/Home";
import { CurrentMusicContextProvider } from "@Providers/CurrentMusicContextProvider";
import { Player } from "@Components/Player/Player";

import "./Fonts/NotoSans-VariableFont_wdth,wght.ttf";

function App() {
  return (
    <CurrentMusicContextProvider>
      <Home />
      <Player />
    </CurrentMusicContextProvider>
  );
}

export default App;
