import { useContext } from "react";
import { CurrentMusicContext } from "@Providers/CurrentMusicContextProvider";
import styles from "./Music.module.scss";

export default function MusicComponent({ music }) {
  const { currentMusic, setCurrentMusic } = useContext(CurrentMusicContext);

  return (
    <div
      className={`${styles.music_card_wrapper} font-semibold hover:bg-zinc-800 rounded-2xl p-2 mt-3 flex items-center cursor-pointer`}
      onClick={() => {
        setCurrentMusic(music);
      }}
    >
      <div
        className={`${music === currentMusic ? styles.play : ""} ${
          styles.music_cover
        }`}
      >
        <img src={music.getCover()} />
      </div>
      <div className="ms-3">
        <p>{music.getTitle()}</p>
        <p className="text-stone-400">{music.getArtist()}</p>
      </div>
    </div>
  );
}
