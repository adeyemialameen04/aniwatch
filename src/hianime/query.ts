const anilistMediaDetailQuery = (id: string) => `
  query ($id: Int = ${id}) {
    Media(id: $id) {
      id
      idMal
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
      externalLinks {
        url
        site
        type
        language
      }
      coverImage {
        extraLarge
        large
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      bannerImage
      season
      seasonYear
      description
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      trailer {
        id
        site
        thumbnail
      }
      genres
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
      recommendations {
        edges {
          node {
            id
            mediaRecommendation {
              id
              idMal
              title {
                romaji
                english
                native
                userPreferred
              }
              status
              episodes
              coverImage {
                extraLarge
                large
                medium
                color
              }
              bannerImage
              format
              chapters
              meanScore
              nextAiringEpisode {
                episode
                timeUntilAiring
                airingAt
              }
            }
          }
        }
      }
      relations {
        edges {
          id
          relationType
          node {
            id
            idMal
            status
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            title {
              romaji
              english
              native
              userPreferred
            }
            episodes
            chapters
            format
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            meanScore
          }
        }
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export { anilistMediaDetailQuery };

export const top100anime = `
query($perPage: Int, $page: Int) {
    Page(page: $page, perPage: $perPage) {
        pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
        }
        media (sort :SCORE_DESC, type : ANIME){
            id
            idMal
            title {
                romaji
                english
                userPreferred
                native
            }
            coverImage {
                large
                extraLarge
                color
            }
            bannerImage
            episodes
            description
            status
            duration
            genres
            season
            format
            averageScore
            popularity
            nextAiringEpisode {
                airingAt
                episode
              }
              seasonYear
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
        }
    }
}`;
