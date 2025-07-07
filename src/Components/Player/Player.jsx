import { useContext } from "react";
import styles from "./Player.module.scss";
import { CurrentMusicContext } from "@Providers/CurrentMusicContextProvider";

export function Player() {
  const { currentMusic, setCurentMusic } = useContext(CurrentMusicContext);
  return (
    <div className={styles.player_wrapper}>
      <div className={styles.player}>
        <div className={styles.music_cover}></div>
        <div>
          {currentMusic && (
            <>
              <p>{currentMusic.getTitle()}</p>
              <p>{currentMusic.getArtist()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
