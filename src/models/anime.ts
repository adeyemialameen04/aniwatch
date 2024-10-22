import { t, TSchema } from "elysia";

const Episode = t.Object({
	sub: t.Union([t.Number(), t.Null()]),
	dub: t.Union([t.Number(), t.Null()]),
});

const canBeNull = (type: TSchema, def: string | number | boolean): TSchema => {
	return t.Union([t.Null(), type], { default: def });
};

const strNull = () => canBeNull(t.String(), "");
const numNull = () => canBeNull(t.Number(), 0);

const Anime = t.Object({
	rank: numNull(),
	// id: t.Union([t.Null(), t.String()], { default: "" }),
	id: strNull(),
	poster: strNull(),
	jname: strNull(),
	name: strNull(),
});

export const SpotlightAnime = t.Object({
	...Anime.properties,
	description: strNull(),
	episodes: Episode,
	type: strNull(),
	otherInfo: t.Array(t.String()),
});

export const TrendingAnime = t.Object({
	...Anime.properties,
});

export const LatestEpisodeAnime = t.Object({
	...t.Omit(Anime, ["rank"]).properties,
	duration: strNull(),
	type: strNull(),
	rating: t.Union([t.Null(), t.String()]),
	episodes: Episode,
});
export const CategoryAnime = LatestEpisodeAnime;
export const GenreAnime = LatestEpisodeAnime;

export const TopUpcomingAnime = t.Object({
	...LatestEpisodeAnime.properties,
});

export const Top10Anime = t.Object({
	...Anime.properties,
	episodes: Episode,
});

export const TopAiringAnime = t.Object({
	...t.Omit(Anime, ["rank"]).properties,
	type: strNull(),
	episodes: Episode,
});

export const MostPopularAnime = t.Object({
	...t.Omit(Top10Anime, ["rank"]).properties,
});
export const MostFavouriteAnime = t.Object({
	...t.Omit(Top10Anime, ["rank"]).properties,
});
export const LatestCompletedAnime = t.Object({
	...t.Omit(Top10Anime, ["rank"]).properties,
});
