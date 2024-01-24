import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dockerRoutes from "./routes/docker";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/docker", dockerRoutes);

const port = 3000;
console.log(`Server is running on  http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
