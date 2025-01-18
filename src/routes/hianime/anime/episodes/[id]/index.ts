import { getEpisodes } from "@/hianime/methods";
import Elysia, { t } from "elysia";

const tags = ["HiAnime"];
export default new Elysia({ name: "api.hianime.episodes", tags }).get(
	"",
	async ({ params: { id } }) => {
		const data = await getEpisodes(id);

		return {
			success: true,
			data,
		};
	},
	{
		detail: {
			summary: "Get Anime Episodes",
		},
		params: t.Object({
			id: t.String({
				default:
					"one-piece-movie-9-episode-of-chopper-plus-fuyu-ni-saku-kiseki-no-sakura-1481",
			}),
		}),
	},
);
