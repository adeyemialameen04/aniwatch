import { ANIME } from "@consumet/extensions";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Zoro from "@consumet/extensions/dist/providers/anime/zoro";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";

export const gogoAnime = new ANIME.Gogoanime();
export const nineAnime = new ANIME.NineAnime();
export const animePahe = new ANIME.AnimePahe();
export const anify = new ANIME.Anify();
export const animeFox = new ANIME.AnimeFox();
const anilist = new Anilist(new ANIME.AnimePahe());
export default anilist;
