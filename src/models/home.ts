import { t } from "elysia";
import {
	SpotlightAnime,
	TrendingAnime,
	LatestEpisodeAnime,
	TopUpcomingAnime,
	Top10Anime,
	TopAiringAnime,
	MostPopularAnime,
	MostFavouriteAnime,
	LatestCompletedAnime,
} from "./item";

export const Home = t.Object({
	success: t.Boolean({ default: true }),
	data: t.Object({
		spotlightAnimes: t.Array(SpotlightAnime),
		trendingAnimes: t.Array(TrendingAnime),
		latestEpisodeAnimes: t.Array(LatestEpisodeAnime),
		topUpcomingAnimes: t.Array(TopUpcomingAnime),
		top10Animes: t.Object({
			today: t.Array(Top10Anime),
			week: t.Array(Top10Anime),
			month: t.Array(Top10Anime),
		}),
		topAiringAnimes: t.Array(TopAiringAnime),
		mostPopularAnimes: t.Array(MostPopularAnime),
		mostFavoriteAnimes: t.Array(MostFavouriteAnime),
		latestCompletedAnimes: t.Array(LatestCompletedAnime),
		genres: t.Array(t.String()),
	}),
});
