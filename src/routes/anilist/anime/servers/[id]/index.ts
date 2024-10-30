import { getServers } from "@/hianime/methods";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.ailist.servers", tags }).get(
	"",
	async ({ params: { id }, query: { pageIndex, limit } }) => {
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
	},
);
