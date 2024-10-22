import { Elysia } from "elysia";
import { documentation } from "./plugins/documentation";
import { autoload } from "elysia-autoload";
import logixlysia from "logixlysia";

const prefix = "/api/v1//" as const;

const app = new Elysia()
	.use(
		logixlysia({
			config: {
				showStartupMessage: true,
				startupMessageFormat: "simple",
				customLogFormat: "{level} {duration} {method} {pathname} {status}",
			},
		}),
	)
	.get("/", () => "Hello Elysia")
	.use(
		await autoload({
			prefix,
			dir: "./routes/",
			types: {
				output: "./routes.ts",
				typeName: "Routes",
			},
		}),
	)
	.use(documentation);

await app.modules;
app.listen(3000, () => app.routes.map((x) => x.path));

export type App = typeof app;
