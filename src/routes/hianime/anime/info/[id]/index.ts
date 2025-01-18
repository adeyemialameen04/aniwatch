import hia from "@/hianime";
import { client } from "@/hianime/client";
import anilistMediaDetailQuery from "@/hianime/image";
import { getEpisodes } from "@/hianime/methods";
import { ANILIST_BASEURL } from "@/hianime/utils/constant";
import Elysia, { t } from "elysia";

const tags = ["HiAnime"];

const getAnilistInfo = async (anilistId: number) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		query: anilistMediaDetailQuery(anilistId.toString()),
		variables: {
			anilistId,
		},
	};

	try {
		const resp = await client.post(ANILIST_BASEURL, options, {
			validateStatus: () => true,
		});
		const data = resp.data.data.Media;
		return data;
	} catch (err) {
		console.error(err);
	}
};

export default new Elysia({ name: "api.hianime.animeInfo", tags }).get(
	"",
	async ({ params: { id } }) => {
		const [data, episodes] = await Promise.all([
			hia.getInfo(id),
			getEpisodes(id),
		]);
		const anilistData = await getAnilistInfo(
			data.anime.info.anilistId as number,
		);

		return {
			success: true,
			data: {
				episodes,
				anilist: anilistData,
				hianime: data,
			},
		};
	},
	{
		params: t.Object({
			id: t.String(),
		}),
		detail: {
			summary: "Get Anime info",
		},
	},
);
