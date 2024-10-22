import { t } from "elysia";

const Episode = t.Object({
	sub: t.Number(),
	dub: t.Number(),
});

const Anime = t.Object({
	rank: t.Number(),
	id: t.String(),
	poster: t.String(),
	jname: t.String(),
	name: t.String(),
});

export const SpotlightAnime = t.Object({
	...Anime.properties,
	description: t.String(),
	episodes: Episode,
	type: t.String(),
	otherInfo: t.Array(t.String()),
});

export const TrendingAnime = t.Object({
	...Anime.properties,
});

export const LatestEpisodeAnime = t.Object({
	...t.Omit(Anime, ["rank"]).properties,
	duration: t.String(),
	type: t.String(),
	rating: t.Null(t.String()),
	episodes: Episode,
});

export const TopUpcomingAnime = t.Object({
	...LatestEpisodeAnime.properties,
});

export const Top10Anime = t.Object({
	...Anime.properties,
	episodes: Episode,
});

export const TopAiringAnime = t.Object({
	...t.Omit(Anime, ["rank"]).properties,
	type: t.String(),
	episodes: Episode,
});

export const MostPopularAnime = Top10Anime;
export const MostFavouriteAnime = Top10Anime;
export const LatestCompletedAnime = Top10Anime;
