import { useContext, useState } from "react";
import styles from "./Player.module.scss";
import { CurrentMusicContext } from "@Providers/CurrentMusicContextProvider";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { CgPlayTrackNext } from "react-icons/cg";
import { CgPlayTrackPrev } from "react-icons/cg";
import { LuShuffle } from "react-icons/lu";
import { LuRepeat } from "react-icons/lu";
import { useEffect } from "react";
import { MusicQueue } from "@/Services/queue.service";
import { MusicService } from "@/Services/music.service";

export function Player() {
  const { currentMusic, setCurrentMusic } = useContext(CurrentMusicContext);
  const [isPaused, setPause] = useState(true);
  const [musicList, setMusicList] = useState([]);
  const [musicQueue, setMusicQueue] = useState();

  useEffect(() => {
    MusicService.getAllMusic()
      .then((newMusicList) => {
        const newQueue = new MusicQueue();
        newMusicList.forEach((music) => newQueue.append(music));
        setMusicQueue(newQueue);
        setMusicList(newMusicList);
        setCurrentMusic(newQueue.current.current);
      })
      .catch(console.error);
  }, []);

  if (currentMusic) {
    console.log(currentMusic);
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
            <button
              onClick={() => {
                setCurrentMusic(
                  musicQueue?.find(currentMusic).previous.current
                );
              }}
            >
              <CgPlayTrackPrev size={30} />
            </button>
            <button onClick={() => setPause(!isPaused)}>
              {(isPaused && <FaPlay size={25} />) || <FaPause size={25} />}
            </button>
            <button
              onClick={() => {
                setCurrentMusic(musicQueue?.find(currentMusic).next.current);
              }}
            >
              <CgPlayTrackNext size={30} />
            </button>
            <button>
              <LuRepeat size={20} style={{ fontWeight: 500 }} />
            </button>
          </div>
          {/* <div className={styles.music_settings}></div> */}
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.player_wrapper}>
        <div className={styles.player}>
          <div className="w-[100%] h-[100%] text-center content-center font-semibold text-neutral-800">
            Воспроизведение не началось
          </div>
        </div>
      </div>
    );
}
