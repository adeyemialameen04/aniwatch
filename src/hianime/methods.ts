import { client } from "./client";
import { load } from "cheerio";
import match from "string-similarity-js";
import { Megacloud } from "./extractors/megacloud";
import {
	ANILIST_BASEURL,
	ANIME_QUERY,
	HIANIME_BASEURL,
} from "./utils/constant";
import { AnilistAnime } from "./types";
import { anilistMediaDetailQuery, top100anime } from "./query";

// fetchAnilistInfo and call hianmie endpoints and return info with eps from hianime

export const fetchAnilistInfoBase = async (id: number) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		query: anilistMediaDetailQuery(id.toString()),
		variables: {
			id,
		},
	};

	try {
		let infoWithEp;

		const resp = await client.post(ANILIST_BASEURL, options, {
			validateStatus: () => true,
		});
		const data = resp.data.data.Media;

		infoWithEp = {
			...data,
			recommendations: data.recommendations.edges.map(
				(el) => el.node.mediaRecommendation,
			),
			relations: data.relations.edges.map((el) => ({ id: el.id, ...el.node })),
			characters: data.characters.edges.map((el) => ({
				role: el.role,
				...el.node,
				voiceActors: el.voiceActors,
			})),
		};

		return infoWithEp;
	} catch (err: any) {
		console.error(err);
		return null;
	}
};

export const fetchAnilistInfo = async (id: number) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		query: anilistMediaDetailQuery(id.toString()),
		// query: ANIME_QUERY,
		variables: {
			id,
		},
	};

	try {
		let infoWithEp;

		const resp = await client.post(ANILIST_BASEURL, options, {
			validateStatus: () => true,
		});
		const data = resp.data.data.Media;
		const eps = await searchNScrapeEPs(data.title);
		// const allEpisodes = await searchNScrapeEPs(data.title);

		infoWithEp = {
			...data,
			episodesList: eps,
			recommendations: data.recommendations.edges.map(
				(el) => el.node.mediaRecommendation,
			),
			relations: data.relations.edges.map((el) => ({ id: el.id, ...el.node })),
			characters: data.characters.edges.map((el) => ({
				role: el.role,
				...el.node,
				voiceActors: el.voiceActors,
			})),
		};

		return infoWithEp;
	} catch (err: any) {
		console.error(err);
		return null;
	}
};

export const fetchTop100 = async (page: Number, perPage: number) => {
	const options = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		query: top100anime,
		variables: {
			page,
			perPage,
		},
	};

	try {
		const resp = await client.post(ANILIST_BASEURL, options, {
			validateStatus: () => true,
		});
		console.log(resp.data);

		return await resp.data.data.Page.media;
	} catch (err: any) {
		console.error(err);
		return null;
	}
};

export const fetchAnimeEpisodes = async (
	id: number,
	pageIndex: number,
	limit: number,
) => {
	try {
		// Fetch anime data from the API
		const resp = await client.post<any, { data: { data: AnilistAnime } }>(
			ANILIST_BASEURL,
			{
				query: ANIME_QUERY,
				variables: { id },
			},
		);

		const mediaData = resp.data.data.Media;

		if (!mediaData) {
			throw new Error("Media data not found");
		}

		// Search for all episodes
		const allEpisodes = await searchNScrapeEPs(mediaData.title);
		const totalItems = allEpisodes?.length || 0;

		// Calculate start and end index for pagination
		const startIndex = pageIndex * limit;
		const endIndex = startIndex + limit;
		const paginatedEpisodes = allEpisodes?.slice(startIndex, endIndex) || [];

		return {
			episodes: paginatedEpisodes,
			pageIndex,
			totalItems,
			isLastPage: endIndex >= totalItems,
			limit,
		};
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error("Error fetching anime episodes:", err.message);
		} else {
			console.error("An unexpected error occurred:", err);
		}
		return null;
	}
};

// search with title in hianime and call ep scraping func
export const searchNScrapeEPs = async (searchTitle: Title) => {
	const lol =
		searchTitle.english || searchTitle.romaji || searchTitle.userPreferred;
	console.log(searchTitle);
	try {
		const resp = await client.get(`${HIANIME_BASEURL}/search?keyword=${lol}`);
		if (!resp) return console.log("No response from hianime !");
		const $ = load(resp.data);
		let similarTitles: { id: string; title: string; similarity: number }[] = [];
		$(".film_list-wrap > .flw-item .film-detail .film-name a")
			.map((i, el) => {
				const title = $(el).text();
				const id = $(el).attr("href")!.split("/").pop()?.split("?")[0] ?? "";
				const similarity = Number(
					(
						match(
							title.replace(/[\,\:]/g, ""),
							searchTitle.english || searchTitle.native,
						) * 10
					).toFixed(2),
				);
				similarTitles.push({ id, title, similarity });
			})
			.get();

		similarTitles.sort((a, b) => b.similarity - a.similarity);

		if (
			(lol.match(/\Season(.+?)\d/) &&
				similarTitles[0].title.match(/\Season(.+?)\d/)) ||
			(!lol.match(/\Season(.+?)\d/) &&
				!similarTitles[0].title.match(/\Season(.+?)\d/))
		)
			return getEpisodes(similarTitles[0].id);
		else return getEpisodes(similarTitles[1].id);
	} catch (err) {
		console.error(err);
		return null;
	}
};

// calls ep watch endpoint in hianmie and scrapes all eps and returns them in arr
export const getEpisodes = async (animeId: string) => {
	try {
		const resp = await client.get(
			`${HIANIME_BASEURL}/ajax/v2/episode/list/${animeId.split("-").pop()}`,
			{
				headers: {
					referer: `${HIANIME_BASEURL}/watch/${animeId}`,
					"X-Requested-With": "XMLHttpRequest",
				},
			},
		);
		const $ = load(resp.data.html);
		let episodesList: {
			id: string;
			episodeId: number;
			title: string;
			number: number;
		}[] = [];
		$("#detail-ss-list div.ss-list a").each((i, el) => {
			episodesList.push({
				id: $(el).attr("href")?.split("/").pop() ?? "",
				episodeId: Number($(el).attr("href")?.split("?ep=").pop()),
				title: $(el).attr("title") ?? "",
				number: i + 1,
			});
		});
		console.log(episodesList);

		return episodesList;
	} catch (err) {
		console.error(err);
		return { episodesList: null };
	}
};

// call server to get ep servers
export const getServers = async (epId: string) => {
	try {
		const resp = await client(
			`${HIANIME_BASEURL}/ajax/v2/episode/servers?episodeId=${epId}`,
			{
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					referer: `${HIANIME_BASEURL}/watch/${epId}`,
				},
			},
		);

		const $ = load(resp.data.html);

		let servers: {
			sub: { serverId: string | null; serverName: string }[];
			dub: { serverId: string | null; serverName: string }[];
		} = {
			sub: [],
			dub: [],
		};

		$(".ps_-block.ps_-block-sub .ps__-list .server-item").each((i, el) => {
			const $parent = $(el).closest(".servers-sub, .servers-dub");
			const serverType = $parent.hasClass("servers-sub") ? "sub" : "dub";
			servers[serverType].push({
				serverId: $(el).attr("data-id") ?? null,
				serverName: $(el).text().replaceAll("\n", "").trim(),
			});
		});

		return servers;
	} catch (err) {
		console.error(err);
		return { servers: null };
	}
};

// get sources of ep
export const getSources = async (serverId: string, epId: string) => {
	try {
		const res = await client(
			`${HIANIME_BASEURL}/ajax/v2/episode/sources?id=${serverId}`,
			{
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					referer: `${HIANIME_BASEURL}/watch/${epId}`,
				},
			},
		);

		const link = res.data.link;
		if (!link) return { sources: null };

		let sources!: Sourcedata | { sources: null };
		if (String(link).includes("megacloud"))
			sources = await new Megacloud(res.data.link).scrapeMegaCloud();
		else if (String(link).includes("watchsb")) sources = { sources: null };
		else if (String(link).includes("streamtape")) sources = { sources: null };
		else {
			sources = { sources: null };
			console.log("Unknown link !");
		}
		return sources;
	} catch (err) {
		console.error(err);
		return { sources: null };
	}
};
