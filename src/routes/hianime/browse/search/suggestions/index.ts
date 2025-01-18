import hia from "@/hianime";
import Elysia, { t } from "elysia";

const tags = ["HiAnime"];
export default new Elysia({ name: "api.hianime.search.suggestions", tags }).get(
	"",
	async ({ query: { q } }) => {
		const data = await hia.searchSuggestions(q);

		return {
			success: true,
			data,
		};
	},
	{
		query: t.Object({
			q: t.String({ default: "one-piece" }),
		}),
		detail: {
			summary: "Search for anime",
		},
	},
);
