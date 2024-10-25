import { fetchAnimeEpisodes } from "@/hianime/methods";
import Elysia, { t } from "elysia";

export default new Elysia({ name: "api.ailist.episodes" }).get(
	"",
	async ({ params: { id }, query: { page, perPage } }) => {
		const data = await fetchAnimeEpisodes(
			Number(id),
			Number(page),
			Number(perPage),
		);
		return data;
	},
	{
		params: t.Object({
			id: t.String({ default: "21" }),
		}),
		query: t.Object({
			page: t.String({ default: "1" }),
			perPage: t.String({ default: "10" }),
		}),
	},
);
