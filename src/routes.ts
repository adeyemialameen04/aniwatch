import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/hianime/home/index";
import type Route1 from "./routes/gogo-anime/top-airing/index";
import type Route2 from "./routes/hianime/browse/genre/[name]/index";
import type Route3 from "./routes/hianime/browse/producer/[name]/index";
import type Route4 from "./routes/hianime/browse/category/[name]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1/hianime/home", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1/gogo-anime/top-airing", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/genre/:name", typeof Route2>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/producer/:name", typeof Route3>
              & ElysiaWithBaseUrl<"/api/v1/hianime/browse/category/:name", typeof Route4>
}