import { useContext } from "react";
import styles from "./Music.module.scss";
import { PlayerContext } from "@/Providers/PlayerContextProvider";

export default function MusicComponent({ music }) {
  const { isPlaying, setPlaying, currentMusic, setCurrentMusic } =
    useContext(PlayerContext);

  return (
    <div
      className={`${styles.music_card_wrapper} font-semibold hover:bg-zinc-800 rounded-2xl p-2 mt-3 flex items-center cursor-pointer`}
      onClick={() => {
        if (currentMusic === music) setPlaying(!isPlaying);
        else setCurrentMusic(music);
      }}
    >
      <div
        className={`${music === currentMusic ? styles.play : ""} 
        ${music === currentMusic && !isPlaying ? styles.pause : ""} ${
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
