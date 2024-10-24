import Elysia from "elysia";
import compression from "elysia-compress";
import hia from "@/hianime";
import { Home } from "@/models/home";

const tags = ["Home"];
type HomeT = typeof Home.static;

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
			console.log(typeof Home.static);

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
