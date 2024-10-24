import hia from "@/hianime";
import { Category } from "@/models/category";
import { ERRORS } from "@/models/errors";
import { HiAnime, HiAnimeError } from "aniwatch";
import Elysia, { InternalServerError, NotFoundError, t } from "elysia";

const tags = ["Browse"];
export default new Elysia({ name: "api.category", tags })
	.model("Category", Category)
	.get(
		"",
		async ({ params: { name }, query: { page }, set }) => {
			try {
				const data = await hia.getCategoryAnime(
					name.trim() as HiAnime.AnimeCategories,
					Number(page) || 1,
				);

				return {
					success: true,
					data,
				};
			} catch (err) {
				if (err instanceof HiAnimeError) {
					if (err.scraper === "getAnimeCategory") {
						throw new NotFoundError("Category not found");
					}
				}

				throw new InternalServerError("An unexpected error occurred");
			}
		},
		{
			response: {
				200: "Category",
				500: ERRORS.INTERNAL_SERVER_ERROR,
				404: ERRORS.NOT_FOUND,
			},
			detail: {
				summary: "Retrieve a List of Animes by Category",
				description:
					"This endpoint allows users to retrieve a paginated list of anime titles belonging to a specific category. The anime are filtered based on the provided category name, and users can navigate through different pages using the `page` query parameter. If the requested category is not found, a 404 error is returned.",
			},
			params: t.Object({
				name: t.String({ default: "most-popular" }),
			}),
			query: t.Object({
				page: t.String({ default: "1" }),
			}),
		},
	);
