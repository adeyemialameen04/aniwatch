import { HiAnimeError } from "aniwatch";
import { load as load2 } from "cheerio";
import { client } from "./client";
// import

var DOMAIN = "hianime.to";
var SRC_BASE_URL = `https://${DOMAIN}`;
var extractAnimes = ($, selector, scraperName) => {
	try {
		const animes = [];
		$(selector).each((_, el) => {
			const animeId =
				$(el)
					.find(".film-detail .film-name .dynamic-name")
					?.attr("href")
					?.slice(1)
					.split("?ref=search")[0] || null;
			animes.push({
				id: animeId,
				name: $(el)
					.find(".film-detail .film-name .dynamic-name")
					?.text()
					?.trim(),
				description: $(el).find(".film-detail .description")?.text()?.trim(),
				jname:
					$(el)
						.find(".film-detail .film-name .dynamic-name")
						?.attr("data-jname")
						?.trim() || null,
				poster:
					$(el)
						.find(".film-poster .film-poster-img")
						?.attr("data-src")
						?.trim() || null,
				duration: $(el)
					.find(".film-detail .fd-infor .fdi-item.fdi-duration")
					?.text()
					?.trim(),
				type: $(el)
					.find(".film-detail .fd-infor .fdi-item:nth-of-type(1)")
					?.text()
					?.trim(),
				rating: $(el).find(".film-poster .tick-rate")?.text()?.trim() || null,
				episodes: {
					sub:
						Number(
							$(el)
								.find(".film-poster .tick-sub")
								?.text()
								?.trim()
								.split(" ")
								.pop(),
						) || null,
					dub:
						Number(
							$(el)
								.find(".film-poster .tick-dub")
								?.text()
								?.trim()
								.split(" ")
								.pop(),
						) || null,
				},
			});
		});
		return animes;
	} catch (err) {
		throw HiAnimeError.wrapError(err, scraperName);
	}
};

export async function getGenreAnime(genreName, page) {
	const res = {
		genreName,
		animes: [],
		genres: [],
		topAiringAnimes: [],
		totalPages: 1,
		hasNextPage: false,
		currentPage: (Number(page) || 0) < 1 ? 1 : Number(page),
	};
	genreName = genreName === "martial-arts" ? "marial-arts" : genreName;
	try {
		if (genreName.trim() === "") {
			throw new HiAnimeError("invalid genre name", getGenreAnime.name, 400);
		}
		page = page < 1 ? 1 : page;
		const genreUrl = new URL(`/genre/${genreName}?page=${page}`, SRC_BASE_URL);
		const mainPage = await client.get(genreUrl.href);
		const $ = load2(mainPage.data);
		const selector = "#main-content .tab-content .film_list-wrap .flw-item";
		const genreNameSelector =
			"#main-content .block_area .block_area-header .cat-heading";
		res.genreName = $(genreNameSelector)?.text()?.trim() ?? genreName;
		res.hasNextPage =
			$(".pagination > li").length > 0
				? $(".pagination li.active").length > 0
					? $(".pagination > li").last().hasClass("active")
						? false
						: true
					: false
				: false;
		res.totalPages =
			Number(
				$('.pagination > .page-item a[title="Last"]')
					?.attr("href")
					?.split("=")
					.pop() ??
					$('.pagination > .page-item a[title="Next"]')
						?.attr("href")
						?.split("=")
						.pop() ??
					$(".pagination > .page-item.active a")?.text()?.trim(),
			) || 1;
		res.animes = extractAnimes($, selector, getGenreAnime.name);
		if (res.animes.length === 0 && !res.hasNextPage) {
			res.totalPages = 0;
		}
		return res;
	} catch (err) {
		throw HiAnimeError.wrapError(err, getGenreAnime.name);
	}
}
