import { InternalServerError, NotFoundError } from "@/exceptions/errors";
import hia from "@/hianime";
import { ERRORS } from "@/models/errors";
import { Genre } from "@/models/genre";
import { HiAnimeError } from "aniwatch";
import Elysia, { t } from "elysia";

const tags = ["Browse", "HiAnime"];
export default new Elysia({ name: "api.genre", tags })
	.model("Genre", Genre)
	.get(
		"",
		async ({ params: { name }, query: { page } }) => {
			try {
				const data = await hia.getGenreAnime(name.trim(), Number(page) || 1);

				return {
					success: true,
					data,
				};
			} catch (err) {
				if (err instanceof HiAnimeError) {
					if (err.scraper === "getGenreAnime") {
						throw new NotFoundError("Genre not found");
					}
				}

				throw new InternalServerError("An unexpected error occurred");
			}
		},
		{
			response: {
				200: "Genre",
				500: ERRORS.INTERNAL_SERVER_ERROR,
				404: ERRORS.NOT_FOUND,
			},
			detail: {
				summary: "Retrieve a List of Animes by Genre",
				description:
					"This endpoint allows users to retrieve a paginated list of anime titles belonging to a specific genre. The anime are filtered based on the provided genre name, and users can navigate through different pages using the `page` query parameter. If the requested genre is not found, a 404 error is returned.",
			},
			params: t.Object({
				name: t.String({ default: "shounen" }),
			}),
			query: t.Object({
				page: t.String({ default: "1" }),
			}),
		},
	);
