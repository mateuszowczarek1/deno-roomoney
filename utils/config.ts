import * as mod from "dotenv";
import EnvNames from "@/utils/EnvNames.ts";

interface ConfigInterface {
  base_url: string;
  environment: string;
  cookie_secret: string;
  db_connection_string: string;
}

if (Deno.env.get(EnvNames.DENO_ENV) !== "production") {
  await mod.load({
    export: true,
  });
}

const envConfig: ConfigInterface = {
  base_url: Deno.env.get(EnvNames.BASE_URL) || "http://localhost:8000",
  environment: Deno.env.get(EnvNames.DENO_ENV) || "",
  cookie_secret: Deno.env.get(EnvNames.COOKIE_SECRET) || "",
  db_connection_string: Deno.env.get(EnvNames.DB_CONNECTION_STRING) ||
    "mongodb://localhost:27017",
};

export default envConfig;
