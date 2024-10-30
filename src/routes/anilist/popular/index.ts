import anilist, { gogoAnime, animePahe, anify, animeFox } from "@/consumet";
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
		const data = await anify.fetchAnimeInfoByAnilistId("171018", "9anime");
		// const data = await anilist.provider.fetchAnimeInfoByAnilistId(
		// 	"171018",
		// 	// Number(page || 1),
		// 	// Number(perPage) || 10,
		// );

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
			summary: "Get Popular Animes from anilist",
		},
	},
);
