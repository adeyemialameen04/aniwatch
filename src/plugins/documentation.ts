import swagger from "@elysiajs/swagger";
import type Elysia from "elysia";

const tags: { name: string; description: string }[] = [
	{
		name: "Home",
		description:
			"Endpoints related to general information and home page content.",
	},
	{
		name: "Category",
		description:
			"Endpoints that retrieve and filter anime based on their categories, allowing users to explore anime by genre.",
	},
	{
		name: "Genre",
		description:
			"Endpoints that retrieve and filter anime based on their genres, allowing users to explore anime by genre.",
	},
];

const hiddenClients = {
	shell: true,
	swift: true,
	java: true,
	node: true,
	php: true,
	powershell: true,
	python: true,
	r: true,
	ruby: true,
	csharp: true,
	kotlin: true,
	objc: true,
	ocaml: true,
	clojure: true,
};

export const documentation = (app: Elysia) =>
	app
		.use(
			swagger({
				exclude: ["/doc", "/doc/json"],
				path: "/docs",
				scalarConfig: {
					darkMode: true,
					theme: "purple",
					defaultHttpClient: {
						targetKey: "javascript",
						clientKey: "fetch",
					},
					hiddenClients,
					hideDownloadButton: true,
					defaultOpenAllTags: true,
					tagsSorter: "alpha",
				},
				provider: "scalar",
				documentation: {
					info: {
						title: "Unofficial Documentation of Aniwatch Api",
						version: "1.0.0",
						license: {
							name: "MIT",
							url: "https://opensource.org/license/mit/",
						},
						contact: {
							name: "Al-Ameen Adeyemi",
							url: "https://github.com/adeyemialameen04",
						},
					},
					tags,
				},
			}),
		)
		.use(
			swagger({
				path: "/doc",
				provider: "swagger-ui",
				exclude: ["/docs", "/docs/json"],
				documentation: {
					info: {
						title: "Unofficial Documentation of Aniwatch Api",
						version: "1.0.0",
						license: {
							name: "MIT",
							url: "https://opensource.org/license/mit/",
						},
						contact: {
							name: "Al-Ameen Adeyemi",
							url: "https://github.com/adeyemialameen04",
						},
					},
					tags,
				},
			}),
		);
