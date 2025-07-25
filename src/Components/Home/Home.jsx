import { IoSearchSharp } from "react-icons/io5";
import { IoIosMusicalNotes } from "react-icons/io";
import { LuPodcast } from "react-icons/lu";
import { MdFavorite } from "react-icons/md";
import MusicComponent from "@Components/Music/Music";
import { useContext, useState } from "react";
import styles from "./Home.module.scss";
import { MusicService } from "@Services/music.service";
import { useEffect } from "react";

export function Home() {
  const [musicList, setMusicList] = useState([]);
  useEffect(() => {
    MusicService.getAllMusic().then(setMusicList).catch(console.error);
  }, []);

  return (
    <div className="flex flex-row w-[100svw]">
      <nav className="w-[200px] h-[100svh] flex flex-col p-4 px-[30px]">
        <img className="" src="logo.png" alt="" />
        <ul className={styles.nav_links}>
          <li>
            <IoSearchSharp size={25} />
            Поиск
          </li>
          <li>
            <IoIosMusicalNotes size={25} />
            Главная
          </li>
          <li>
            <LuPodcast size={25} />
            Подкасты и книги
          </li>
          <li className="text-[var(--white-color)]">
            <MdFavorite size={25} />
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
