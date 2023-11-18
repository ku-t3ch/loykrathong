import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { File } from "buffer";

export const krathongRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        krathongImage: z.string(),
        blessing: z.string(),
        author: z.object({
          name: z.string(),
          avatarUpload: z.string().optional(),
          avatar: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { krathongImage, blessing } = input;
      const { pb } = ctx;

      try {

        if (input.author.avatarUpload) {
          const base64 = input.author.avatarUpload.split(",")[1];
          const buffer = Buffer.from(base64!, "base64");
          const file = new File([buffer], "krathong.jpg", {
            type: "image/jpeg",
          });

          await pb.collection("krathong").create({
            blessing,
            image: krathongImage,
            authorName: input.author.name,
            authorimageUpload: file,
          });
        } else {
          await pb.collection("krathong").create({
            blessing,
            image: krathongImage,
            authorName: input.author.name,
            authorimageDefault: input.author.avatar,
          });
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        throw new Error("Something went wrong");
      }
    }),
});
