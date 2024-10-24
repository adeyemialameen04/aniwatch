import anilist from "@/consumet";
import { AnimeInfo } from "@/models/gogoanime/anime";
import Elysia, { t } from "elysia";

const tags = ["Anilist"];
export default new Elysia({ name: "api.hianime.animeInfo", tags }).get(
	"",
	async ({ params: { id } }) => {
		const data = await anilist.fetchAnimeInfo(id);

		return {
			success: true,
			data,
		};
	},
	{
		response: {
			200: t.Object({
				success: t.Boolean(),
				data: AnimeInfo,
			}),
		},
		params: t.Object({
			id: t.String({ default: "163134" }),
		}),
	},
);
