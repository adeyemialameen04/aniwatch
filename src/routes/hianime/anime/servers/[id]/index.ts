import anilist from "@/consumet";
import hia from "@/hianime";
import { getServers } from "@/hianime/methods";
import Elysia, { t } from "elysia";

const tags = ["HiAnime"];
export default new Elysia({ name: "api.ailist.servers", tags }).get(
	"",
	async ({ params: { id } }) => {
		const data = await getServers(id);

		return {
			success: true,
			data,
		};
	},
	{
		params: t.Object({
			id: t.String({ default: "21" }),
		}),
		detail: {
			summary: "Get Servers",
		},
	},
);
