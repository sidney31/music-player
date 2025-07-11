import { useContext, useRef, useState } from "react";
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
  const [isShuffled, setShuffle] = useState(false);
  const [isRepeated, setRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicList, setMusicList] = useState([]);
  const [musicQueue, setMusicQueue] = useState();
  const audioRef = useRef(null);

  useEffect(() => {
    const music = audioRef.current;
    if (!music) return;
    music.setAttribute("src", currentMusic.src);
    music.load();
    music.play();
  }, [currentMusic]);

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

  const playOrPauseMusic = () => {
    const music = audioRef.current;
    setIsPlaying(!isPlaying);
    if (isPlaying) music.pause();
    else music.play();
  };

  if (currentMusic) {
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
            <button onClick={() => setShuffle(!isShuffled)}>
              {isShuffled ? (
                <LuShuffle
                  size={20}
                  style={{ strokeWidth: "3px", color: "var(--white-color)" }}
                />
              ) : (
                <LuShuffle size={20} />
              )}
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
            <button
              onClick={() => {
                playOrPauseMusic();
              }}
            >
              {(isPlaying && <FaPause size={25} />) || <FaPlay size={25} />}
            </button>
            <button
              onClick={() =>
                setCurrentMusic(musicQueue?.find(currentMusic).next.current)
              }
            >
              <CgPlayTrackNext size={30} />
            </button>
            <button onClick={() => setRepeat(!isRepeated)}>
              {isRepeated ? (
                <LuRepeat
                  size={20}
                  style={{ strokeWidth: "3px", color: "var(--white-color)" }}
                />
              ) : (
                <LuRepeat size={20} />
              )}
            </button>
          </div>
          {/* <div className={styles.music_settings}></div> */}
          <audio
            ref={audioRef}
            src=""
            className="hidden"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
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
