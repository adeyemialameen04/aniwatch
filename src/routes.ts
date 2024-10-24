import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/hianime/home/index";
import type Route1 from "./routes/anilist/trending/index";
import type Route2 from "./routes/hianime/browse/genre/[name]/index";
import type Route3 from "./routes/hianime/browse/producer/[name]/index";
import type Route4 from "./routes/hianime/browse/anime/[id]/index";
import type Route5 from "./routes/hianime/browse/category/[name]/index";
import type Route6 from "./routes/anilist/anime/[id]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1/hianime/home", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1/anilist/trending", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/genre/:name", typeof Route2>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/producer/:name", typeof Route3>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/anime/:id", typeof Route4>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/category/:name", typeof Route5>
              & ElysiaWithBaseUrl<"/api/v1/anilist/anime/:id", typeof Route6>
}