import { HiAnime, HiAnimeError } from "aniwatch";
import Elysia, { t } from "elysia";
import hia from "../../../hianime";
import { Category } from "../../../models/category";
import { NotFoundError } from "../../../exceptions/errors";
import { ERRORS } from "../../../models/errors";

export default new Elysia({ name: "api.category" })
	.model("Category", Category)
	.get(
		"",
		async ({ params: { name }, query: { page }, set }) => {
			try {
				const data = await hia.getCategoryAnime(
					name.trim() as HiAnime.AnimeCategories,
					Number(page) || 1,
				);
				console.log(data ? "true" : "false");

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

				set.status = "Not Found";
				return {
					success: false,
					message: "An error occurred",
				};
			}
		},
		{
			response: {
				200: "Category",
				500: ERRORS.INTERNAL_SERVER_ERROR,
				404: ERRORS.NOT_FOUND,
			},
			detail: {
				summary: "Get Animes by Category",
				description: "Gets a list of animes by their categories",
			},
			params: t.Object({
				name: t.String(),
			}),
			query: t.Object({
				page: t.String(),
			}),
		},
	);
