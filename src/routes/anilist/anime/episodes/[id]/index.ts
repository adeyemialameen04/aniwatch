import anilist, { gogoAnime } from "@/consumet";
import { getEpisodes } from "@/consumet/clone";
import { AxiosError } from "axios";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.ailist.episodes", tags }).get(
	"",
	async ({ params: { id }, query: { subOrDub } }) => {
		// const data2 = await gogoAnime.fetchEpisodeSources(id);
		// console.log(data2);
		// const data = await anilist.fetchEpisodesListById(
		// 	id,
		// 	subOrDub === "dub",
		// 	true,
		// );
		// const data = await anilist.fetchEpisodesListById(id);

		// const data = gogoAnime.(id);

		try {
			const data = await getEpisodes(id);
			if (data) {
				return {
					success: true,
					data,
				};
			}
		} catch (err) {
			if (err instanceof Error) throw new Error(err.message);
		}

		// const data = await anilist.fetchEpisodesListById(id).catch(async (err) => {
		// 	if (err instanceof AxiosError) {
		// 		console.log(err.response?.data);
		// 	}
		// });
	},
	{
		params: t.Object({
			id: t.String({ default: "21" }),
		}),
		query: t.Object({
			subOrDub: t.String({ default: "sub" }),
		}),
		detail: {
			summary: "Get Episode lists",
		},
	},
);
