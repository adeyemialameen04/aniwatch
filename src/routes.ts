import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/hianime/home/index";
import type Route1 from "./routes/anilist/anime/watch/index";
import type Route2 from "./routes/anilist/anime/sources/index";
import type Route3 from "./routes/anilist/popular/index";
import type Route4 from "./routes/anilist/trending/index";
import type Route5 from "./routes/anilist/top/index";
import type Route6 from "./routes/hianime/browse/genre/[name]/index";
import type Route7 from "./routes/hianime/browse/producer/[name]/index";
import type Route8 from "./routes/hianime/browse/anime/[id]/index";
import type Route9 from "./routes/hianime/browse/category/[name]/index";
import type Route10 from "./routes/anilist/anime/info/[id]/index";
import type Route11 from "./routes/anilist/anime/servers/[id]/index";
import type Route12 from "./routes/anilist/anime/episodes/[id]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1/hianime/home", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1/anilist/anime/watch", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1/anilist/anime/sources", typeof Route2>
              & ElysiaWithBaseUrl<"/api/v1/anilist/popular", typeof Route3>
              & ElysiaWithBaseUrl<"/api/v1/anilist/trending", typeof Route4>
              & ElysiaWithBaseUrl<"/api/v1/anilist/top", typeof Route5>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/genre/:name", typeof Route6>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/producer/:name", typeof Route7>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/anime/:id", typeof Route8>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/category/:name", typeof Route9>
              & ElysiaWithBaseUrl<"/api/v1/anilist/anime/info/:id", typeof Route10>
              & ElysiaWithBaseUrl<"/api/v1/anilist/anime/servers/:id", typeof Route11>
              & ElysiaWithBaseUrl<"/api/v1/anilist/anime/episodes/:id", typeof Route12>
}