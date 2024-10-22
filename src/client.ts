import { treaty } from "@elysiajs/eden";

const client = treaty<Routes>("localhost:3000");
const { data, error, status, response } = await client.api.v1.home.get();
console.log(data, error, status, response);
