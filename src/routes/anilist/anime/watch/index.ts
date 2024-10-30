import { getServers } from "@/hianime/methods";
import Elysia, { t } from "elysia";

export default new Elysia({ name: "api.anilist.watch" }).get(
	"",
	async ({ query: { episodeId, serverId } }) => {
		const servers = await getServers(serverId);
		// const sources = await
	},
	{
		query: t.Object({
			serverId: t.String(),
			episodeId: t.String(),
		}),
	},
);
