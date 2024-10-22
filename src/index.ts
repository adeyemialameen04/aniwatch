import { Elysia } from "elysia";
import { documentation } from "./plugins/documentation";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.use(documentation)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
export type App = typeof app;
