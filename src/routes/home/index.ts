import Elysia from "elysia";
import { HiAnime } from "aniwatch";

const hia = new HiAnime.Scraper();

const tags = ["Home"];
export default new Elysia({ name: "api.index", tags }).get(
	"",
	async () => {
		const data = await hia.getHomePage();
		return {
			success: true,
			data,
		};
	},
	{
		detail: {
			summary: "Get Homepage",
			description: "Gets the current Homepage of Aniwatch",
		},
	},
);
