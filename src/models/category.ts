import { t } from "elysia";
import { CategoryAnime, Top10Anime } from "./anime";

export const Category = t.Object({
	success: t.Boolean({ default: true }),
	data: t.Object({
		animes: t.Array(CategoryAnime),
		genres: t.Array(t.String()),
		top10Animes: t.Object({
			today: t.Array(Top10Anime),
			week: t.Array(Top10Anime),
			month: t.Array(Top10Anime),
		}),
		category: t.String(),
		totalPages: t.Number(),
		hasNextPage: t.Boolean(),
		currentPage: t.Number(),
	}),
});
