import hia from "@/hianime";
import Elysia, { t } from "elysia";

export default new Elysia({ name: "api.hianime.animeInfo" }).get(
	"",
	async ({ params: { id } }) => {
		const data = await hia.getInfo(id);

		return {
			success: true,
			data,
		};
	},
	{
		params: t.Object({
			id: t.String(),
		}),
	},
);
