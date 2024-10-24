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

// Convert enums to string literals
const MediaStatus = t.Union([
	t.Literal("Ongoing"),
	t.Literal("Completed"),
	t.Literal("Hiatus"),
	t.Literal("Cancelled"),
	t.Literal("Not yet aired"),
	t.Literal("Unknown"),
]);

const SubOrSub = t.Union([
	t.Literal("sub"),
	t.Literal("dub"),
	t.Literal("both"),
]);

// Convert interfaces to object schemas
const ITitle = t.Object({
	romaji: t.Optional(t.String()),
	english: t.Optional(t.String()),
	native: t.Optional(t.String()),
	userPreferred: t.Optional(t.String()),
});

export const IAnimeResult = t.Object({
	id: t.String(),
	// title: t.Union([t.String(), ITitle]),
	url: t.Optional(t.String()),
	image: t.Optional(t.String()),
	imageHash: t.Optional(t.String()),
	cover: t.Optional(t.String()),
	coverHash: t.Optional(t.String()),
	status: t.Optional(MediaStatus),
	rating: t.Optional(t.Number()),
	// ["typeo"]: t.Optional(t.String()),
	releaseDate: t.Optional(t.Union([t.String(), t.Number()])),
	// ...t.Record(t.String(), t.Any()),
});
