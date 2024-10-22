import Elysia from "elysia";

export default new Elysia({ name: "api.index" }).get("", () => {
	return {
		status: "Running",
		message: "Welcome to the Api",
	};
});
