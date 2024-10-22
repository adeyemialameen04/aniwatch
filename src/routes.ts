import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/home/index";
import type Route1 from "./routes/genre/[name]/index";
import type Route2 from "./routes/producer/[name]/index";
import type Route3 from "./routes/category/[name]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1home", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1genre/:name", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1producer/:name", typeof Route2>
              & ElysiaWithBaseUrl<"/api/v1category/:name", typeof Route3>
}