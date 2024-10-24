import anilist, {
	nineAnime,
	gogoAnime,
	animePahe,
	anify,
	animeFox,
} from "@/consumet";
import { IAnimeResult } from "@/models/gogoanime/anime";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.anilist.trending", tags }).get(
	"",
	async () => {
		console.log(
			nineAnime.isWorking,
			gogoAnime.isWorking,
			animePahe.isWorking,
			anify.isWorking,
			animeFox.isWorking,
		);
		const data = await anilist.fetchTrendingAnime();
		return {
			success: true,
			data,
		};
	},
	{
		response: {
			200: t.Object({
				success: t.Boolean(),
				data: t.Object({
					currentPage: t.Optional(t.Number()),
					hasNextPage: t.Optional(t.Boolean()),
					results: t.Array(IAnimeResult),
				}),
			}),
		},
		detail: {
			summary: "Get Trending animes from anilist",
		},
	},
);
