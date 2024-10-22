import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/index";
import type Route1 from "./routes/home/index";
import type Route2 from "./routes/category/[name]/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1home", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1category/:name", typeof Route2>
}