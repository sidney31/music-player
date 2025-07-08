import { MUSICS } from "@/musics.data";
import jsmediatags from "jsmediatags";

export class Music {
  constructor(cover, title, artist, src) {
    this.cover = cover;
    this.title = title;
    this.artist = artist;
    this.src = src;
  }

  getCover = () => this.cover;
  getTitle = () => this.title;
  getArtist = () => this.artist;
  getSrc = () => this.src;
}

export class MusicService {
  static setNextMusic = () => {};

  static getAllMusic = () => {
    return Promise.all(
      MUSICS.map(async (music) => {
        return this.getMusicInfoByUrl(music.src).then((tags) => {
          return new Music(
            this.generateCover(tags.picture),
            tags.title,
            tags.artist,
            music.src
          );
        });
      })
    );
  };

  static getMusicInfoByUrl = (src) => {
    return fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          jsmediatags.read(blob, {
            onSuccess: (tag) => resolve(tag.tags),
            onError: (error) => reject(error),
          });
        });
      });
  };

  static arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++)
      binary += String.fromCharCode(bytes[i]);

    return btoa(binary);
  };

  static generateCover = (cover) => {
    if (cover)
      return `data:${cover.format};base64,${this.arrayBufferToBase64(
        cover.data
      )}`;
    else return "/null_cover.png";
  };
}
