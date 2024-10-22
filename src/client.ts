import { treaty } from "@elysiajs/eden";
import type { App } from "./index";

const client = treaty<App>("localhost:3000");
