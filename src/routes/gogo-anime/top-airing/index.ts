import anilist, {
	nineAnime,
	gogoAnime,
	animePahe,
	anify,
	animeFox,
} from "@/consumet";
import { AiringAnime } from "@/models/gogoanime/anime";
import Elysia, { t } from "elysia";

export default new Elysia({ name: "api.anilist.trending" }).get(
	"",
	async () => {
		console.log(
			nineAnime.isWorking,
			gogoAnime.isWorking,
			animePahe.isWorking,
			anify.isWorking,
			animeFox.isWorking,
		);
		const trendingAnimes = await gogoAnime.fetchTopAiring();
		return trendingAnimes;
	},
	{
		response: {
			200: AiringAnime,
		},
	},
);
