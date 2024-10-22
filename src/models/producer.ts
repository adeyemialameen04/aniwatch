import { t } from "elysia";
import { ProducerAnime, Top10Animes } from "./anime";

export const Producer = t.Object({
	success: t.Boolean({ default: true }),
	data: t.Object({
		producerName: t.String(),
		animes: t.Array(ProducerAnime),
		top10Animes: Top10Animes,
		totalPages: t.Number(),
		hasNextPage: t.Boolean(),
		currentPage: t.Number(),
	}),
});
