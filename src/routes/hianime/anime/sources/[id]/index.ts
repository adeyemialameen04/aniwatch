import anilist from "@/consumet";
import hia from "@/hianime";
import { getSources } from "@/hianime/methods";
import Elysia, { t } from "elysia";

const tags = ["HiAnime"];
export default new Elysia({ name: "api.anilist.watch", tags }).get(
	"",
	async ({ params: { id }, query: { serverId } }) => {
		const data = await getSources(serverId, id);
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
		query: t.Object({
			serverId: t.String(),
		}),
	},
);
