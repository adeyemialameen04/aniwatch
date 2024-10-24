import { t } from "elysia";

export const AiringAnime = t.Object({
	currentPage: t.Number(),
	hasNextPage: t.Boolean(),
	results: t.Array(
		t.Object({
			id: t.String(),
			title: t.String(),
			image: t.String(),
			url: t.String(),
			genres: t.Array(t.String()),
			episodeId: t.String(),
			episodeNumber: t.Number(),
		}),
	),
});
