import { env } from "@/env.mjs";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.pocketbase as string);

export default pb;
