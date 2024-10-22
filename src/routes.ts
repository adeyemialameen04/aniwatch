import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/index";
import type Route1 from "./routes/home/index";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1/", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1/home", typeof Route1>
}