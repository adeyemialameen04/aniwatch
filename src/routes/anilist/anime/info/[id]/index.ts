import { fetchAnilistInfoBase } from "@/hianime/methods";
import { redis } from "@atakan75/elysia-redis";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];

export default new Elysia({ name: "api.anilist.animeInfo2", tags })
	.use(redis())
	.get(
		"",
		async ({ params: { id }, redis }) => {
			// const data = await fetchAnilistInfo(Number(id));

			const data = await fetchAnilistInfoBase(Number(id));
			// const sources = await anify.fetchEpisodeSources(
			// 	"one-piece-episode-1",
			// 	1,
			// 	21,
			// );
			// console.log(sources);
			// // const data = await anilist.(id);
			// console.log(data.episodes[0]);
			// // console.log(lol);

			// const data = await anilist.fetchEpisodeSources(id);

			return {
				success: true,
				data: data,
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
