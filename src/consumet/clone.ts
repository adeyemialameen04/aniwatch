import { client } from "@/hianime/client";
import { ANILIST_BASEURL } from "@/hianime/utils/constant";
import { anify } from ".";

export async function getEpisodes(id: string) {
	var _b, _c;
	const options = {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		query: `query($id: Int = ${id}){ Media(id: $id){ idMal externalLinks { site url } title { romaji english } status season episodes startDate { year month day } endDate { year month day }  coverImage {extraLarge large medium} } }`,
	};
	try {
		const {
			data: {
				data: { Media },
			},
		} = await client.post(ANILIST_BASEURL, options);

		if (Media.status === "RELEASING") {
			let possibleAnimeEpisodes = [];
			let fillerEpisodes = [];
			// const lol = await anify.fetchAnimeInfoByAnilistId(id);

			// possibleAnimeEpisodes =
			// 	(_c = (await new Anify().fetchAnimeInfoByAnilistId(id, "gogoanime"))
			// 		.episodes) === null || _c === void 0
			// 		? void 0
			// 		: _c.map((item) => ({
			// 				id: item.slug,
			// 				title: item.title,
			// 				description: item.description,
			// 				number: item.number,
			// 				image: item.image,
			// 				// imageHash: (0, utils_2.getHashFromImage)(item.image),
			// 			}));

			// console.log(lol);

			// if (!possibleAnimeEpisodes.length) {
			//   possibleAnimeEpisodes = await this.fetchDefaultEpisodeList(Media, dub, id);
			//   possibleAnimeEpisodes = possibleAnimeEpisodes === null || possibleAnimeEpisodes === void 0 ? void 0 : possibleAnimeEpisodes.map((episode) => {
			//     var _b, _c, _d, _e;
			//     if (!episode.image) {
			//       episode.image =
			//         (_c = (_b = Media.coverImage.extraLarge) !== null && _b !== void 0 ? _b : Media.coverImage.large) !== null && _c !== void 0 ? _c : Media.coverImage.medium;
			//       episode.imageHash = (0, utils_2.getHashFromImage)((_e = (_d = Media.coverImage.extraLarge) !== null && _d !== void 0 ? _d : Media.coverImage.large) !== null && _e !== void 0 ? _e : Media.coverImage.medium);
			//     }
			//     return episode;
			//   });
			// }

			return Media;
		}
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}
