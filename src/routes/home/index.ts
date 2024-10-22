import Elysia from "elysia";
import { HiAnime } from "aniwatch";
import { Home } from "../../models/home";

const hia = new HiAnime.Scraper();

const tags = ["Home"];
export default new Elysia({ name: "api.home", tags }).model("Home", Home).get(
	"",
	async () => {
		const data = await hia.getHomePage();
		return {
			success: true,
			data,
		};
	},
	{
		response: {
			200: "Home",
		},
		detail: {
			summary: "Get Homepage",
			description: "Gets the current Homepage of Aniwatch",
		},
	},
);
