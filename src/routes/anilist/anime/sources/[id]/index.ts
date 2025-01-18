import anilist from "@/consumet";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.anilist.watch", tags }).get(
	"",
	async ({ params: { id } }) => {
		const data = await anilist.fetchEpisodeSources(id);
		// const lol = await hia.getEpisodeSources(episodeId);

		return {
			success: true,
			// lol,
			data,
		};
	},
	{
		params: t.Object({
			id: t.String(),
		}),
	},
);
