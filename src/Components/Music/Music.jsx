import { useContext } from "react";
import { CurrentMusicContext } from "@Providers/CurrentMusicContextProvider";

export default function MusicComponent({ music }) {
  const { currentMusic, setCurrentMusic } = useContext(CurrentMusicContext);

  return (
    <div
      className="font-semibold hover:bg-zinc-800 rounded-2xl p-2 mt-3 flex items-center cursor-pointer"
      onClick={() => {
        setCurrentMusic(music);
      }}
    >
      <div>
        <img
          src={music.getCover()}
          className="h-[48px] w-[48px] rounded bg-stone-200"
        />
      </div>
      <div className="ms-3">
        <p>{music.getTitle()}</p>
        <p className="text-stone-400">{music.getArtist()}</p>
      </div>
    </div>
  );
}
