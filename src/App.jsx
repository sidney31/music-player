import "./App.css";
import { Home } from "@Components/Home/Home";
import { Player } from "@Components/Player/Player";

import "./Fonts/NotoSans-VariableFont_wdth,wght.ttf";
import { PlayerContextProvider } from "./Providers/PlayerContextProvider";

function App() {
  return (
    <PlayerContextProvider>
      <Home />
      <Player />
    </PlayerContextProvider>
  );
}

export default App;
