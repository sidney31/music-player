import { useContext, useState } from "react";
import styles from "./Player.module.scss";
import { CurrentMusicContext } from "@Providers/CurrentMusicContextProvider";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { CgPlayTrackNext } from "react-icons/cg";
import { CgPlayTrackPrev } from "react-icons/cg";
import { LuShuffle } from "react-icons/lu";
import { LuRepeat } from "react-icons/lu";

export function Player() {
  const { currentMusic, setCurentMusic } = useContext(CurrentMusicContext);
  const [isPaused, setPause] = useState(true);

  if (currentMusic)
    return (
      <div className={styles.player_wrapper}>
        <div className={styles.player}>
          <div className={styles.music_info}>
            <img src={currentMusic.getCover()} className={styles.music_cover} />
            <div className={styles.music_description}>
              <p className={styles.music_title}>{currentMusic.getTitle()}</p>
              <p className={styles.music_artist}>{currentMusic.getArtist()}</p>
            </div>
          </div>
          <div className={styles.music_controls}>
            <button>
              <LuShuffle size={20} />
            </button>
            <button>
              <CgPlayTrackPrev size={30} />
            </button>
            <button onClick={() => setPause(!isPaused)}>
              {(isPaused && <FaPlay size={25} />) || <FaPause size={25} />}
            </button>
            <button>
              <CgPlayTrackNext size={30} />
            </button>
            <button>
              <LuRepeat size={20} />
            </button>
          </div>
          {/* <div className={styles.music_settings}></div> */}
        </div>
      </div>
    );
}
