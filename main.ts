/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import mongoose from "npm:mongoose@^6.7";
import manifest from "@/fresh.gen.ts";
import envConfig from "@/utils/config.ts";
import { MongoClient } from "mongodb";
const client = new MongoClient(envConfig.db_connection_string);
const db = client.db("roomoney");

await client.connect();

const Houses = db.collection("houses");
const Users = db.collection("users");
const Purchases = db.collection("purchases");
await mongoose.connect(envConfig.db_connection_string);
await start(manifest);

export { db, Houses, Purchases, Users };
