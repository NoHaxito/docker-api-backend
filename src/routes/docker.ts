import { execa } from "execa";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const { stdout } = await execa("docker", [
      "container",
      "ps",
      "--format",
      "json",
    ]);
    console.log(stdout);
    return c.json({
      ok: true,
      stdout: JSON.parse(stdout),
    });
  } catch (error: any) {
    return c.json({
      ok: false,
      message: error.stderr,
    });
  }
});

app.get("/start/:name", async (c) => {
  try {
    const { stdout } = await execa("docker", [
      "container",
      "start",
      c.req.param("name"),
    ]);
    console.log(stdout);
    return c.json({
      ok: true,
      stdout: stdout,
    });
  } catch (error: any) {
    return c.json({
      ok: false,
      message: error.stderr,
    });
  }
});
app.get("/stop/:name", async (c) => {
  try {
    const { stdout } = await execa("docker", [
      "container",
      "stop",
      c.req.param("name"),
    ]);
    console.log(stdout);
    return c.json({
      ok: true,
      stdout: stdout,
    });
  } catch (error: any) {
    return c.json({
      ok: false,
      message: error.stderr,
    });
  }
});
app.get("/:name", async (c) => {
  try {
    const { stdout } = await execa("docker", [
      "container",
      "inspect",
      c.req.param("name"),
    ]);
    return c.json({
      ok: true,
      stdout: JSON.parse(stdout),
    });
  } catch (error: any) {
    return c.json({
      ok: false,
      message: error.stderr,
    });
  }
});

export default app;
