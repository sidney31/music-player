import { useContext, useRef, useState } from "react";
import styles from "./Player.module.scss";
import { PlayerContext } from "@Providers/PlayerContextProvider";
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
  const { isPlaying, setPlaying, currentMusic, setCurrentMusic } =
    useContext(PlayerContext);
  const [isShuffled, setShuffle] = useState(false);
  const [isRepeated, setRepeat] = useState(false);
  const [musicList, setMusicList] = useState([]);
  const [musicQueue, setMusicQueue] = useState();
  const audioRef = useRef();

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

  useEffect(() => {
    const music = audioRef.current;
    if (!music) return;
    music.setAttribute("src", currentMusic.src);
    music.load();
    music.play();
    setPlaying(true);
  }, [currentMusic]);

  useEffect(() => {
    const music = audioRef.current;
    if (!music) return;

    if (isPlaying) music.play();
    else music.pause();
  }, [isPlaying]);

  const setNextMusic = () => {
    setCurrentMusic(musicQueue?.find(currentMusic).next.current);
  };

  const setThisMusic = () => {
    setCurrentMusic(musicQueue?.find(currentMusic).current);
  };

  const setPreviousMusic = () => {
    setCurrentMusic(musicQueue?.find(currentMusic).previous.current);
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
                setPreviousMusic();
              }}
            >
              <CgPlayTrackPrev size={30} />
            </button>
            <button
              onClick={() => {
                setPlaying(!isPlaying);
              }}
            >
              {(isPlaying && <FaPause size={25} />) || <FaPlay size={25} />}
            </button>
            <button onClick={() => setNextMusic()}>
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
            src={null}
            className="hidden"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => (isRepeated ? setThisMusic() : setNextMusic())}
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
