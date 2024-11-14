import { env } from "@/env.mjs";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL as string);

const pbAuth = (pbA: PocketBase): Promise<PocketBase> => {
  return new Promise(async (resolve, reject) => {
    pbA.admins
      .authWithPassword(env.POCKETBASE_EMAIL, env.POCKETBASE_PASSWORD)
      .then(() => {
        resolve(pbA);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export { pb, pbAuth };
