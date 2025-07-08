import { IoSearchSharp } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";
import { LuPodcast } from "react-icons/lu";
import { MdFavorite } from "react-icons/md";
import MusicComponent from "@Components/Music/Music";
import { useState } from "react";
import styles from "./Home.module.scss";
import { MusicService } from "@Services/music.service";
import { useEffect } from "react";
import { MusicQueue } from "@/Services/queue.service";

export function Home() {
  const [musicList, setMusicList] = useState([]);
  // const [musicQueue, setMusicQueue] = useState();

  useEffect(() => {
    MusicService.getAllMusic().then(setMusicList).catch(console.error);
  }, []);

  // useEffect(() => {
  //   setMusicQueue(new MusicQueue());
  //   musicList.map((music) => musicQueue.append(music));
  // }, [musicList]);

  return (
    <div className="flex flex-row w-[100svw]">
      <nav className="w-[200px] h-[100svh] flex flex-col p-4 px-[30px]">
        <img className="" src="logo.png" alt="" />
        <ul className="nav_links flex flex-col gap-[24px] mt-[32px] text-[var(--text-color)] font-medium">
          <li>
            <IoSearchSharp />
            Поиск
          </li>
          <li>
            <IoIosMusicalNotes />
            Главная
          </li>
          <li>
            <LuPodcast />
            Подкасты и книги
          </li>
          <li className="text-[var(--white-color)]">
            <MdFavorite />
            Коллекция
          </li>
        </ul>
      </nav>
      <main className={styles.main_tab}>
        <p className="font-black m-0 text-[36px]">Коллекция</p>
        <div className="">
          {musicList.map((music, i) => (
            <MusicComponent music={music} key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
