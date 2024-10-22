import { t } from "elysia";
import { CategoryAnime, Top10Animes } from "./anime";

export const Category = t.Object({
	success: t.Boolean({ default: true }),
	data: t.Object({
		animes: t.Array(CategoryAnime),
		genres: t.Array(t.String()),
		top10Animes: Top10Animes,
	}),
});
