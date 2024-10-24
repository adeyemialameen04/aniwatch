import { t } from "elysia";

const strOptional = t.Optional(t.String());

// Media Status enum as union
const MediaStatus = t.Union([
	t.Literal("Ongoing"),
	t.Literal("Completed"),
	t.Literal("Hiatus"),
	t.Literal("Cancelled"),
	t.Literal("Not yet aired"),
	t.Literal("Unknown"),
]);

// SubOrDub enum as union
const SubOrDub = t.Union([
	t.Literal("sub"),
	t.Literal("dub"),
	t.Literal("both"),
]);

// Title schema
const Title = t.Object({
	romaji: t.Optional(t.String()),
	english: t.Optional(t.Union([t.String(), t.Null()])),
	native: t.Optional(t.String()),
	userPreferred: t.Optional(t.String()),
});

// Base schemas
const AnimeTrailer = t.Object({
	id: t.String(),
	site: t.Optional(t.String()),
	thumbnail: t.Optional(t.String()),
	thumbnailHash: t.Optional(t.Union([t.String(), t.Null()])),
});

const FuzzyDate = t.Object({
	year: t.Optional(t.Union([t.Number(), t.Null()])),
	month: t.Optional(t.Union([t.Number(), t.Null()])),
	day: t.Optional(t.Union([t.Number(), t.Null()])),
});

export const IAnimeResult = t.Object({
	id: t.Union([t.String(), t.Number()]),
	title: t.Union([t.String(), Title]),
	url: t.Optional(t.String()),
	image: strOptional,
	imageHash: strOptional,
	cover: strOptional,
	coverHash: strOptional,
	description: strOptional,
	status: t.Optional(MediaStatus),
	rating: t.Optional(t.Number()),
	["type"]: t.Optional(t.String()),
	releaseDate: t.Optional(t.Union([t.String(), t.Number()])),
});

// Episode schema
const AnimeEpisode = t.Object({
	id: t.String(),
	title: t.Optional(t.String()),
	description: t.Optional(t.Union([t.String(), t.Null()])),
	number: t.Number(),
	image: t.Optional(t.String()),
	imageHash: t.Optional(t.String()),
});

// Complete anime info schema
export const AnimeInfo = t.Object({
	id: t.String(),
	title: t.Union([t.String(), Title]),
	image: strOptional,
	imageHash: strOptional,
	cover: strOptional,
	coverHash: strOptional,
	description: t.Optional(t.Union([t.String(), t.Null()])),
	status: t.Optional(MediaStatus),
	rating: t.Optional(t.Number()),
	["type"]: t.Optional(t.String()),
	releaseDate: t.Optional(t.Union([t.String(), t.Number()])),
	malId: t.Optional(t.Union([t.Number(), t.String()])),
	genres: t.Optional(t.Array(t.String())),
	synonyms: t.Optional(t.Array(t.String())),
	isLicensed: t.Optional(t.Boolean()),
	isAdult: t.Optional(t.Boolean()),
	countryOfOrigin: strOptional,
	trailer: t.Optional(AnimeTrailer),
	color: strOptional,
	startDate: t.Optional(FuzzyDate),
	endDate: t.Optional(FuzzyDate),
	totalEpisodes: t.Optional(t.Number()),
	season: strOptional,
	studios: t.Optional(t.Array(t.String())),
	subOrDub: t.Optional(SubOrDub),
	recommendations: t.Optional(t.Array(IAnimeResult)),
	relations: t.Optional(t.Array(IAnimeResult)),
	episodes: t.Optional(t.Array(AnimeEpisode)),
});

// Response wrapper
export const AnimeResponse = t.Object({
	success: t.Boolean(),
	data: AnimeInfo,
});
