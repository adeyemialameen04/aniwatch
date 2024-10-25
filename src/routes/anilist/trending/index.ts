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
	async ({ query: { perPage, page } }) => {
		console.log(
			gogoAnime.isWorking,
			animePahe.isWorking,
			anify.isWorking,
			animeFox.isWorking,
		);
		const data = await anilist.fetchTrendingAnime(
			Number(page || 1),
			Number(perPage) || 10,
		);
		// const lol = await animePahe.fetchAnimeInfo(
		// 	"3d2dfb80-632b-557e-dd0f-041c84e1efce",
		// );
		// console.log(lol);
		return {
			success: true,
			data,
		};
	},
	{
		query: t.Object({
			perPage: t.Optional(t.String({ default: "10" })),
			page: t.String({ default: "1" }),
		}),
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
