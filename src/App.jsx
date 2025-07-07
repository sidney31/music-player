import "./App.css";
import { Home } from "@Components/Home/Home";
import { CurrentMusicContextProvider } from "@Providers/CurrentMusicContextProvider";
import { Player } from "@Components/Player/Player";

function App() {
  return (
    <CurrentMusicContextProvider>
      <Home />
      <Player />
    </CurrentMusicContextProvider>
  );
}

export default App;
