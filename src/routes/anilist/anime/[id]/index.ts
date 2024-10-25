import { fetchAnilistInfo } from "@/hianime/methods";
import { redis } from "@atakan75/elysia-redis";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];

export default new Elysia({ name: "api.anilist.animeInfo2", tags })
	.use(redis())
	.get(
		"",
		async ({ params: { id }, redis }) => {
			const data = await fetchAnilistInfo(Number(id));

			return {
				success: true,
				data,
			};
		},
		{
			// Optional response schema (if needed)
			// response: {
			// 	200: t.Object({
			// 		success: t.Boolean(),
			// 		data: AnimeInfo,
			// 	}),
			// },
			params: t.Object({
				id: t.String({ default: "163134" }), // Set default value for `id`
			}),
			detail: {
				summary: "Get Anime Info Sweet Spot",
				description: "Gets the info of an anime by anilist ID",
			},
		},
	);
