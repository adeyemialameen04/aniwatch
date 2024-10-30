import anilist, { anify, gogoAnime } from "@/consumet";
import hia from "@/hianime";
import { fetchAnimeEpisodes } from "@/hianime/methods";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.ailist.episodes", tags }).get(
	"",
	async ({ params: { id }, query: { subOrDub } }) => {
		const data = await anilist.fetchEpisodesListById(
			id,
			subOrDub === "dub",
			true,
		);
		// const data = await anilist.fetchEpisodesListById(id);

		// const data = gogoAnime.(id);

		return {
			success: true,
			data,
			// data: data.slice(0, 10),
		};
	},
	{
		params: t.Object({
			id: t.String({ default: "21" }),
		}),
		query: t.Object({
			subOrDub: t.String({ default: "dub" }),
		}),
		detail: {
			summary: "Get Episode lists",
		},
	},
);
