const anilistMediaDetailQuery = (id: string) => `
  query ($id: Int = ${id}) {
    Media(id: $id) {
      id
      title {
        english
        native
        romaji
        userPreferred
      }
      synonyms
      countryOfOrigin
      isLicensed
      isAdult
      coverImage {
        extraLarge
        large
        color
      }
      bannerImage
      season
      seasonYear
      format
      status(version: 2)
      episodes
      description
      duration
      chapters
      volumes
      trailer {
        id
        site
        thumbnail
      }
      source
      averageScore
      popularity
      meanScore
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      characters(sort: ROLE) {
        edges {
          role
          node {
            id
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
          }
          voiceActors(sort: LANGUAGE) {
            id
            languageV2
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
          }
        }
      }
    }
  }
`;
export default anilistMediaDetailQuery;
