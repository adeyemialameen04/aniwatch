import anilist, { gogoAnime } from "@/consumet";
import { AnimeInfo } from "@/models/gogoanime/anime";
import { redis } from "@atakan75/elysia-redis";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];

export default new Elysia({ name: "api.anilist.animeInfo", tags })
	.use(redis())
	.get(
		"",
		async ({ params: { id }, redis }) => {
			const cachedData = await redis.get(id);

			let data;
			if (cachedData) {
				data = JSON.parse(cachedData);
				console.log("Data retrieved from cache");
			} else {
				data = await anilist.fetchAnimeInfo(id);
				await redis.set(id, JSON.stringify(data), 60);
				console.log("Data fetched from API and cached");
			}

			return {
				success: true,
				data, // Always return the data (cached or freshly fetched)
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
		},
	);
