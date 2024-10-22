import Elysia from "elysia";
import { HiAnime } from "aniwatch";
import { Home } from "../../models/home";
import compression from "elysia-compress";

const hia = new HiAnime.Scraper();

const tags = ["Home"];
export default new Elysia({ name: "api.home", tags })
	.model("Home", Home)
	.use(
		compression({
			as: "local",
			encodings: ["deflate", "gzip"],
			TTL: 3600,
		}),
	)
	.get(
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
