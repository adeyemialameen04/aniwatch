import hia from "@/hianime";
import { getSources } from "@/hianime/methods";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.anilist.watch", tags }).get(
	"",
	async ({ query: { episodeId, serverId } }) => {
		const data = await getSources(serverId, episodeId);
		// const lol = await hia.getEpisodeSources(episodeId);

		return {
			success: true,
			// lol,
			data,
		};
	},
	{
		query: t.Object({
			serverId: t.String(),
			episodeId: t.String(),
		}),
	},
);
