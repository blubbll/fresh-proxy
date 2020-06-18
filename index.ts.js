//© by Blubbll

//imports
const { Deno } = window;

import {
  Application,
  Router
} from "https://deno.land/x/denotrain@v0.5.0/mod.ts";
import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

//dirname
const __dirname = Deno.env.toObject().PWD;

//setup
const app = new Application(),
  router = new Router(),
  host = Deno.env.toObject().PROJECT_DOMAIN
    ? "https://fresh-proxy.glitch.me"
    : "http://fresh-proxy.eu-4.evennode.com";

app.get(".*", async ctx => {
  const proj = ctx.req.path.slice(1);
  if (!proj.includes(".")) {
    console.log(`Forwarding ping to project [${proj}]...`);
    fetch(`https://${proj}.glitch.me`).then(_res => {
      console.log(_res);
      ctx.res.setMimeType(_res.body.contentType);
      ctx.res.setStatus(_res.status);
      return "ok";
    });
  } else return "nok"
});

(async () => {
  await app.run();
})();
