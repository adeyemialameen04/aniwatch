import { t } from "elysia";
import { GenreAnime, TopAiringAnime } from "./anime";

export const Genre = t.Object({
	success: t.Boolean({ default: true }),
	data: t.Object({
		genreName: t.String(),
		animes: t.Array(GenreAnime),
		genres: t.Array(t.String()),
		topAiringAnimes: t.Array(TopAiringAnime),
		totalPages: t.Number(),
		hasNextPage: t.Boolean(),
		currentPage: t.Number(),
	}),
});
